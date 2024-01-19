import { removeCssClassOnNodeList, addCssClass } from "./utilities.js";

let data; //console.log(data)
const gallery = document.querySelector(".gallery-container");

/**
 * This function get the data from the API.
 * The resource argument allows us to obtain the targeted data type.
 * 
 * @param {String} resource the key word for the URL.
 * @returns data
 */
async function getData(resource) {
    let fetchResource = resource;

    // Sets resource at init when arg:resource is undefined.
    if (fetchResource === undefined) {
        fetchResource = "works";
    }

    const response = await fetch(`http://localhost:5678/api/${fetchResource}`);
    //console.log(response)
    try {
        if (response.status === 404) {
            throw new Error("404, Page not found");
        }
        if (response.status === 500) {
            throw new Error("500, Internal servor error");
        }

        data = await response.json();
        console.log("DATA COME FROM API : " + fetchResource);

        return data; 
        // return console.log(data + fetchResource);

    } catch (error) {
        console.error(error);
    } 
};

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
// GALLERY SYSTEM

/**
 * This function builds each item of the gallery.
 * 
 * @param {String} title data.title - Sets figcaption of the figure element and the alt attribute of the img.
 * @param {String} src  data.imageUrl - The URI of the figure element.
 */
async function elementBuilder(title, src) {
    const galleryElement = document.createElement("figure");

    const titleElement = document.createElement("figcaption");
    titleElement.innerText = title;

    const imgElement = document.createElement("img");
    imgElement.src = src;
    imgElement.setAttribute("alt", `${titleElement}`);

    galleryElement.appendChild(imgElement);
    galleryElement.appendChild(titleElement);

    if (gallery) {
        gallery.appendChild(galleryElement);
    };
};

/**
 * This function displays all the projects of the gallery
 * @param {Object} data the data object
 * 
 * [use getData("works") function].
 * [use elementBuilder() function].
 */
async function displayProjectsGallery() {
    data = await getData("works");

    if (gallery) {
        gallery.innerHTML = "";
    };

    for (let i =0; i < data.length; i++) {
        elementBuilder(data[i].title, data[i].imageUrl);
    };
};

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
// FILTER SYSTEM

/**
 * This function is called when we click on a filter button (eventListener).
 * It manages the CSS logic of the filter buttons and rebuilds the gallery 
 * based on the button's dataset.id.
 * 
 * [use elementBuilder() function].
 * 
 * @param {Element} element - The HTML element on which we apply the behavior.
 */
async function filterEngine(element) {
    removeCssClassOnNodeList("btn-filter-activated", "btn-filter");   //console.log("remove CSS on filter btns");
    let data = await getData("works");    //console.log(data);
    let selectedFilter = element.dataset.id;
    let projectsFiltered;

    if (selectedFilter === "0") {
        addCssClass("btn-filter-activated", element);
        projectsFiltered = data.filter(function() {
            return data;                  //console.log(data);
        });
        gallery.innerHTML = "";
        for (let i = 0; i < projectsFiltered.length; i++) {
            elementBuilder(projectsFiltered[i].title, projectsFiltered[i].imageUrl);
            };
            // console.log(projectsFiltered);
    } else {
        addCssClass("btn-filter-activated", element);
        // console.log(data)
        projectsFiltered = data.filter(function(data) {   // console.log(data);
            return data.categoryId === parseInt(selectedFilter);
        });
        // console.log(projectsFiltered);
        // console.log(selectedFilter);
        gallery.innerHTML = "";
        for (let i = 0; i < projectsFiltered.length; i++) {
            elementBuilder(projectsFiltered[i].title, projectsFiltered[i].imageUrl);
        };
        // console.log(projectsFiltered);
    };
};

/**
 * This function builds the filter buttons (attributes, CSS classes, 
 * parent attached, eventListener).
 * 
 * [use filterEngine() function].
 * 
 */
async function ButtonFilterFactory() {
    const categoriesId = await getData("categories")
    const filtersContainer = document.querySelector(".filters-container");

    let btnShowAllCategories = document.createElement("button");

    btnShowAllCategories.setAttribute("data-id", "0");
    btnShowAllCategories.setAttribute("role", "button");
    btnShowAllCategories.textContent = "Tous";
    btnShowAllCategories.setAttribute("aria-label", btnShowAllCategories.textContent);
    addCssClass("btn-filter", btnShowAllCategories);
    addCssClass("btn-filter-activated", btnShowAllCategories); //Add this CSS class by default when we initialize the app (category "ALL")

    filtersContainer.appendChild(btnShowAllCategories);

    btnShowAllCategories.addEventListener("click", function() {
        //console.log("ALL");
        filterEngine(this);
        //console.log("ALL_AFTER");
    });                                                   

    categoriesId.map((element) => {
        let btnShowOneCategory = document.createElement("button");

        btnShowOneCategory.setAttribute("data-id", element.id);
        btnShowOneCategory.setAttribute("role", "button");
        btnShowOneCategory.textContent = element.name;
        btnShowOneCategory.setAttribute("aria-label", btnShowOneCategory.textContent);
        addCssClass("btn-filter", btnShowOneCategory);

        filtersContainer.appendChild(btnShowOneCategory);

        btnShowOneCategory.addEventListener("click", function() {
            //console.log("ONE");
            filterEngine(this);
            //console.log("ONE_AFTER");
        });
    });                                                      
}; 

///////////////////////////////////////////////////////////////////////////////////////////////
/**
 * This function initializes the filter system.
 */
async function filterSystemInit() {
    ButtonFilterFactory();
};
///////////////////////////////////////////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////////////////////////////////////////
// APP INIT
/**
 * This function initializes the application :
 * Retrieves data from API and displays it on the home page (const gallery).
 */
async function appInit() {
    await getData();
    await displayProjectsGallery();
    await filterSystemInit();
};
///////////////////////////////////////////////////////////////////////
appInit(); 
///////////////////////////////////////////////////////////////////////