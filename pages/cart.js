//cart.js 

import { CartContext } from "@/components/CartContext";
import Input from "@/components/Input";
import Table from "@/components/Table";
import Center from "@/components/center";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ProductRecommendations from "@/components/recomendations";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";


export default function CartPage() {
    const {cartProducts,addProduct,removeProduct,clearCart} = useContext(CartContext);
    const [products,setProducts] = useState([]);
    const [name,setName] = useState('');
    const [city,setCity] = useState('');
    const [email,setEmail] = useState('');
    const [postalCode,setPostalCode] = useState('');
    const [streetAddress,setStreetAddress] = useState('');
    const [country,setCountry] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    useEffect(() => {
        if (cartProducts.length > 0){
            axios.post('/api/cart', {ids:cartProducts}).then(response => {
                setProducts(response.data);
            })
        } else {
            setProducts([]);
        }
    }, [cartProducts]);

    function moreOfThisProduct(id) {
        addProduct(id);
    }

    function lessOfThisProduct(id){
        removeProduct(id);
    }

    let total = 0;
    for(const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        total += price;
    }

    async function goToPayment(){
        const response = await axios.post('/api/checkout', {
            name,email,city,postalCode,streetAddress,country,cartProducts,
        });
        if(response.data.url) {
            window.location = response.data.url;
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.href.includes('success')) {
            setIsSuccess(true);
            clearCart();
            }
    }, []);

    if (isSuccess) {  
    return (
        <>
            <Header />
            <Center>
                <div className="cart-columns-wrapper">
                    <div className="box">
                        <h1>Thanks for your Order!</h1>
                        <p>We will email you when your order will be sent.</p>
                        <Link href="./"className="buttonStyle primary" >Back to the Shop</Link>
                    </div>
                </div>
            </Center>
        </>
        );
    }
    

    return(
        <>
        <Header />
        <Center>
          <section>
            <div className="cart-columns-wrapper">
                <div className="box">
                <h2>Cart</h2>
                    {!cartProducts?.length && (
                        <div>Your cart is empty</div>
                    )}    
                    {products?.length > 0 && (             
                    <Table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {products.map(product => (
                                <tr>
                                    <td>
                                        <div className="product-image-box"><img src={product.images[0]}/></div>                                        
                                        {product.title}
                                    </td>
                                    <td>
                                        <button className="buttonStyle" 
                                            onClick={() => lessOfThisProduct(product._id)}
                                        >-</button>
                                        <span className="quantity-label"> 
                                            {cartProducts.filter(id => id === product._id).length}
                                        </span>
                                        <button className="buttonStyle" 
                                            onClick={() => moreOfThisProduct(product._id)}
                                        >+</button>
                                    </td>
                                    <td>
                                        ${cartProducts.filter(id => id === product._id).length * product.price}
                                    </td>
                                </tr>
                            ))}    
                            <tr>
                                <td></td>
                                <td></td>
                                <td>${total}</td>
                            </tr>                                               
                        </tbody>
                    </Table> 
                     )}  
                </div>
                {!!cartProducts?.length && (
                    <div className="box">
                      <h2>Order Information</h2>
                            <Input type="text" placeholder="Name" name="name" value={name} onChange={ev => setName(ev.target.value)} />
                            <Input type="text" placeholder="Email" name="email" value={email} onChange={ev => setEmail(ev.target.value)}/>
                            <Input type="text" placeholder="Country" name="country" value={country} onChange={ev => setCountry(ev.target.value)}/>
                            <div className="city-holder">
                                <Input type="text" placeholder="City" name="city" value={city} onChange={ev => setCity(ev.target.value)}/>
                                <Input type="text" placeholder="Postal Code" name="postalCode" value={postalCode} onChange={ev => setPostalCode(ev.target.value)}/>
                            </div>
                            <Input type="text" placeholder="Street Address" name="streetAddress" value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)}/>
                            <button onClick={goToPayment} className="buttonStyle black block">Continue to Payment</button>                     
                    </div>
                )}
            </div>
          </section>
          {/* <section>
            <ProductRecommendations/>
          </section> */}
          <Footer/>
        </Center>
        </>
    );
}