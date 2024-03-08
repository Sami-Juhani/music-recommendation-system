import os
import pandas as pd
from recommendations.utils.data_preparation import prepare_data
from recommendations.utils.feature_engineering import create_feature_set
from recommendations.utils.playlist_processing import create_necessary_outputs, generate_playlist_feature, generate_playlist_recos


def generate_recommendations(user_playlist: dict, user_id: int, recently_played: bool = False):
    """
    Generate song recommendations based on a user's playlist

    Parameters:
        user_playlist (dict): The user's playlist
        user_id (int): The user's id
        recently_played (bool): A boolean value that represents if the playlist is the user's recently played playlist

    Returns:
        top_40_recommendations (pandas dataframe): The top 40 song recommendations
    """
    tracks_data_path: str = './recommendations/data/tracks.csv' if os.environ.get(
        'DJANGO_ENV') == 'development' else '/app/backend/recommendations/data/tracks.csv'
    
    artists_data_path: str = './recommendations/data/artists.csv' if os.environ.get(
        'DJANGO_ENV') == 'development' else '/app/backend/recommendations/data/artists.csv'

    spotify_df = pd.read_csv(tracks_data_path, skiprows=range(1, 50000), nrows=50000) if os.environ.get(
        'DJANGO_ENV') == 'development' else pd.read_csv(tracks_data_path, nrows=250000)

    data_w_genre = pd.read_csv(artists_data_path)

    ### Prepare the data ###
    prepared_data = prepare_data(spotify_df, data_w_genre)

    ### Feature engineering ###

#    Get the year from the release_date column
    prepared_data['year'] = prepared_data['release_date'].apply(
        lambda x: x.split('-')[0])

    # Get the column names of the float variables
    float_cols = prepared_data.dtypes[prepared_data.dtypes ==
                                      'float64'].index.values

    ohe_cols = 'popularity'

    # create 5 point buckets for popularity
    prepared_data['popularity_red'] = prepared_data['popularity'].apply(
        lambda x: int(x/5))

    # tfidf can't handle nulls so fill any null values with an empty list
    prepared_data['consolidates_genre_lists'] = prepared_data['consolidates_genre_lists'].apply(
        lambda d: d if isinstance(d, list) else [])

    # Create the feature set
    feature_set = create_feature_set(prepared_data, float_cols=float_cols)

    ### Model training by Spotify playlist ###

    # Create the necessary outputs
    filtered_playlist_df = create_necessary_outputs(
        user_playlist, prepared_data, recently_played)
    if 'message' in filtered_playlist_df:
        return filtered_playlist_df

    # Generate the playlist feature set and non-playlist feature set
    feature_set_playlist_vector, feature_set_nonplaylist = generate_playlist_feature(
        feature_set, filtered_playlist_df, 1.09, recently_played)

    # Generate the top 40 song recommendations
    top_40_recommendations = generate_playlist_recos(
        prepared_data, feature_set_playlist_vector, feature_set_nonplaylist, user_id, recently_played)

    if top_40_recommendations.empty:
        return {'message': 'No recommendations found'}

    return top_40_recommendations
