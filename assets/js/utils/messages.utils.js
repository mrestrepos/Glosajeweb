
const messages = {
    activeGlobalMessage: ({ type, message, error }) => {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
            }
        })
        Toast.fire({
            icon: type,
            title: message,
            text: error || ""
        });
    },

    activeGlobalMessageV2: ({ message, type = "#00FF7F", useOkFunction = "" }) => {
        Swal.fire({
            text: message,
            toast: true,
            position: "top",
            color: type
        }).then(async (result) => {
            if (result.isConfirmed && useOkFunction ) {
                await useOkFunction();
            }
        });
    },

    confirmationMessage: ({ textName, deletedHandler = "", cancelHandler = "" }) => {
        Swal.fire({
            title: textName,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Continuar",
            cancelButtonText: "Cancelar"
        }).then(async result => {
            if (result.isConfirmed) {
                return typeof deletedHandler === "function" && await deletedHandler();
            }
            else {
                if (typeof cancelHandler === "function") await cancelHandler()
            }
        })
    }
}

export const fallBackMessages = {
    insertModal: ({
        html,
        attributes = {}
    }) => {

        const modal = document.createElement("div")
        if (Object.keys(attributes).length) {
            for (let att in attributes) {
                if (att === "class") {
                    modal.classList.add(attributes[att])
                    continue
                }
                modal[att] = attributes[att]
            }
        }
        modal.innerHTML = html
      
        document.body.appendChild(modal)
      
        return {
          modal,
        }
      
      },

    handlerDisplayMessage: ({
        title,
        onDelete,
        onCancel = ""
      }) => {
      
        //The <div class="overlay" id="overlay"> </div> is required
        if (document.querySelector("#handlerMessage")) {
          
          document.querySelector('#overlay').classList.toggle("activeOverlay")
          document.querySelector('#handlerMessage').classList.toggle("activeMessage")
      
          return;
        }
        
        const {modal} = fallBackMessages.insertModal({
            html: `
                <h2>¿Estas seguro de eliminar "${title}" ?</h2>
            
                <div class="messageButtons">
                    <button data-modal-type='delete'>Si Continuar</button>
                    <button data-modal-type='cancel'>Cancelar</button>
                </div>
            `,

            attributes: {
                class: "handlerMessage",
                id: "handlerMessage"
            }
        })

        const modalActive = () => {
          document.querySelector('#overlay').classList.toggle("activeOverlay")
          modal.classList.toggle("activeMessage")
        }
        
        modal.onclick = async (e) => {
      
          const dataset = e.target.dataset
      
          switch (dataset.modalType) {
            case "delete": {
              await onDelete()
              return modalActive()
            }
      
            case "cancel": {
              modalActive()
              return typeof onCancel === "function" && await onCancel()
            }
      
          }
        }
      
        modalActive()
      },

      fastMessage: ({message, counterDown = 5}) => {

        const setCurrentInterval = (doc) => {
            const counterInterval = setInterval(() => {
                const currentCounter = doc.querySelector("span")
                currentCounter.innerText = parseInt(currentCounter.innerText) - 1
                if (+currentCounter.innerText === 0) {
                    doc.style.transform = "translateX(100%)";
                    clearInterval(counterInterval)
                }
            }, 900)
        }

        const existModal = document?.querySelector("#fastMessage")
        if (existModal) {
            existModal.firstChild.innerText = message
            console.log("PAssing here")
            return setCurrentInterval(existModal)
        }

        console.log("Creating")
        const {modal} = fallBackMessages.insertModal({
            html: `
            <p>${message} <span>${counterDown}</span></p>
        `,
            attributes: {
                class: "fastMessage",
                id: "fastMessage"
            }
        })

        console.log("Comming to fast message")
        modal.style.transform = "translateX(0%)";
        
        setCurrentInterval(modal)

      }
}

export default messages;