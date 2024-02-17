import re
import numpy as np
import itertools
from pandas import DataFrame

def prepare_data(spotify_df: DataFrame, data_w_genre: DataFrame) -> DataFrame:
    """
    Prepare the data for feature engineering

    Parameters:
    spotify_df (pandas dataframe): The Spotify dataframe
    data_w_genre (pandas dataframe): The artist dataframe

    Returns:
    spotify_df (pandas dataframe): The Spotify dataframe enriched with genre information
    """
    # Drop the id column from data_w_genre because it is not needed and spotify_df already has an id column
    data_w_genre = data_w_genre.drop('id', axis=1)

    # Replace spaces with underscores in the genres column
    data_w_genre['genres_upd'] = data_w_genre['genres'].apply(
        lambda x: [re.sub(' ', '_', i) for i in re.findall(r"'([^']*)'", x)])

    # Extract artist names from the artists column in spotify_df
    spotify_df['artists_upd_v1'] = spotify_df['artists'].apply(
        lambda x: re.findall(r"'([^']*)'", x))

    # Extract artist names from the artists column in spotify_df
    spotify_df['artists_upd_v2'] = spotify_df['artists'].apply(
        lambda x: re.findall('\"(.*?)\"', x))

    # Choose the correct artist names from either artists_upd_v1 or artists_upd_v2
    spotify_df['artists_upd'] = np.where(spotify_df['artists_upd_v1'].apply(
        lambda x: not x), spotify_df['artists_upd_v2'], spotify_df['artists_upd_v1'])

    # Create a new column that combines the artist name and song name
    spotify_df['artists_song'] = spotify_df.apply(
        lambda row: str(row['artists_upd'][0])+str(row['name']), axis=1)

    # Sort the dataframe by artists_song and release_date
    spotify_df.sort_values(['artists_song', 'release_date'],
                           ascending=False, inplace=True)

    # Remove duplicate songs
    spotify_df.drop_duplicates('artists_song', inplace=True)

    # Explode the artists_upd column into multiple rows
    artists_exploded = spotify_df[['artists_upd', 'id']].explode('artists_upd')

    # Merge the exploded dataframe with the genre dataframe
    artists_exploded_enriched = artists_exploded.merge(
        data_w_genre, how='left', left_on='artists_upd', right_on='name')

    # Remove rows where genres_upd is null
    artists_exploded_enriched_nonnull = artists_exploded_enriched[~artists_exploded_enriched.genres_upd.isnull()]

    # Consolidate genres for each song
    artists_genres_consolidated = artists_exploded_enriched_nonnull.groupby(
        'id')['genres_upd'].apply(list).reset_index()

    # Remove duplicate genres for each song
    artists_genres_consolidated['consolidates_genre_lists'] = artists_genres_consolidated['genres_upd'].apply(
        lambda x: list(set(list(itertools.chain.from_iterable(x)))))

    # Merge the consolidated genres back into the spotify dataframe
    spotify_df = spotify_df.merge(artists_genres_consolidated[['id','consolidates_genre_lists']], on = 'id',how = 'left')
    
    return spotify_df