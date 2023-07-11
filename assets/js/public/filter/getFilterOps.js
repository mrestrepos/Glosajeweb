import fetchUrls from "../../utils/fetchUrls.enum.js"
import useFetch from "../../utils/useFetch.utils.js"

export const getFilterOps = async (target, filterOption) => {
  const {result} = await useFetch({
    method: "GET",
    url: fetchUrls.FETCH_FILTER(`type=${filterOption}`),
    useLoader: target,
    failFetchOptions: {}
  })

  return result
}

export default getFilterOps