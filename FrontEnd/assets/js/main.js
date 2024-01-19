import { removeCssClassOnNodeList, addCssClass } from "./utilities.js";

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
// GALLERY SYSTEM

let data; //console.log(data)

/**
 * This function get the data from the API.
 * The resource argument allows us to obtain the targeted data type.
 * 
 * @param {String} resource the key word for the URL.
 * @returns data
 */
export async function getData(resource) {
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

        return console.log(data);

    } catch (error) {
        console.error(error);
    } 
};

getData("works");
getData("categories");