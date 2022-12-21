import { Fragment, useContext } from "react"
import { Outlet } from "react-router-dom"
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from './navigation.styles'

import { UserContext } from '../../context/user.context'
import { CartContext } from "../../context/cart.context"

import { signOutUser } from '../../util/firebase/firebase.utils'
import CartIcon from "../card-icon/cart-icon.component"
import CartDropdown from "../cart-dropdown/cart-dropdown.component"

const Navigation = () => {
    const { currentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext)
    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>

                    <CrwnLogo className="logo" />

                </LogoContainer>

                <NavLinks>
                    <NavLink to='/shop'>shop</NavLink>
                    {
                        currentUser ? (
                            <NavLink as='span' onClick={signOutUser} >SIGN OUT</NavLink>)
                            : (
                                <NavLink to='/auth'>
                                    SIGN IN
                                </NavLink>
                            )
                    }
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )

}

export default Navigation