import * as addCount from "./addCount.js"
import * as init from "./init.js"
import * as deletePurchase from "./deletePurchase.js"

export default function () {

  return {
    ...addCount,
    ...init,
    ...deletePurchase
  }
}