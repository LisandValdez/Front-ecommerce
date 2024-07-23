import { CartContext } from "@/components/CartContext";
import Center from "@/components/center";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ProductImages from "@/components/productImages";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/products";
import { useContext } from "react";

export default function ProductPage({product}) {
    const {addProduct} = useContext(CartContext);
    return(
        <>
        <Header />
            <Center>
             <section>
                <div className="col-wrapper">
                    <div className="box">
                        <ProductImages images={product.images}/>
                    </div>
                    <div className="box-transparent">
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <div className="price-button">
                            <label>Price: ${product.price}</label>
                            <button 
                            className="buttonStyle primary"
                            onClick={() => addProduct(product._id)}>
                                Add To Cart
                            </button>
                        </div>
                    </div>

                </div>
             </section>
            <Footer/>
            </Center>
        </>
    )
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const {id} = context.query;
    const product = await Product.findById(id);
    return{
        props: {
            product: JSON.parse(JSON.stringify(product)),
        }
    }
}