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
                                <button onClick={() => decreesItemFromCart(cartItem)}>{"<"}</button>
                                {cartItem.quantity}
                                <button onClick={() => addItemsToCart(cartItem)}>{">"}</button>
                            </span>
                            <span className='price'>{totalPrice}$</span>
                            <button className='remove-button' onClick={() => removeItemFromCart(cartItem)}>X</button>
                        </div>
                    );
                })
            }
            <span>TOTAL: ${totalItemsPrice}</span>
        </Fragment>
    );
}

export default CheckoutItem;