import {
  useSignalJs
} from "../../../helpers/index.js"
import fetchUrls from "../../../utils/fetchUrls.enum.js"
import useFetch from "../../../utils/useFetch.utils.js"
import cart from "./cart.js"
import {
  purchaseItemsCart,
  userKeeper
} from "./utils.js"

const deleteProductId = useSignalJs({
  id: null,
  target: undefined
})

export const getId = ({
  getContextId,
  target
}) => {
  deleteProductId.__current__ = {
    id: getContextId(false),
    target
  }
}
export const deleteFromCart = () => {

  const {
    id,
    target
  } = deleteProductId.current

  const cartItem = cart.find(({
    productId
  }) => productId === id)

  if (cartItem) {
    cart.delete = cartItem
    target.closest("tr").remove()
  }
}

export const purchaseItems = async ({
  target
}, externData) => {

  target.disabled = true
  const {
    request
  } = await useFetch({
    url: fetchUrls.FETCH_SET_PAYMENT(),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(externData || purchaseItemsCart.current),
    useLoader: target
  })

  target.disabled = false

  if (request?.ok) {
    location.href = "./pago.php"
  }
}

export const purchaseSingleProduct = async ({
  target,
  getContextId
}) => {
  const {
    data
  } = await userKeeper.current(target)
  const {
    result
  } = data

  const {
    idUser
  } = result?.user || {}

  purchaseItems({
    target
  }, [{
    productId: getContextId(false),
    userId: idUser,
    quantity: 1
  }])
}