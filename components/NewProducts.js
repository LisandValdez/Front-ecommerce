import Center from "./center";
import Footer from "./footer";
import ProductsGrid from "./productsGrid";


export default function NewProducts({products}) {
    return (
    <Center>
        <section>
            <h2>New Arrivals</h2>
            <ProductsGrid products={products} />
        </section>
        <Footer/>
    </Center>
    );
}