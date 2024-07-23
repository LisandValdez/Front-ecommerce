import ProductBox from "./ProductBox.js";

export default function ProductsGrid({ products }) {
    return (
        <div className="ProductsGrid">
            {products.map(product => (
                <ProductBox key={product._id} {...product} />
            ))}
        </div>
    );
}