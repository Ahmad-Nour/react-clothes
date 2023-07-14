import './checkout-item.styles.scss';
import { Fragment, useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = () => {
    const { cartItems, totalItemsPrice, removeItemFromCart, decreesItemFromCart, addItemsToCart } = useContext(CartContext);

    return (
        <Fragment>
            {
                cartItems.map(cartItem => {
                    const totalPrice = cartItem.price * cartItem.quantity;
                    return (
                        <div key={cartItem.id} className='checkout-item-container'>
                            <img className='image-container' src={cartItem.imageUrl} alt={cartItem.name} />
                            <span className='name'>{cartItem.name}</span>
                            <span className='quantity'>
                                <span onClick={() => decreesItemFromCart(cartItem)} className='arrow'>{'<'}</span>
                                <span className='value'>{cartItem.quantity}</span>
                                <span onClick={() => addItemsToCart(cartItem)} className='arrow'>{'>'}</span>
                            </span>
                            <span className='price'>{totalPrice}$</span>
                            <div className='remove-button' onClick={() => removeItemFromCart(cartItem)}>X</div>
                        </div>
                    );
                })
            }
            <span className='total'>Total: ${totalItemsPrice}</span>
        </Fragment>
    );
}

export default CheckoutItem;