import { Modal } from "./js/components/index.js"

const modalOps = {
  componentBodyHTML: (insert, {target}) => {

    $(document).ready(function () {
      $.ajax({
        url: "https://rickandmortyapi.com/api/character?page=2",
        dataType: "json",
        success: function ({results}) {
          let HTML = ""
          for (const {image, name, status, species, type} of results) {
            HTML += `
              <div>

              <img src="${image}" />
              <h2>${name}</h2>
              <p>Status: ${status}</p>
              <p>Species: ${species}</p>
              <p>Type: ${type}</p>
              </div>
              `
          }

          target.classList.add("modal-content")
          insert(HTML)
        },

        error: function () {
          insert("Sadness :(")
        }
      })
    })
  },

  modalHeader: (insert) => insert("<h2>Hello there :D this is my little practice</h2>"),

  useDoneButton: false
}

const modal = new Modal(modalOps)

modal.onClose.onHandlerChangeValue = ({toggleModal}) => {
  toggleModal()
}

$(document).ready(function () {
  $("#onPress").click(function () {
    modal.toggleModal()
  })
})