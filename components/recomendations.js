//recommendations.js 

import axios from 'axios';

async function getRecommendations(productId) {
  const response = await axios.post('http://localhost:5000/recommend', {
    product_id: productId
  });
  return response.data;
}

// Ejemplo de uso en un componente de Next.js
import { useState, useEffect } from 'react';

const ProductRecommendations = ({ productId }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    async function fetchRecommendations() {
      const recommendedProducts = await getRecommendations(productId);
      setRecommendations(recommendedProducts);
    }
    
    fetchRecommendations();
  }, [productId]);

  return (
    <div>
      <h2>Recommended Products</h2>
      <ul>
        {recommendations.map(rec => (
          <li key={rec._id}>{rec.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductRecommendations;
