import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Logo } from '../../assets/logo.svg';
import './navigation.styles.scss';
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    console.log(currentUser);
    const signOutHandler = async () => {
        await signOutUser();
        setCurrentUser(null);
        console.log('success sign out')
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
                                Sign In
                            </Link>)

                    }
                </div>
            </div>
            <Outlet />
        </Fragment >
    );
};

export default Navigation;