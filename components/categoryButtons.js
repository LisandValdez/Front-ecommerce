import React from 'react';

const CategoryButtons = ({ selectedCategory, setSelectedCategory, categories }) => {
    return (
        <div>
            <button 
                onClick={() => setSelectedCategory('')} 
                className={selectedCategory === '' ? 'selected' : ''}
            >
                All Categories
            </button>
            {categories.length > 0 && categories.map(c => (
                <button 
                    key={c._id} 
                    onClick={() => setSelectedCategory(c._id)} 
                    className={selectedCategory === c._id ? 'selected' : ''}
                >
                    {c.name}
                </button>
            ))}
        </div>
    );
};

export default CategoryButtons;