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
const modalAddWorkButton = document.querySelector(".add-photo-btn");
const modaleContent = document.querySelector(".modal-content");
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
    const modalCloseButton = document.getElementById("close-modale");

    modalCloseButton.onclick = function() { modaleContainer.style.display = "none"; };

    /**
     * This function opens the modal when user click on openModalButton.
     */
    async function openModal() {
        openModalButton.onclick = function() {
            modaleContainer.style.display = "flex";
            modalGalleryContent.innerHTML = "";
            displayEditorGallery();
            modalAddWorkButton.addEventListener("click", () => {
                openAddWorkInterface();
            })
            modaleContent.addEventListener("click", (event) => {
                event.stopPropagation();
            })
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

// ADD WORK SYSTEM -------------------------------------------------------
const modalTitle = document.querySelector(".modale-title");
const modalWindowButtonsContainer = document.getElementById("modale-close-btn");

// --- set interface :
/**
 * This function initializes the editor's interface.
 */
function openAddWorkInterface() {
    setModalAddWorkInterface();
}

/**
 * This function defines the display of the editor interface.
 */
function setModalAddWorkInterface() {
    modalGalleryContent.innerHTML = "";
    modalTitle.textContent = "Ajout photo";
    // modalAddWorkButton.textContent = "Scope OK !";
    createAddWorkGoBackButton();
    // createAddWorkForm();
}

/**
 * This function restarts the editor gallery when the user 
 * exits the addWork() functionality by clicking the goBackButton.  
 */
function rebootModalGallery() {
    modalTitle.textContent = "Galerie photo";
    modalWindowButtonsContainer.style.justifyContent = "flex-end";
    document.getElementById("go-back-button").remove();
};

/**
 * This function generates a goBackButton (left arrow) allowing 
 * the user to exit the addWork() functionality of the editor.
 * 
 * [use rebootModalGallery() function]
 * [use displayEditorGallery() function]
 * 
 */
function createAddWorkGoBackButton() {
    const goBackButton = document.createElement("div");

    goBackButton.id = "go-back-button";
    goBackButton.classList.add("go-back-button");
    goBackButton.innerHTML = "<i class=\"fa-solid fa-arrow-left fa-lg\"></i>";

    modalWindowButtonsContainer.prepend(goBackButton);
    modalWindowButtonsContainer.style.justifyContent = "space-between";

    goBackButton.addEventListener("click", () => {
        rebootModalGallery()
        displayEditorGallery();
    })
}

// --- set form :




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