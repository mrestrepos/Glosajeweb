import { Modal } from "../../components/index.js";
import useSignalJs from "../../helpers/useSignalJs.js";
import getFilterOps from "./getFilterOps.js";
import callReducer from "./reducer.js";

export const modalBody = useSignalJs({})

const modalOps = {
  componentBodyHTML: async (insert, {target, modalChildId}) => {
    const {filtersRequired: categories = []} = await getFilterOps(target, "categories")
    let HTML = ""
    target.classList.add("categoryType")

    for (const category of categories) {
      const noSpaces = String(category).trim()?.replace(/\s+/g, "+")
      HTML += `<label id=${modalChildId}> <input type="radio" name="types" value=${noSpaces}><span>${category}</span></label>`
    }

    modalBody.__current__ = target
    insert(HTML)
  },
  modalHeader: (insert) => insert("<h2>Categorias</h2>"),
  modalFooter: (_, {button}) => {
    button.disabled = true
  }
}

const modal = new Modal(modalOps)
modal.onClose.onHandlerChangeValue = ({toggleModal, type, modalChildren}) => {
  callReducer({type, modalChildren})
  toggleModal()
}

modal.onContentClick.__current__ = ({modalChildren, modalTypes, modalId, target}) => {
  const {modalFooterClose} = modalTypes()
  if (!target.closest("#" + modalId)) return

  modalFooterClose.disabled = !modalChildren().some(child => child.querySelector("input")?.checked)
}

export default modal
