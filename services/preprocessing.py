#preprocessing.py

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import OneHotEncoder
import numpy as np

def preprocess_text(products_df):
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(products_df['description'])
    return tfidf_matrix

def preprocess_categories(products_df):
    # Convertir ObjectId a string para la codificación
    encoder = OneHotEncoder(sparse=False, handle_unknown='ignore')
    categories = products_df['category'].fillna('Unknown').astype(str).values.reshape(-1, 1)
    category_matrix = encoder.fit_transform(categories)
    return category_matrix

def combine_features(tfidf_matrix, category_matrix):
    combined_features = np.hstack((tfidf_matrix.toarray(), category_matrix))
    return combined_features
