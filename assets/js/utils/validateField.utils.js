const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const phoneRegex = /^\d{7,10}$/g;
const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;

const types = {
  EMAIL: "email",
  PASSWORD: "password",
  PHONE_NUMBER: "phoneNumber",
};

const validateField = (value, type = "text") => {
  let isValid = value.length > 2;
  let ouputMessage = "Campo  requerido";

  const { EMAIL, PASSWORD, PHONE_NUMBER } = types;

  switch (type) {
    case EMAIL:
      isValid = emailRegex?.test(value);

      if (!isValid) {
        ouputMessage = "El correo es inválido";
      }
      break;

    case PASSWORD:
      isValid = passwordRegex?.test(value);

      if (!isValid) {
        ouputMessage = `La contraseña debe tener como minimo: 1 digito, 
                1 letra minuscula, 1 letra mayuscula, 1 caracter 
                especial y una longitud de 8.`;
      }
      break;

    case PHONE_NUMBER: {
      isValid = !!parseInt(value) && value.length >= 7 && value.length <= 10;
      if (!isValid) {
        ouputMessage = `Ingrese numero telefonico valido`;
      }
      console.log(ouputMessage);
      break;
    }

    default:
      break;
  }

  return {
    isValid,
    ouputMessage,
  };
};

export default validateField;
