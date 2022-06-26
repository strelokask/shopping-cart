import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { ShoppingCart } from '../components/ShoppingCart'
import { useLocalStorage } from '../hooks/useLocalStorage'

type ShoppingCartProviderProps = {
  children: ReactNode
}

type ShoppingCartContextType = {
  getItemQuantity: (id: number) => number
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void

  openCart: () => void
  closeCart: () => void
  cartQuantity: number
  cartItems: CartItem[]
  removeFromCart: (id: number) => void
}

type CartItem = {
  id: number
  quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContextType)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    'shopping-cart',
    []
  )
  const [isOpen, setIsOpen] = useState(false)
  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0
  }
  function removeFromCart(id: number) {
    setCartItems((cartItems) => {
      return cartItems.filter((item) => item.id !== id)
    })
  }
  function increaseQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          }
          return item
        })
      }
    })
  }
  function decreaseQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity == 1) {
        return currItems.filter((item) => item.id !== id)
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          }
          return item
        })
      }
    })
  }

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  useEffect(() => {
    if (cartQuantity === 0) setIsOpen(false)
  }, [cartQuantity])

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseQuantity,
        decreaseQuantity,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
        removeFromCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  )
}
