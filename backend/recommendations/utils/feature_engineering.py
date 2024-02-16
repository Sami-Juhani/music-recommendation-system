import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MinMaxScaler
from pandas import DataFrame
import numpy as np


def ohe_prep(df: DataFrame, column: str, new_name: str) -> DataFrame: 
    """ 
    Create One Hot Encoded features of a specific column

    Parameters: 
        df (pandas dataframe): Spotify Dataframe
        column (str): Column to be processed
        new_name (str): new column name to be used
        
    Returns: 
        tf_df: One hot encoded features 
    """
    
    # Use pandas get_dummies function to one-hot encode the specified column
    tf_df = pd.get_dummies(df[column])

    # Get the column names of the newly created DataFrame
    feature_names = tf_df.columns

    # Rename the columns of the DataFrame with the new name provided
    tf_df.columns = [new_name + "|" + str(i) for i in feature_names]

    # Reset the index of the DataFrame
    tf_df.reset_index(drop = True, inplace = True)    
    
    return tf_df


def create_feature_set(df: DataFrame, float_cols: np.ndarray) -> DataFrame:
    """ 
    Process spotify df to create a final set of features that will be used to generate recommendations

    Parameters: 
        df (pandas dataframe): Spotify Dataframe
        float_cols (list(str)): List of float columns that will be scaled 
        
    Returns: 
        final: final set of features 
    """
    
    # Initialize a TfidfVectorizer
    tfidf = TfidfVectorizer()

    # Fit and transform the genre lists into a TF-IDF matrix
    tfidf_matrix =  tfidf.fit_transform(df['consolidates_genre_lists'].apply(lambda x: " ".join(x)))

    # Convert the TF-IDF matrix into a DataFrame
    genre_df = pd.DataFrame(tfidf_matrix.toarray())

    # Rename the columns of the genre DataFrame
    genre_df.columns = ['genre' + "|" + i for i in tfidf.get_feature_names_out()]

    # Reset the index of the genre DataFrame
    genre_df.reset_index(drop = True, inplace=True)

    # One-hot encode the year column and scale it by 0.5
    year_ohe = ohe_prep(df, 'year','year') * 0.5

    # One-hot encode the popularity_red column and scale it by 0.15
    popularity_ohe = ohe_prep(df, 'popularity_red','pop') * 0.15

    # Select the float columns
    floats = df[float_cols].reset_index(drop = True)

    # Initialize a MinMaxScaler
    scaler = MinMaxScaler()

    # Fit the scaler to the float columns and transform them
    floats_scaled = pd.DataFrame(scaler.fit_transform(floats), columns = floats.columns) * 0.2

    # Concatenate the genre DataFrame, the scaled float DataFrame, the one-hot encoded popularity DataFrame, and the one-hot encoded year DataFrame
    final = pd.concat([genre_df, floats_scaled, popularity_ohe, year_ohe], axis = 1)
     
    # Add the song id column
    final['id']=df['id'].values
    
    return final

def create_features(spotify_df: DataFrame, float_cols: np.ndarray) -> DataFrame:
    """
    Create features from the Spotify DataFrame.

    Parameters:
        spotify_df (pandas.DataFrame): The Spotify DataFrame.

    Returns:
        complete_feature_set (pandas.DataFrame): The DataFrame with the created features.
    """

    # Extract the year from the release_date column
    spotify_df['year'] = spotify_df['release_date'].apply(lambda x: x.split('-')[0])

    # Get the column names of the float variables
    float_cols = spotify_df.dtypes[spotify_df.dtypes == 'float64'].index.values

    # Create 5 point buckets for popularity 
    spotify_df['popularity_red'] = spotify_df['popularity'].apply(lambda x: int(x/5))

    # tfidf can't handle nulls so fill any null values with an empty list
    spotify_df['consolidates_genre_lists'] = spotify_df['consolidates_genre_lists'].apply(lambda d: d if isinstance(d, list) else [])

    # Create the complete feature set
    complete_feature_set = create_feature_set(spotify_df, float_cols=float_cols)

    return complete_feature_set