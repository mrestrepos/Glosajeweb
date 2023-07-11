export const host = (endpoints) => "http://localhost:8000" + endpoints
export const springHost = (endpoints) => "http://localhost:8080/api" + endpoints

const fetchUrls = {
  FETCH_DELETE_PRODUCT: (id) => host(`/controladores/deleteProduc.php?id=${id}`),
  FETCH_DELETE_CATEGORY: (id) => host(`/controladores/deleteCat.php?id=${id}`),
  FETCH_GET_PRODUCTS_BY_IDS: () => host("/controladores/getProductsByIds.php"),
  FETCH_FILTER: (query) => host(`/controladores/getFilterOptions.php?${query}`),
  FILTER_DATA: (query) => host(`/controladores/filterData.php?${query}`),
  FILTER_USER_SESSION: () => host("/controladores/getUserSession.php"),
  FETCH_SPRING_DELETE_CATEGORY: (id) => springHost(`/category/deleteCategory/${id}`),
  FETCH_SPRING_GET_CATEGORY: (id) => springHost(`/category/getCategoryById/${id}`),
  FETCH_SPRING_UPDATE_CATEGORY: (id) => springHost(`/category/editCategory/${id}`),
  FETCH_SPRING_GET_CATEGORIES: () => springHost("/category/getCategories"),
  FETCH_SPRING_CREATE_CATEGORY: () => springHost("/category/createCategory"),
  FETCH_SET_PAYMENT: () => host("/vistas/pago.php")
}

export default fetchUrls
