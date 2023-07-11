import neighborhoods from "../../assets/js/domicilios.js";
import { host } from "../../assets/js/utils/fetchUrls.enum.js";
import {
  useFetch,
  messages,
  validateField
} from "../../assets/js/utils/index.js";
import {
  handleOnBlurFields,
  handleValidateFields
} from "./handleValidateFields.js";

const { activeGlobalMessage } = messages;

const comuna_barrio = document.querySelector("#comuna_barrio");

comuna_barrio.onclick = function (event) {
  const target = event.target;

  const otro2 = document.querySelector("[name='otro2']");

  if (target.tagName === "SELECT" && target.value === "Otra" && !!!otro2) {
    const HTML = `
                        <input type="text" name="otro2" placeholder="Su barrio" required="required"/>
                    `;
    return target.closest("div").insertAdjacentHTML("afterend", HTML);
  }

  if (!!otro2) {
    otro2.parentNode.removeChild(otro2);
  }
};

const department = document.querySelector("select[id='municipio']");

window.onload = () => {
  let HTML_NEIGHBORHOODS = "<option value='notfound'>Not found</option>";

  if (!!!neighborhoods.city.length) return;
  else HTML_NEIGHBORHOODS = "";

  for (let city of neighborhoods.city) {
    HTML_NEIGHBORHOODS += `
                    <option value="${city}">${city}</option>
                    `;
  }

  department.innerHTML = HTML_NEIGHBORHOODS;
};

const loginForm = document.querySelector("[data-login]");
const registerForm = document.querySelector("[data-register]");

[loginForm, registerForm].forEach((element) => {
  return element.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const dataset = this.dataset;

    let { request = {}, result = {} } = await useFetch({
      url: this.action,
      useLoader: this.querySelector("button[type='submit']"),
      method: "POST",
      body: formData,
      failFetchOptions: {
        useAbortEndedTime: true,
        maxTime: 6000
      }
    });

    if (!request?.ok) return;

    if (dataset?.register) {
      return activeGlobalMessage({
        message:
          "Para terminar el proceso de inscripcion, siga las instrucciones que le hemos enviado en el correo registrado",
        type: "success"
      });
    } else if (dataset?.login) {
      if (Object.values(result).length && result?.location){
        window.location.href = host(result.location)
      }
    }
  });
});

let displayPasswordMatchStatus;
handleValidateFields(registerForm, {
  plusValidation: (passwordField) => {
    clearTimeout(displayPasswordMatchStatus);

    const registerPasswords = registerForm.querySelectorAll(
      "[data-field-name='password']"
    );

    const matchPasswords = Array.from(registerPasswords).every(
      (inputPassword) => inputPassword.value === passwordField.value
    );

    if (!matchPasswords) {
      displayPasswordMatchStatus = setTimeout(() => {
        activeGlobalMessage({
          message: "No coinciden las contraseñas",
          type: "warning"
        });
      }, 1000);
    }

    registerPasswords.forEach(
      (password) => (password.dataset.valid = matchPasswords)
    );

    return matchPasswords;
  },

  fieldName: ["password"]
});

handleValidateFields(loginForm);

[
  ...loginForm.querySelectorAll("input"),
  ...registerForm.querySelectorAll("input")
].forEach((element) => handleOnBlurFields(element));
