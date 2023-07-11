import fetchUrls from "../../../utils/fetchUrls.enum.js"
import {
  __delete__,
  messages
} from "../../../utils/index.js"

export const deleteProduct = async ({
  target,
  getContextId
}) => {
  console.log("Is pressed")
  const ret = await __delete__({
    message: "¿Deseas desactivar este producto?",
    target,
    url: fetchUrls.FETCH_DELETE_PRODUCT(getContextId(false))
  })

  console.log(ret)
  // const {
  //   activeGlobalMessage
  // } = messages
  // if (request?.ok) {
  //   activeGlobalMessage({
  //     message: "Producto sesactivado satisfactoriamente",
  //     type: "success"
  //   })
  // }

}