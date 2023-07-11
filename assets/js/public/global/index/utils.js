import {
  useSignal,
  useSignalJs
} from "../../../helpers/index.js"
import fetchUrls from "../../../utils/fetchUrls.enum.js"
import useFetch from "../../../utils/useFetch.utils.js"

export const purchaseItemsCart = useSignalJs([])
const getUser = async (target) => {
  const data = await useFetch({
    url: fetchUrls.FILTER_USER_SESSION(),
    method: "GET",
    useLoader: target,
    failFetchOptions: {
      useAbortEndedTime: true
    }
  })

  userKeeper.__current__ = (target) => ({
    target,
    data
  })

  return {
    target,
    data
  }
}
export const userKeeper = useSignalJs(getUser)

export const totalPrice = useSignal({
  total: 0,
  hidden: true
}, "cart")

export const onInput = ({
  target
}, getInputId) => {
  const index = purchaseItemsCart.current.findIndex(el => el.productId === getInputId(target))
  if (index === -1) return

  const cartItem = purchaseItemsCart.current[index]
  const targetPrice = target.closest("tr").querySelector("[data-price]") || 1
  purchaseItemsCart.current[index] = {
    ...cartItem,
    quantity: target.value
  }

  totalPrice.current.total = purchaseItemsCart.current.reduce((acc, value) => {
    const {
      price,
      quantity
    } = value
    return (+price * +quantity) + acc
  }, 0)

  const {price, quantity} = cartItem
  targetPrice.textContent = price * quantity
}