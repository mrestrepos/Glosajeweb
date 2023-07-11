import fetchUrls from "../../../utils/fetchUrls.enum.js"
import useFetch from "../../../utils/useFetch.utils.js"

export const deleteCategory = async ({
  target,
  getContextId
}, messageCallback) => {
  const {
    request = {}, result = {}
  } = await useFetch({
    url: fetchUrls?.FETCH_SPRING_DELETE_CATEGORY(getContextId(false)),
    useLoader: target,
    method: "DELETE",
    failFetchOptions: {
      useAbortEndedTime: true
    }
  })

  let message = "Categoria no eliminada"
  let type = "danger"

  if (request?.ok) {
    message = `Categoria ${result?.categoryName} eliminada exitosamente`,
      type = "success"

    target.closest("tr").remove()
  }

  messageCallback({
    message,
    type
  })
}

export const setCategory = async ({
  target,
  getContextId
}) => {

  const {
    request,
    result
  } = await useFetch({
    url: fetchUrls.FETCH_SPRING_GET_CATEGORY(getContextId(false)),
    useLoader: target.closest("div"),
    method: "GET",
    failFetchOptions: {
      useAbortEndedTime: true
    }
  })

  if (request?.ok) {
    target.value = result.categoryName
    target.disabled = false
  }
}

export const setCategories = async ({
  target
}) => {

  const {
    request,
    result
  } = await useFetch({
    url: fetchUrls.FETCH_SPRING_GET_CATEGORIES(),
    useLoader: target,
    method: "GET",
    failFetchOptions: {
      useAbortEndedTime: true
    }
  })

  if (!request?.ok) {
    return
  }

  for (const {
      categoryName,
      id
    } of result) {
    target.innerHTML += `
      <tr>
        <td>${id}</td>
        <td>${categoryName}</td>
        <td>
        <a href="./editCat.php?id=${id}" class="btn btn-primary">
        <i class="fas fa-marker"></i>
        </a>
        <button class="btn btn-danger" data-global-type='deleteCategory' data-global-id=${id}>
        <i class="fas fa-trash-alt"></i>
        </button>
        </td>
      </tr>
    `
  }

  const table = target.closest("table")

  new simpleDatatables.DataTable(table);
}