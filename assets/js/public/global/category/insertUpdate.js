import {
  useFetch
} from "../../../utils/index.js"
import fetchUrls from "../../../utils/fetchUrls.enum.js"

export const addCategory = async ({
  getFormData,
  event,
  target
}) => {

  event.preventDefault()
  const {
    data
  } = getFormData()

  target.disabled = true
  const {
    request = {}
  } = await useFetch({
    url: fetchUrls.FETCH_SPRING_CREATE_CATEGORY(),
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
    useLoader: target
  })

  target.disabled = false
  if (!request?.ok) {
    return
  }
  location.reload();
}

export const updateCategory = async ({
  event,
  getContextId,
  target,
  getFormData
}) => {

  event.preventDefault()

  const {
    data
  } = getFormData()

  const {
    request = {}
  } = await useFetch({
    url: fetchUrls.FETCH_SPRING_UPDATE_CATEGORY(getContextId(false)),
    useLoader: target,
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
    failFetchOptions: {
      useAbortEndedTime: true
    }
  }) || {}

  if (request?.ok) {
    location.href = "./categorias.php"
  }
}