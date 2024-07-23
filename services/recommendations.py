#recommendations.py

from sklearn.metrics.pairwise import cosine_similarity
from database import connect_to_mongodb
from preprocessing import preprocess_text, preprocess_categories, combine_features
import pandas as pd

def get_recommendations(product_id):
    products_collection = connect_to_mongodb()
    products = list(products_collection.find())
    products_df = pd.DataFrame(products)
    
    # Asegúrate de que '_id' es tratado como string
    products_df['_id'] = products_df['_id'].astype(str)
    
    tfidf_matrix = preprocess_text(products_df)
    category_matrix = preprocess_categories(products_df)
    combined_features = combine_features(tfidf_matrix, category_matrix)
    
    cosine_sim = cosine_similarity(combined_features, combined_features)
    
    idx = products_df.index[products_df['_id'] == product_id].tolist()
    if not idx:
        return []
    idx = idx[0]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:11]
    product_indices = [i[0] for i in sim_scores]
    
    return products_df.iloc[product_indices]['_id'].tolist()
