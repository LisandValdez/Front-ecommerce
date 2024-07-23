import Center from "./center";
import CartIcon from "./icons/cart";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import Link from "next/link";





export default function Featured({product}) {
    const {addProduct} = useContext(CartContext);
    const url = '/product/'+product._id;
    function addFeaturedToCart() {
        addProduct(product._id);
    }

    return(
        <div className="Bg">
            <Center>
            <div className="ColumnsWrapper">
                <div className="Column">
                    <div>
                    <h1 className="Title-h1">{product.title}</h1>
                    <p className="Desc">
                         {product.description}
                    </p>
                    <div className="ButtonsWrapper">
                        <Link className="StyledLink primary"  href={url}>
                            Read More
                        </Link>
                        <button className="buttonStyle"
                        onClick={addFeaturedToCart}>
                            <CartIcon/>
                            Add to Cart
                        </button>
                    </div>
                    </div>
                </div>
                <div className="Column">
                    <img src={product.images[0]} />
                </div>
            </div>  
            </Center>
        </div>
    );
}