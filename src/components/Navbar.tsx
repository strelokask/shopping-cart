import { Button, Container, Nav, Navbar as NavbarBs } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useShoppingCart } from '../context/ShoppingCartContext'
export function Navbar() {
  const { cartQuantity, openCart } = useShoppingCart()
  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to={'/'} as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to={'/store'} as={NavLink}>
            Store
          </Nav.Link>
          <Nav.Link to={'/about'} as={NavLink}>
            About
          </Nav.Link>
        </Nav>
        {cartQuantity > 0 && (
          <Button
            onClick={openCart}
            style={{ width: '3rem', height: '3rem', position: 'relative' }}
            variant="outline-primary"
            className="rounded-circle"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
              <title>Shopping Cart</title>
              <desc>A solid styled icon from Orion Icon Library.</desc>
              <circle
                data-name="layer1"
                cx="23.9"
                cy="56.3"
                r="4"
                fill="#202020"
              ></circle>
              <circle
                data-name="layer1"
                cx="49.9"
                cy="56.3"
                r="4"
                fill="#202020"
              ></circle>
              <path
                data-name="layer2"
                d="M23.4 48.3h31l7.7-24H19.7L15.9 7.8A2 2 0 0 0 14 6.3H3.9a2 2 0 0 0 0 4h8.4l9 38z"
                fill="#202020"
              ></path>
              <path
                data-name="layer1"
                fill="#202020"
                d="M21.9 20.3H38l.1-.2-8-8-8.2 8.2zm28-8l2.2-5.6-7.4-3-6.6 16.4.1.2h8.4l1.5-3.7v3.7h12v-8H49.9z"
              ></path>
            </svg>
            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
              style={{
                color: 'white',
                width: '1.5rem',
                height: '1.5rem',
                position: 'absolute',
                left: 0,
                right: 0,
                transform: 'translate(-25%, -25%)',
              }}
            >
              {cartQuantity}
            </div>
          </Button>
        )}
      </Container>
    </NavbarBs>
  )
}
