export default function Footer(){
    return(
        <footer>
        <div className="col">
            <h4>Contact</h4>
            <p><strong>Address:</strong> 562 Wellington Road, Street 32, San Francisco</p>
            <p><strong>Phone:</strong> +01 2222 365/ (+91) 81 2345 6789</p>
            <p><strong>Hours:</strong> 10:00 - 18:00 , Mon - Sat</p>
        </div>

        <div className="col">
            <h4>About</h4>
            <a href="#">About us</a>
            <a href="#">Delivery Information</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">Contact Us</a>
        </div>
        
        <div className="col">
            <h4>My Account</h4>
            <a href="#">Sing In</a>
            <a href="#">View Cart</a>
            <a href="#">My Wishlist</a>
            <a href="#">Track My Order</a>
            <a href="#">Help</a>
        </div>

        <div className="col install">
            <h4>Install App</h4>
            <p>From App Store or Google Play</p>
            <div className="row">
            </div>
            <p>Secure Payment Gateways </p>
        </div>

        <div className="copyright">
            <p>2021, Tech2 etc - HTML CSS Ecommerce Template</p>
        </div>

    </footer>
    );
}