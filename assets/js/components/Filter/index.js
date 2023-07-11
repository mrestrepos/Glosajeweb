import { setLinkStyles } from "../../helpers/navigation.js";
import useSignalJs from "../../helpers/useSignalJs.js";
import Global from "../Global/index.js";

export default class Filter extends Global {
  #initFilter;
  constructor({
    id = Date.now(),
    componentBodyHTML = () => {},
    initFilter = true
  }) {
    setLinkStyles(import.meta.url);
    super({
      id,
      componentName: "filter",
      componentBodyChildId: "filterChild",
      componentBodyId: "body",
      componentBodyHTML
    });
    this.#initFilter = initFilter;
    this.#init();
    this.onHideFilter = useSignalJs(() => {});
  }

  #filterHTML() {
    return `
    <input type="checkbox" id="hideFilter" ${
      this.#initFilter ? "" : "checked"
    } hidden>
    <section data-type-filter='filter' class="filterDesign" data-filter='${
      this.id
    }'>
      <div data-type-filter='body'></div>
      </section>
      <label for="hideFilter" data-type-filter='hideFilter' class="hideFilter">&lt;</label>
    `;
  }

  #init() {
    document.body.insertAdjacentHTML("afterbegin", this.#filterHTML());
    const { body, filter } = this._getComponent();

    this.componentBodyHTML.apply(
      null,
      this._insertParams({ target: body, filterId: this.componentBodyChildId, formTypes: this.getBodyChildren })
    );
    filter.addEventListener("click", (event) => {
      event.stopPropagation();
      const { target } = event;
      const { dataset = {} } = target;
      const type = dataset.typeFilter;

      if (type === "hideFilter") {
        this.onHideFilter.current = {
          target,
          type,
          toggleHideFilter: this.#toggleHideFilter
        };
        return;
      }

      this.onContentClick.current({target, dataset, type}, event);
    });
  }

  #toggleHideFilter() {
    return "hi";
  }
}
