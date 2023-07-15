import { Button } from '../button/button-component';
import {CartDropDownContainer,CartItems,EmptyMessage} from './cart-dropdown.styles.jsx';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigator = useNavigate();

    return (
        <CartDropDownContainer>
            <CartItems>
                {
                    cartItems.length ? (cartItems.map((item) => (<CartItem key={item.id} cartItem={item} />)))
                        : (<EmptyMessage>Your cart is empty</EmptyMessage>)
                }
            </CartItems>
            <Button onClick={() => navigator('/checkout')}>GO TO CHECKOUT</Button>
        </CartDropDownContainer>
    );
};

export default CartDropdown;
