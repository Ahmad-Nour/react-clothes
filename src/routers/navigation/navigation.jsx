import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Logo } from '../../assets/logo.svg';
import './navigation.styles.scss';
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    const signOutHandler = async () => {
        await signOutUser();
    }

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <Logo className='logo' />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUser ?
                            (
                                <span className="nav-link" onClick={signOutHandler}>SIGN OUT</span>
                            )
                            : (<Link className="nav-link" to='/auth'>
                                SIGN IN
                            </Link>)
                    }
                    <Link className="nav-link">
                        <CartIcon />
                    </Link>
                </div>
                {isCartOpen && <CartDropdown />}
            </div>
            <Outlet />
        </Fragment >
    );
};

export default Navigation;