export const getCart = localStorage?.getItem("cart") ? [...JSON.parse(localStorage?.getItem("cart"))] : [];

const reducer = (target, property, value) => ({
  delete: () => {
    target.splice(value, 1)
  },

  add: () => {
    const index = target.findIndex(({
      userId,
      productId
    }) => userId === value?.userId && productId === value?.productId)

    if (index !== -1) return
    target.push(value)
  }
})

const cart = new Proxy(getCart, {

  set: (target, property, value) => {

    const exec = reducer(target, property, value)[property]

    if (typeof exec !== "function") return

    exec()

    localStorage.setItem("cart", JSON.stringify(target));

    return true;
  }
});

export default cart