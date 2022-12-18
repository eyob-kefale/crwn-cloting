import { Fragment, useContext } from "react"
import { Link, Outlet } from "react-router-dom"
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"
import './navigation.style.scss'

import { UserContext } from '../../context/user.context'
import { CartContext } from "../../context/cart.context"

import { signOutUser } from '../../util/firebase/firebase.utils'
import CartIcon from "../card-icon/cart-icon.component"
import CartDropdown from "../cart-dropdown/cart-dropdown.component"

const Navigation = () => {
    const { currentUser } = useContext(UserContext)
    const {isCartOpen}=useContext(CartContext)
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>

                    <CrwnLogo className="logo" />

                </Link>

                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        shop
                    </Link>

                    {
                        currentUser ? (
                            <span onClick={signOutUser} className="nav-link">SIGN OUT</span>)
                            : (
                                <Link className="nav-link" to='/auth'>
                                    SIGN IN
                                </Link>
                            )
                    }
                    <CartIcon/>
                </div>
                {isCartOpen && <CartDropdown/>}
            </div>
            <Outlet />
        </Fragment>
    )

}

export default Navigation