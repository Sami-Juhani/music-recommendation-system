import pandas as pd
from typing import Tuple, Union, Dict
from spotify.utils import execute_spotify_api_request
from song_ratings.views import get_song_rating
from sklearn.metrics.pairwise import cosine_similarity


def create_necessary_outputs(spotify_playlist: dict, df: pd.DataFrame, recently_played: bool = False) -> pd.DataFrame:
    """ 
    Pull songs from a specific playlist.

    Parameters: 
        playlist (dict): playlist you want to use to filter the data
        id_dic (dic): dictionary that maps playlist_name to playlist_id
        df (pandas dataframe): spotify dataframe
        recently_played (bool): boolean value that represents if the playlist is the user's recently played playlist

    Returns: 
        playlist: all songs in the playlist THAT ARE AVAILABLE IN THE SPOTIFY DATASET
    """

    # Initialize an empty DataFrame to store the playlist
    playlist = pd.DataFrame()

    # Loop over each track in the Spotify playlist
    for ix, i in enumerate(spotify_playlist['tracks']['items']):
        # Store the artist's name, track name, track id, album image URL, and the date the track was added to the playlist
        playlist.loc[ix, 'artist'] = i['track']['artists'][0]['name']
        playlist.loc[ix, 'name'] = i['track']['name']
        playlist.loc[ix, 'id'] = i['track']['id']  # ['uri'].split(':')[2]
        playlist.loc[ix, 'url'] = i['track']['album']['images'][1]['url']
        playlist.loc[ix, 'date_added'] = i['added_at'] if not recently_played else None

    # Convert the 'date_added' column to datetime format
    playlist['date_added'] = pd.to_datetime(
        playlist['date_added']) if not recently_played else None

    # Filter the playlist to include only the tracks that are available in the input DataFrame 'df'
    # and sort the playlist by 'date_added' in descending order
    playlist = playlist[playlist['id'].isin(df['id'].values)].sort_values(
        'date_added', ascending=False)

    # Return the filtered and sorted playlist
    return playlist


def generate_playlist_feature(complete_feature_set: pd.DataFrame, playlist_df: pd.DataFrame, weight_factor: float, recently_played: bool = False) -> Tuple[pd.Series, pd.DataFrame]:
    """ 
    Summarize a user's playlist into a single vector

    Parameters: 
        complete_feature_set (pandas dataframe): Dataframe which includes all of the features for the spotify songs
        playlist_df (pandas dataframe): playlist dataframe
        weight_factor (float): float value that represents the recency bias. The larger the recency bias, the most priority recent songs get. Value should be close to 1. 

    Returns: 
        playlist_feature_set_weighted_final (pandas series): single feature that summarizes the playlist
        complete_feature_set_nonplaylist (pandas dataframe): 
    """

    # Filter the complete feature set to include only the tracks that are in the playlist
    complete_feature_set_playlist = complete_feature_set[complete_feature_set['id'].isin(
        playlist_df['id'].values)]

    if not recently_played:
        # Merge the playlist DataFrame with the filtered feature set on 'id'
        complete_feature_set_playlist = complete_feature_set_playlist.merge(
            playlist_df[['id', 'date_added']], on='id', how='inner')
        # Sort the playlist feature set by 'date_added' in descending order
        playlist_feature_set = complete_feature_set_playlist.sort_values(
            'date_added', ascending=False)
        # Get the date when the most recent track was added to the playlist
        most_recent_date = playlist_feature_set.iloc[0, -1]
        # Calculate the number of months each track has been from the most recent track
        for ix, row in playlist_feature_set.iterrows():
            playlist_feature_set.loc[ix, 'months_from_recent'] = int(
                (most_recent_date.to_pydatetime() - row.iloc[-1].to_pydatetime()).days / 30)
        # Assign a weight to each track based on its 'months_from_recent' and the input weight factor
        playlist_feature_set['weight'] = playlist_feature_set['months_from_recent'].apply(
            lambda x: weight_factor ** (-x))
    else:
        playlist_feature_set = complete_feature_set_playlist

    # Filter the complete feature set to include only the tracks that are not in the playlist
    complete_feature_set_nonplaylist = complete_feature_set[~complete_feature_set['id'].isin(
        playlist_df['id'].values)]

    # Copy the playlist feature set
    playlist_feature_set_weighted = playlist_feature_set.copy()

    if not recently_played:
        # Multiply the features of each track by its weight
        playlist_feature_set_weighted.update(
            playlist_feature_set_weighted.iloc[:, :-4].mul(playlist_feature_set_weighted.weight, 0))
        # Remove the last four columns ('months_from_recent', 'weight', 'date_added', 'id') from the weighted playlist feature set
        playlist_feature_set_weighted_final = playlist_feature_set_weighted.iloc[:, :-4]
    else:
        playlist_feature_set_weighted_final = playlist_feature_set_weighted
    
    # Return the sum of the weighted playlist feature set and the feature set for the tracks not in the playlist
    return playlist_feature_set_weighted_final.sum(axis=0), complete_feature_set_nonplaylist


def generate_playlist_recos(df: pd.DataFrame, features: pd.Series, nonplaylist_features: pd.DataFrame, user_id: int, recently_played: bool = False ) -> Union[Dict[str, str], pd.DataFrame]:
    """ 
    Pull songs from a specific playlist.

    Parameters: 
        df (pandas dataframe): spotify dataframe
        features (pandas series): summarized playlist feature
        nonplaylist_features (pandas dataframe): feature set of songs that are not in the selected playlist

    Returns: 
        non_playlist_df_top_40: Top 40 recommendations for that playlist
    """
    endpoint = 'tracks'
    user_id: int = user_id

    # Filter the input DataFrame 'df' to include only the songs that are not in the playlist
    non_playlist_df = df[df['id'].isin(
        nonplaylist_features['id'].values)].copy()

    features = features.drop('id') if recently_played else features
    # Calculate the cosine similarity between the features of each song not in the playlist and the summarized playlist feature
    # Store these similarity scores in a new column 'sim'
    non_playlist_df['sim'] = cosine_similarity(nonplaylist_features.drop(
        'id', axis=1).values, features.values.reshape(1, -1))[:, 0]

    # Sort the DataFrame of songs not in the playlist by 'sim' in descending order and select the top 40 songs
    non_playlist_df_top_40 = non_playlist_df.sort_values(
        'sim', ascending=False).head(40)

    # Get the album image URL for each song in the top 40 recommendations
    non_playlist_df_top_40['url'] = non_playlist_df_top_40['id'].apply(
        lambda x: execute_spotify_api_request(user_id, f'{endpoint}/{x}')['album']['images'][1]['url'])
    
    # Get the rating for each song in the top 40 recommendations
    non_playlist_df_top_40['rating'] = non_playlist_df_top_40['id'].apply(
        lambda x: get_song_rating(x))

    if non_playlist_df_top_40.shape[0] == 0:
        return non_playlist_df_top_40

    # Get rid of wrongs artists row and replace with correct one
    non_playlist_df_top_40.drop("artists", axis=1, inplace=True)
    non_playlist_df_top_40.rename(columns={"artists_upd" : "artists"}, inplace=True)

    # Return the DataFrame of top 40 song recommendations
    return non_playlist_df_top_40
