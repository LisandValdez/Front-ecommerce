#app.py

from flask import Flask, request, jsonify
from recommendations import get_recommendations
from database import connect_to_mongodb

app = Flask(__name__)

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    product_id = data['product_id']
    recommendations = get_recommendations(product_id)
    return jsonify(recommendations)

@app.route('/test-db-connection', methods=['GET'])
def test_db_connection():
    try:
        print("Attempting to connect to MongoDB...")
        products_collection = connect_to_mongodb()
        print("Connected to MongoDB.")
        products_count = products_collection.count_documents({})
        print(f"Number of products: {products_count}")
        return jsonify({'status': 'success', 'products_count': products_count})
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'status': 'error', 'message': str(e)})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
