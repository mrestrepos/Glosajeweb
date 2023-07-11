import { categoryKeeper } from "./main.js"
import modal, { modalBody } from "./modal.js"

const callReducer = ({type, ...props}) => {
  
  const reducer = {
    close: () => {
      const {modalChildren} = props
      for (const child of modalChildren()) {
        const input = child.querySelector("input")
        if (input?.checked) {
          input.checked = false
        }
      }
    },
    
    done: () => {
      const {modalChildren} = props

      for (const child of modalChildren()) {
        const input = child.querySelector("input")
        if (input?.checked) {
          categoryKeeper().append(child)
        }
      }
    },

    categories: () => {
      const {event} = props

      event.preventDefault()
      modal.toggleModal()

    },
    
    applyFilters: () => {
      const {event, target, categoryKeeper} = props
      event.preventDefault()
      const form = target.closest("form")
      const formData = new FormData(form)
      const data = Object.fromEntries(formData)

      let url = ""

      const children = Array.from(categoryKeeper().children)
      children.forEach(child => {
        const input = child?.querySelector("input")

        if (!input) return
        const {name, value} = input

        if (!Array.isArray(data[name])) {
          data[name] = []
        }

        data[name] = [...data[name], value]
      })

      for (const key in data) {
        const value  = data[key]

        url += key + "=" + (Array.isArray(value) ? value.join(",") : value) + "&"
        
      }
      
      url = url.slice(0, -1)
      form.action = location.pathname + "?" + url
      form.submit()
    },

    selectedCategory: () => {
      const {target} = props

      const input = target.tagName === "INPUT" ? target : target.querySelector("input")
      
      if (!input?.checked) {
        const label = target.closest("label")
        modalBody.current.appendChild(label)
      }
    }
  }

  const exec = reducer[type]
  if (typeof exec === "function") {
    exec()
  }
}

export default callReducer