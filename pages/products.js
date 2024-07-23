import Center from "@/components/center";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ProductsGrid from "@/components/productsGrid";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/category";
import { Product } from "@/models/products";
import { useState, useEffect } from 'react';


export default function ProductsPage({ initialProducts, categories }) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [products, setProducts] = useState(initialProducts);

    useEffect(() => {
        const fetchProducts = async () => {
            let url = '/api/products';
            if (selectedCategory) {
                url += `?category=${selectedCategory}`;
            }

            const res = await fetch(url);
            const data = await res.json();
            setProducts(data);
        };

        fetchProducts();
    }, [selectedCategory]);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <>
            <Header />
            <section>
                <Center>
                    <h2>All Products</h2>
                    <label className="category-label">categories</label>
                    <div className="category-buttons">
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
                        {capitalizeFirstLetter(c.name)}
                    </button>
                ))}
            </div>
                    <ProductsGrid products={products} />
                    <Footer />
                </Center>
            </section>
        </>
    );
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const { category } = context.query;
    let filter = {};

    if (category) {
        const parentCategory = await Category.findOne({ name: category });

        if (parentCategory) {
            const childCategories = await getAllChildCategories(parentCategory._id);
            const categoryIds = [parentCategory._id, ...childCategories.map(c => c._id)];

            filter.category = { $in: categoryIds };
        } else {
            filter.category = { $in: [] };
        }
    }

    const products = await Product.find(filter, null, { sort: { '_id': -1 } });
    const categories = await Category.find({});

    return {
        props: {
            initialProducts: JSON.parse(JSON.stringify(products)),
            categories: JSON.parse(JSON.stringify(categories)),
        },
    };
}

async function getAllChildCategories(parentId) {
    const categories = await Category.find({ parent: parentId });
    let childCategories = [...categories];

    for (const category of categories) {
        const children = await getAllChildCategories(category._id);
        childCategories = childCategories.concat(children);
    }

    return childCategories;
}
