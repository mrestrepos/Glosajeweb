import { useSignalJs } from "../../helpers/index.js";
import { setLinkStyles } from "../../helpers/navigation.js";
import Global from "../Global/index.js";
import { closeButton } from "../index.js";
import { toggleOverlay } from "../overlay/index.js";

export default class Modal extends Global {
  #modalActiveClass;
  #modalFooter;
  #modalHeader;
  #overlayId;
  #useDoneButton;
  #doneButtonTextContent;
  constructor({
    id = Date.now(),
    componentBodyHTML = () => "",
    modalFooter = () => "",
    modalHeader = () => "",
    overlayId = "overlayModal",
    doneButtonTextContent = "Listo",
    useDoneButton = true
  }) {
    super({
      id,
      componentName: "modal",
      componentBodyChildId: "modalChild",
      componentBodyId: "modalBody",
      componentBodyHTML
    });
    this.#modalActiveClass = "modalActive";
    this.#modalFooter = modalFooter;
    this.#modalHeader = modalHeader;
    const { button, onClose } = closeButton();
    this.onClose = onClose;
    this.#useDoneButton = useDoneButton;
    this.#doneButtonTextContent = doneButtonTextContent;
    this.#initModal(button);
    this.#overlayId = overlayId;
    this.onModalToggle = useSignalJs(false);
    setLinkStyles(import.meta.url);
  }

  #modalHTML() {
    return `
      <section class="custom-modal" data-modal='${this.id}' data-type-modal='modal'>
      <div class="custom-modal-header" data-type-modal='modalHeader'></div>
      <div id="content" data-type-modal='modalBody'></div>
      <div class="custom-modal-footer" data-type-modal='modalFooter'>
        ${
          this.#useDoneButton
            ? `<button data-type-modal='modalFooterClose' class='global-button global-button-blue hoverAnimation'>${
                this.#doneButtonTextContent
              }</button>`
            : ""
        }
      </div>
    </section>
      `;
  }

  #initModal(button) {
    const modal = this.#modalHTML();

    document.body.insertAdjacentHTML("afterbegin", modal);

    const { modalHeader, modalFooter, modalBody, modalFooterClose } =
      this._getComponent();
    modalHeader.appendChild(button);
    this.#modalHeader.apply(
      null,
      this._insertParams({
        target: modalHeader,
        modalChildId: this.componentBodyChildId
      })
    );

    this.#modalFooter.apply(
      null,
      this._insertParams({
        target: modalFooter,
        button: modalFooterClose,
        modalChildId: this.componentBodyChildId
      })
    );

    this.componentBodyHTML.apply(
      null,
      this._insertParams({
        target: modalBody,
        modalChildId: this.componentBodyChildId
      })
    );

    this.onClose.__current__ = {
      overlay: this.#toggleOverlay,
      toggleModal: this.toggleModal,
      modalChildren: this.getBodyChildren
    };

    this.#setModalListener()
  }

  #toggleOverlay = () => {
    toggleOverlay(this.#overlayId);
  };

  toggleModal = () => {
    const { modal } = this._getComponent();
    this.#toggleOverlay();
    modal.classList.toggle(this.#modalActiveClass);
    this.onModalToggle.current = modal.classList.contains(
      this.#modalActiveClass
    );
  };

  #setModalListener = () => {
    const { main } = this._idSelector();
    document.querySelector(main).addEventListener("click", (event) => {
      event.stopPropagation();
      const { target } = event;
      const { dataset } = target;
      this.onContentClick.current({
        target,
        dataset,
        modalChildren: this.getBodyChildren,
        modalTypes: this._getComponent,
        modalId: this.componentBodyChildId
      });

      if (dataset?.typeModal !== "modalFooterClose") return;
      this.onClose.current = {
        ...this.onClose.current,
        type: "done"
      };
    });
  }
}
