import {
  toggleOverlayElement
} from "../../components/overlay/index.js";
import callReducer from "./callReducer.js";
import {
  importedData as isReducerReady
} from "./reducer.js";
export const main = document?.querySelector("#mainContainer")

const datasets = {
  render: {
    dataset: "[data-global-render]",
    datasetType: "globalRender"
  },

  onclick: {
    dataset: "[data-global-type]",
    datasetType: "globalType"
  }
}

const init = () => {
  main?.addEventListener("click", (event) => {
    const {
      dataset,
      datasetType
    } = datasets.onclick
    callReducer({
      event,
      dataset,
      datasetType,
      datasetsContext: datasets
    })
  });

  const {
    dataset,
    datasetType
  } = datasets.render
  const render = Array.from(document.querySelectorAll(dataset) || [])

  if (render.length) {
    render.forEach(el => {
      toggleOverlayElement(el.parentNode)
    })
  }
  isReducerReady.onHandlerChangeValue = () => {

    if (render.length) {
      render.forEach(target => {
        callReducer({
          event: {
            target
          },
          datasetType,
          dataset,
          datasetsContext: datasets
        })
        toggleOverlayElement(target.parentNode)
      })
    }
  }
}

if (main) {
  init()
}