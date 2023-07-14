import CheckoutItem from '../checkout-item/checkout-item.component';
import './checkout.styles.scss';

const Checkout = () => {
    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <span className='header-block'>Product</span>
                <span className='header-block'>Description</span>
                <span className='header-block'>Quantity</span>
                <span className='header-block'>Price</span>
                <span className='header-block'>Remove</span>
            </div>
            <CheckoutItem />
        </div>
    );
}

export default Checkout;