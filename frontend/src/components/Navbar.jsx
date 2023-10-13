import { useNavigate, useLocation } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const pathMatchRoute = (route) => {
    if (location.pathname === route) {
      return true
    }
  }
  return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <ul className="navbarListItems">
                <li className="navbarListItem" onClick={() => navigate('/')}>
                    <p className={
                        pathMatchRoute('/') ? 'navbarListItemNameActive' : 'navbarListItemName'
                    }>Home</p>
                </li>
                <li className="navbarListItem" onClick={() => navigate('/recognition')}>
                    <p className={
                        pathMatchRoute('/recognition') ? 'navbarListItemNameActive' : 'navbarListItemName'
                    }>recognition</p>
                </li>
                <li className="navbarListItem" onClick={() => navigate('/palette')}>
                    <p className={
                        pathMatchRoute('/palette') ? 'navbarListItemNameActive' : 'navbarListItemName'
                    }>palette</p>
                </li>
                <li className="navbarListItem" onClick={() => navigate('/simulator')}>
                    <p className={
                        pathMatchRoute('/simulator') ? 'navbarListItemNameActive' : 'navbarListItemName'
                    }>simulator</p>
                </li>
            </ul>
        </nav>
  )
}

export default Navbar