import Link from "next/link";
import Center from "./center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import CartIcon from "./icons/cart";


export default function Header() {
    const {cartProducts} = useContext(CartContext);
    const [navActive,setNavActive] = useState(false);
    return(
        <header>
            <Center>
                <div className="Wrapper">
                    <Link className="Logo" href={'/'}>E-commerce</Link>
                    <nav className={`StyledNav ${navActive ? 'active' : ''}`}>
                        <Link className="NavLink" href={'./'}>Home</Link>
                        <Link className="NavLink" href={'/products'}>All products</Link>
                        <Link className="NavLink" href={'/cart'}>Cart ({cartProducts.length})</Link>
                    </nav>
                        <button
                        className={`nav-button ${navActive ? 'active' : ''}`}
                        onClick={() => setNavActive(prev => !prev)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        </button>
                </div>
            </Center>
        </header>
    )
}
