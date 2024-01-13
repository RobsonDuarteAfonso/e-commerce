import {Link} from 'react-router-dom'

const NavBar = () => {
    return(
        <nav className="nav justify-content-center bg-light">
            <Link to="/" className="nav-link fs-4">Accueil</Link>
            <Link to="/products" className="nav-link fs-4">Produits</Link>
        </nav>
    )
}
export default NavBar