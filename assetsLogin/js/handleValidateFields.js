import { validateField, messages } from "../../assets/js/utils/index.js";

const handleValidateFields = (element, { plusValidation = "", fieldName = [] } = {}) => {

    return element.addEventListener("input", async function (event) {
        const target = event.target;
        const {
            isValid = false
        } = validateField(target.value, target.dataset.fieldName);
        const button = this.querySelector("button[type='submit']");

        if (!isValid) {
            if (!button.hasAttribute("disabled")) button.disabled = true;

            if (target.dataset.valid === "true") target.dataset.valid = "false";
            return;
        }

        let validateExternField = true;

        target.dataset.valid = "true";

        if (plusValidation && typeof plusValidation === "function" && fieldName.includes(target.dataset.fieldName)) {
            validateExternField = await plusValidation(target);

        }

        const inputValues = Array.from(this.querySelectorAll("[data-field-name]")).every(input => input.dataset.valid === "true");

        button.disabled = !(inputValues && validateExternField);
    });
}

const handleOnBlurFields = (element) => {
    return element.addEventListener("blur", (event) => {
        console.log("Blur element");
        console.log(element);

        const { isValid, ouputMessage } = validateField(event.target.value, event.target.dataset.fieldName);
        if (isValid) return;

        messages.activeGlobalMessage({
            message: ouputMessage,
            type: "warning"
        });
    });
}

export {
    handleValidateFields,
    handleOnBlurFields
}

/*
? Internet (manual de usuario)
? intranet: Varios dispositivos conectados localmente
*/