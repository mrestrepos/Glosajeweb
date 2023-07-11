import fetchUrls from "../../../utils/fetchUrls.enum.js"
import useFetch from "../../../utils/useFetch.utils.js"
import cart from "./cart.js"
import {
  onInput,
  purchaseItemsCart,
  totalPrice
} from "./utils.js"


export const initCartItems = async ({
  target,
  getContextId
}) => {
  const {
    request,
    result
  } = await useFetch({
    url: fetchUrls.FETCH_GET_PRODUCTS_BY_IDS(),
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cart),
    useLoader: target
  })

  if (!request?.ok) return

  const {
    products
  } = result

  let total = 0;
  for (const {
      nombre_producto: name,
      precio_producto: price,
      cantidad: quantity,
      codProducto: id
    } of products) {
    target.innerHTML += `
    
      <tr data-global-id=${id}>
        <td>${name}</td>
        <td>${price}</td>
        <td>
          <input type="number" min="1" max=${quantity} value='1' />
        </td>
        <td data-price='true' >
          ${price}
        </td>
        <td><button class="btn btn-warning btn-sm" data-global-type='getId' id="eliminar" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#eliminaModal">Eliminar</button></td>
      </tr>
    `
    total += (+price)

    purchaseItemsCart.__current__ = [...purchaseItemsCart.current, {
      productId: id,
      quantity: 1,
      price
    }]

  }

  totalPrice.current.total = total
  totalPrice.current.hidden = false
  const getInputId = (input) => {
    return getContextId(false, "", input)
  }

  target.addEventListener("change", (event) => onInput(event, getInputId, target))
  target.addEventListener("input", (event) => onInput(event, getInputId, target))
}