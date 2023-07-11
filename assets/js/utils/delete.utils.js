import messages from "./messages.utils.js"
import useFetch from "./useFetch.utils.js"

const __delete__ = ({
  url,
  target,
  message
}) => {

  const deletedHandler = async () => {
    await useFetch({
      url,
      method: "DELETE",
      useLoader: target,
      failFetchOptions: {
        useAbortEndedTime: true,
        maxTime: 10000
      }
    })
  }

  return messages.confirmationMessage({
    textName: message,
    deletedHandler
  })
}

export default __delete__