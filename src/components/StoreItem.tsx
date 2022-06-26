import { Button, Card } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { formatCurrency } from '../utils/formatCurrency'

type StoreItemProps = {
  id: number
  name: string
  price: number
  imgUrl: string
}
export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const { getItemQuantity, decreaseQuantity, increaseQuantity } =
    useShoppingCart()
  const quantity = getItemQuantity(id)

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline md-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseQuantity(id)}>
              + Add to cart
            </Button>
          ) : (
            <div className="d-flex align-items-center flex-column">
              <div className="d-flex align-items-baseline justify-content-center">
                <Button onClick={() => decreaseQuantity(id)}>-</Button>
                <div className="mx-1">
                  <span className="fs-4">{quantity}</span>
                </div>
                <Button onClick={() => increaseQuantity(id)}>+</Button>
              </div>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}
