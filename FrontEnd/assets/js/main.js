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
// APP INIT
/**
 * This function initializes the application :
 * Retrieves data from API and displays it on the home page (const gallery).
 */
async function appInit() {
    await getData();
    await displayProjectsGallery();
};
///////////////////////////////////////////////////////////////////////
appInit(); 
///////////////////////////////////////////////////////////////////////