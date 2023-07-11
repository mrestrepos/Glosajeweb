import {
  getId
} from "../../helpers/utilities.js"
import reducer from "./reducer.js"

const getContext = (dataset) => Array.from(document.querySelectorAll(dataset))

const getElementContext = (type, dataset, datasetType) => getContext(dataset).find(el => el.dataset[datasetType] === type)

const getContextIds = () => Array.from(document.querySelectorAll("[data-global-id]"))

const getContextId = (target, getElement, parent) => {
  let element = parent ? target.closest(parent) : target

  if (!element?.dataset.globalId) {
    element = parent ? element?.querySelector("[data-global-id]") : element?.closest("[data-global-id]")
  }

  return getElement ? element : getId(element?.dataset.globalId)
}

const getFormData = (target) => {
  const form = target.tagName === "FORM" ? target : target.closest("form")

  const formData = new FormData(form)
  const data = Object.fromEntries(formData)

  return {
    data,
    formData
  }
}

const callReducer = ({
  event,
  dataset,
  datasetType,
  datasetsContext,
  ...props
}) => {

  const {
    target
  } = event
  const {
    dataset: t_dataset
  } = target

  const type = t_dataset[datasetType] || target.closest(dataset)?.dataset[datasetType]
  const parentTarget = t_dataset[datasetType] ? target : target.closest(dataset)

  const {
    render,
    onclick
  } = datasetsContext

  if (!type) return
  reducer({
    type,
    target,
    parentTarget,
    datasetType,
    dataset: t_dataset,
    parentDataset: parentTarget?.dataset,
    event,
    getContext: () => getContext(onclick.dataset),
    getElementContext: (type) => getElementContext(type, onclick.dataset, onclick.datasetType),
    getRenderContext: () => getContext(render.dataset),
    getRenderElementContext: (type) => getElementContext(type, render.dataset, render.datasetType),
    getContextIds,
    getContextId: (getElement, parent, tr = target) => getContextId(tr, getElement, parent),
    getFormData: () => getFormData(target),
    ...props
  })
}

export default callReducer