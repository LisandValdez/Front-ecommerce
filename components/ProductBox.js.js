import CartIcon from "./icons/cart";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";



export default function ProductBox({_id,title,description,price,images}) {
    const {addProduct} = useContext(CartContext);
    const url = '/product/'+_id;
    
    return(
        <div className="ProductWrapper">
            <Link className="WhiteBox" href={url}>
                <div>
                    <img src={images?.[0]} />
                </div>
            </Link>
            <div className="ProductInfoBox">
                <Link className="Title" href={url}>{title}</Link>
                <div className="PriceRow">
                    <div className="Price">${price}</div>
                    <button className="buttonStyle primary"
                    onClick={() => addProduct(_id)}>
                         <CartIcon />
                    </button>
                </div>   
            </div> 
        </div>
        
    );
}