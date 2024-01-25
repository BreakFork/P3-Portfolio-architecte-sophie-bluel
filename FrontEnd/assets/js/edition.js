import { getData } from "./main.js"
import { toggleCssClass } from "./utilities.js";

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//// EDITION MODE - INTERFACE  
/**
 * This function removes the token on localStorage
 */
function logOut() {
    window.localStorage.removeItem("token");
}

/**
 * This function toggles the logIn / logOut functionality on navbar's login link.
 * Set the link (".login").
 * Add eventListener => logOut() 
 */
function toggleLoginLogOutFunctionality() {
    let loginLink = document.querySelector(".login");

    loginLink.textContent = "logout";
    loginLink.href = "";

    loginLink.addEventListener("click", () => {
        logOut();
    })
}

/**
 * This function toggles the edition bar header (UIX).
 */
function toggleEditionHeaderDisplay() {
    let mainWrapper = document.querySelector(".main-wrapper");
    toggleCssClass("main-wrapper-edition-mode", mainWrapper);

    let editionBar = document.createElement("div");
    toggleCssClass("edition-bar", editionBar);
    editionBar.innerHTML = `
        <i class="fa-solid fa-pen-to-square"></i>
        <span>Mode édition</span>
    `;
    
    document.body.prepend(editionBar);
}

/**
 * This function toggles the ".toggle-display" CSS Class 
 * on ".filters-container" HTMLElement.
 */
function toggleFilterButtonsDisplay() {
    let filtersContainer = document.querySelector(".filters-container");

    toggleCssClass("toggle-display", filtersContainer);
}

/**
 * This function toggles the display of the "button" allowing access 
 * to the project editor.
 * NB: "button" is a link (<a>).
 */
function toggleEditorButtonDisplay() {
    let portfolioHeader = document.querySelector(".portfolio-header");

    let portfolioTitle = document.getElementById("portfolio-header--title");
    
    toggleCssClass("title-edition-mode", portfolioTitle);

    let editorButton = document.createElement("div");
    toggleCssClass("editor-button", editorButton);
    editorButton.innerHTML = `
        <i class="fa-solid fa-pen-to-square"></i>
        <a id="editor-button href="#">Mode édition</a>
    `;

    portfolioHeader.appendChild(editorButton);
}

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

//// EDITOR - SYSTEM 
const modalGalleryContent = document.querySelector(".modale-gallery");
// const modaleContent = document.querySelector(".modale-content");
let data;

// MODAL SYSTEM ----------------------------------------------------------

/**
 * This function intializes the opening modal system on openModalButton.
 * -> lauches displayEditorGallery() function.
 * 
 */
function modalSystemInit() {
    //// VARIABLES MODAL
    const modaleContainer = document.getElementById("modale-container");
    const openModalButton = document.querySelector(".editor-button");
    const modalCloseButton = document.getElementById("modale-close-btn");

    modalCloseButton.onclick = function() { modaleContainer.style.display = "none"; };

    /**
     * This function opens the modal when user click on openModalButton.
     */
    async function openModal() {
        openModalButton.onclick = function() {
            modaleContainer.style.display = "flex";
            modalGalleryContent.innerHTML = "";
            displayEditorGallery();
        };
    };

    openModal();
};

// GALLERY SYSTEM --------------------------------------------------------

/**
 * This function builds the gallery that displays in the modal when 
 * the user opens it by clicking the openModalButton (event -> openModal()).
 * 
 * [use getData("works") function].
 * [use openModal() function].
 * 
 */
async function displayEditorGallery() {
    data = await getData("works");

    for(let i = 0; i < data.length; i++) {
        const galleryEditorElement = document.createElement("div");
        galleryEditorElement.classList.add("modale-gallery-elements-container");

        const imgEditorElement = document.createElement("img");
        imgEditorElement.src = data[i].imageUrl;
        imgEditorElement.setAttribute("alt", data[i].title);
        imgEditorElement.classList.add("modale-gallery-img");

        const deleteButton = document.createElement("div");
        deleteButton.classList.add("modale-gallery-delete-button");
        deleteButton.id = data[i].id;
        deleteButton.innerHTML = `<i id=${data[i].id} class="fa-solid fa-trash-can fa-xs"></i>`;

        galleryEditorElement.appendChild(imgEditorElement);
        galleryEditorElement.appendChild(deleteButton);
        modalGalleryContent.appendChild(galleryEditorElement);

        deleteButton.addEventListener("click", (event) => {
            console.log(event.target.parentNode.id)
        });
    };
};



//  ------------------------------------------






//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
// EDITION MODE - INTERFACE INIT 
/**
 * This function initializes the edition interface. 
 * Displays all the elements and sets all behaviours.
 */
function editModeInterfaceInit() {
    toggleLoginLogOutFunctionality();
    toggleEditionHeaderDisplay();
    toggleFilterButtonsDisplay();
    toggleEditorButtonDisplay();
}
//////////////////////////////////////////////////////////////////////////
// EDITOR - INIT
/**
 * 
 */
function editorSystemInit() {
    modalSystemInit()
}

if (window.localStorage.getItem("token")) {
    console.log("VOUS ETES CONNECTE")
    editModeInterfaceInit();
    editorSystemInit();
}