import cart from "./cart.js"
import {
  userKeeper
} from "./utils.js"

export const cartItemsCount = ({
  target
}) => {
  target.textContent = cart.length
}

export const addToCart = async ({
  getContextId,
  target,
  getRenderElementContext,
}) => {

  const {
    data
  } = await userKeeper.current(target)
  const {
    result
  } = data

  if (!data) {
    location.href = "./vistas/login.php"
  }
  const {
    idUser = ""
  } = result?.user || {}

  cart.add = {
    productId: getContextId(false),
    userId: idUser,
  }

  cartItemsCount({
    target: getRenderElementContext("cartItemsCount")
  })

  target.textContent = "Producto agregado al carrito"
  target.disabled = true
}