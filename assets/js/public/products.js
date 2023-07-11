import { ACTIVE_SWEET_ALERT } from "../config.js";
import fetchUrls from "../utils/fetchUrls.enum.js";
import messages, { fallBackMessages } from "../utils/messages.utils.js";
import useFetch from "../utils/useFetch.utils.js";

const renderItemsContainer = document.querySelector(
  '[data-render-items-relative="parent"]'
);

const targetTypes = {
  DELETE_PRODUCT: "deleteProduct",
  UPDATE_PRODUCT: "updateProduct",
  ADD_PRODUCT: "addProduct",
  DELETE_CATEGORY: "deleteCategory",
};

renderItemsContainer.addEventListener("click", async (event) => {
  let target = event.target;
  if (
    target.tagName === "path" ||
    target.tagName === "svg" ||
    target.tagName === "I"
  ) {
    target = target.closest("button");
  }
  const dataset = target.dataset;

  const deletedProductSuccess = (message) => {
    if (ACTIVE_SWEET_ALERT) {
      const elementDeleteSelected = target.closest("tr");

      renderItemsContainer
        .querySelector("[data-render-items-relative='subParent']")
        .removeChild(elementDeleteSelected);
    }

    //     const subParent = Array.from(renderItemsContainer.querySelector("[data-render-items-relative='subParent']").children)
    //
    //     const index = subParent.findIndex(el => el.querySelector("td[data-id]").dataset.id === elementDeleteSelected.dataset.id)
    //     subParent.splice(1, index)
    //
    if (ACTIVE_SWEET_ALERT) {
      return messages.activeGlobalMessage({
        message,
        type: "success",
      });
    }

    fallBackMessages.fastMessage({
      message,
      counterDown: 4,
    });
  };

  const { DELETE_PRODUCT, DELETE_CATEGORY } = targetTypes;
  switch (dataset.renderItemType) {
    case DELETE_PRODUCT: {
      if (ACTIVE_SWEET_ALERT) {
        messages.confirmationMessage({
          textName: dataset.entryName,

          deletedHandler: async () => {
            let { request, result } = await useFetch({
              method: "GET",
              url: fetchUrls.FETCH_DELETE_PRODUCT(target.parentNode.dataset.id),
              useLoader: target,
              failFetchOptions: {
                useAbortEndedTime: true,
              },
            });

            console.log(request);
            if (request.ok)
              deletedProductSuccess(result.message || "Categoria Eliminada");
          },
        });
        break;
      }

      console.log("Handler deleted product");
      fallBackMessages.handlerDisplayMessage({
        title: dataset.entryName,
        onDelete: async () => {
          let { request, result } = await useFetch({
            method: "GET",
            url: fetchUrls.FETCH_DELETE_PRODUCT(target.parentNode.dataset.id),
            useLoader: target,
            failFetchOptions: {
              useAbortEndedTime: true,
            },
          });

          return (
            request.ok &&
            deletedProductSuccess(result.message || "Producto Eliminado")
          );
        },
      });

      break;
    }

    case DELETE_CATEGORY: {
      if (ACTIVE_SWEET_ALERT) {
        messages.confirmationMessage({
          textName: dataset.entryName,

          deletedHandler: async () => {
            let { request, result } = await useFetch({
              method: "GET",
              url: fetchUrls.FETCH_DELETE_CATEGORY(
                target.parentNode.dataset.id
              ),
              useLoader: target,
              failFetchOptions: {
                useAbortEndedTime: true,
              },
            });

            if (request.ok)
              deletedProductSuccess(result.message || "Categoria Eliminada");
          },
        });
        break;
      }

      fallBackMessages.handlerDisplayMessage({
        title: dataset.entryName,

        onDelete: async () => {
          let { request, result } = await useFetch({
            method: "GET",
            url: fetchUrls.FETCH_DELETE_CATEGORY(target.parentNode.dataset.id),
            useLoader: target,
            failFetchOptions: {
              useAbortEndedTime: true,
            },
          });

          if (request.ok)
            deletedProductSuccess(result.message || "Categoria Eliminada");
        },
      });
      break;
    }
  }
});
