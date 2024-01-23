import { toggleCssClass } from "./utilities.js";

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//// EDITION MODE - INTERFACE FUNCTIONS 
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
// EDITION MODE - INTERFACE INIT 
/**
 * 
 */
function editModeInterfaceInit() {
    toggleLoginLogOutFunctionality();
    toggleEditionHeaderDisplay();
    toggleFilterButtonsDisplay();
    toggleEditorButtonDisplay();
}

if (window.localStorage.getItem("token")) {
    console.log("VOUS ETES CONNECTE")
    editModeInterfaceInit();
}