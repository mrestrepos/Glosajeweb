const handleFilterForm = document.querySelector("#handleFilterForm");
const showSelectedTypes = document.querySelector("#showSelectedTypes");
const inputRange = document.querySelectorAll("[type='range']");
const submitButton = document.querySelector("[type='submit']");
const mainContent = document.querySelector("#mainContent");
const formChildren = handleFilterForm.querySelectorAll("input, select");

const reqParams = new URLSearchParams(window.location.search);
if (reqParams.get("sort")) {

    for (let element of formChildren) {
        if (element.tagName === "SELECT") {
            element.value = [...document.querySelector("#sortBy").children].find(child => child.value === reqParams.get("sort")).value;
            break;
        }
    }
}

const initialInputValues = {
    form: [...formChildren].map((element, index) => {
        return {
            tag: element.tagName,
            value: element.value,
            index
        }
    }),
}
const filtersApplied = JSON.parse(localStorage?.getItem("filtersApplied"));

if (filtersApplied) {
    let HTML = "";
    for (filter in filtersApplied) {
        HTML += `
            <tr>
                <td><strong>${filter === "types" ? "Last Type" : filter}</strong></td>
                <td>${filter === "sort" ?
                [...document.querySelector("#sortBy").children].find(child => child.value === filtersApplied[filter]).textContent
                :
                filtersApplied[filter]}</td>
            </tr>
        `;
    }
    HTML = `
    <div class="filtersApplied active" id="modal">
    <table>
        <thead>
          <th>Filter</th>
          <th>Value</th>
        </thead>
        <tbody>${HTML}</tbody>
      </table>
      <button data-close-button>X</button>
    </div>
    `;

    mainContent.insertAdjacentHTML("afterbegin", HTML);
    localStorage.removeItem("filtersApplied");
}

const fetchData = async (fetchUri) => {
    const request = await fetch(fetchUri, {
        method: "GET",
        headers: {
            "Authorization": "123456"
        }
    });

    response = await request.json();
    return response;
}

window.addEventListener("load", () => {
    let HTML = "";

    fetchData("http://localhost/glosajeWeb/controladores/getFilterOptions.php?type=categories").then(({filtersRequired: response}) => {
        console.log("response");
        console.log(response);
        
        response = response.map(element => element[0]);
        console.log(response);
        for (element of response) {

            element = element.replace(/\s+/g, " ");
            
            const value = element.replace(/\s+/g, "+");
            HTML += `<label id="selectedType"> <input type="checkbox" name="types" value=${value}><span>${element}</span></label>`
        }
        return content.insertAdjacentHTML("afterbegin", HTML);
    }).catch(() => {
        HTML = "<h3>Nothing Found</h3>";
        return content.insertAdjacentHTML("afterbegin", HTML);
    });
});

fetchData("http://localhost/glosajeWeb/controladores/getFilterOptions.php?type=getMinAndMaxPrice").then(({filtersRequired: response}) => {

    const inputEvent = new CustomEvent("custom:inputData", { detail: { response: response[0][1] } });
    inputRange.forEach(input => input.dispatchEvent(inputEvent));
});


inputRange.forEach(input => {
    input.addEventListener("custom:inputData", event => {
        const max = event.detail.response;

        event.target.min = 0;
        event.target.max = max;

        if (reqParams.get("minPrice") && event.target.name === "minPrice") {
            event.target.value = reqParams.get("minPrice");
            event.target.closest("label").querySelector("#rangeValue").textContent = reqParams.get("minPrice");
        }
        else if (reqParams.get("maxPrice") && event.target.name === "maxPrice") {
            event.target.value = reqParams.get("maxPrice");
            event.target.closest("label").querySelector("#rangeValue").textContent = reqParams.get("maxPrice");
        }
    });
})

inputRange.forEach(element => {
    element.addEventListener("input", e => {
        const rangeValue = element.closest("label").querySelector("#rangeValue");
        rangeValue.textContent = e.target.value;
    });
});

showSelectedTypes.addEventListener("input", e => {
    const condition = e.target.checked;

    if (condition) return;

    const element = e.target.closest("#selectedType");
    const index = [...showSelectedTypes.children].indexOf(element);

    if (index !== -1) delete showSelectedTypes.children[index];

    if (!!!content.children.length) return content.appendChild(element);
    return content.insertBefore(element, content.firstChild);
    // showSelectedTypes?.removeChild(element);
});

// handleFilterForm.addEventListener("submit", async function (e){
//     e.preventDefault();
//     console.log("Is submiting");
//     const formData = new FormData(handleFilterForm);
//     const data = Object.fromEntries(formData);

//     console.log(data);
//     this.submit();

//     console.log(handleFilterForm);
// });

handleFilterForm.addEventListener("submit", e => e.preventDefault());

// const previousDataInput = new CustomEvent("custom:previousDataInput", {
//     detail: {
//         form: [...formChildren].map((element, index) => {
//             console.log(element);
//             return {
//                 tag: element.tagName,
//                 value: element.value,
//                 index
//             }
//         }),
//         externInputs: mainContent.querySelectorAll("#selectedType").length
//     }
// });

// formChildren.forEach(element => {
//     element.addEventListener("custom:previousDataInput", (e) => {
//         console.log("Validacion");
//         console.log(e.detail);
//         console.log(e.target.value);
//         const i = e.detail.form.find(({ value }) => value === e.target.value);
//         console.log("i");
//         if (!!i && mainContent.querySelectorAll("#selectedType").length === e.detail.externInputs) {
//             submitButton.disabled = true;
//             submitButton.classList.add("bg-gray")
//         }
//         else {
//             submitButton.disabled = false;
//             submitButton.classList.remove("bg-gray");
//         }
//         console.log(i);
//     });
// });

const observer = new MutationObserver(function (mutation) {
    if (!!mutation[0].addedNodes.length) {
        submitButton.disabled = false;
        return submitButton.classList.remove("bg-gray");
    }
    submitButton.disabled = true;
    return submitButton.classList.add("bg-gray")

});

observer.observe(handleFilterForm, { childList: true, subtree: true });

handleFilterForm.addEventListener("input", function (e) {
    // e.target.dispatchEvent(previousDataInput);
    const isFilterSelected = initialInputValues.form.every(({ value, index }) => {
        return value === [...formChildren][index].value;
    });

    if (isFilterSelected) {
        submitButton.disabled = true;
        return submitButton.classList.add("bg-gray")
    }
    submitButton.disabled = false;
    return submitButton.classList.remove("bg-gray");
});



submitButton.addEventListener("click", function (e) {
    e.preventDefault();

    const form = e.target.closest("form");
    const formData = new FormData(form);
    let data = Object.fromEntries(formData);
    console.log("data");
    console.log(data);

    const params = new URLSearchParams();
    for (let key in data) {
        if (!!!data[key]) {
            delete data[key];
            continue;
        }
        params.append(key, data[key]);
    }

    localStorage.setItem("filtersApplied", JSON.stringify(data));
    form.submit();
});