import messages from "../../../utils/messages.utils.js"
import * as GetDelete from "./getDelete.js"
import * as InsertUpdate from "./insertUpdate.js"

const {
  deleteCategory,
  ...getDelete
} = GetDelete
export default function () {

  const {
    confirmationMessage,
    activeGlobalMessage
  } = messages

  return {
    deleteCategory: (props) => {
      confirmationMessage({
        textName: "¿Esta seguro de eliminar esta categoria?",
        deletedHandler: () => deleteCategory(props, activeGlobalMessage)
      })
    },

    ...getDelete,
    ...InsertUpdate
  }
}