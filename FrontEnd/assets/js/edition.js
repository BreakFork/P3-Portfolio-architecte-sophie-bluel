import { getData } from "./main.js"
import { toggleCssClass, addCssClass, removeCssClass } from "./utilities.js";

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//// EDITION MODE : INTERFACE  
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
    addCssClass("editor-button", editorButton);
    editorButton.innerHTML = `
        <i class="fa-solid fa-pen-to-square"></i>
        <a id="editor-button href="#">Mode édition</a>
    `;

    portfolioHeader.appendChild(editorButton);
};

// GALLERY SYSTEM --------------------------------------------------------

/**
 * This function builds the gallery that displays in the modal when 
 * the user opens it by clicking the modalOpenButton (event -> openModal()).
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
    addWorkButtonFunctionality();
    modaleContainer.setAttribute("aria-hiden", "false");
};
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//// EDITION MODE : MODAL AND EDITOR 
const DOM_body = document.querySelector(".body");
const modaleContainer = document.getElementById("modale-container");
const modaleContent = document.querySelector(".modal-content");
const modalWindowButtonsContainer = document.getElementById("modale-navbar-btn");
const modalTitle = document.querySelector(".modale-title");
const modalGalleryContent = document.querySelector(".modale-gallery");
const modalCloseButton = document.getElementById("close-modale");
let form = document.getElementById("addWorkForm");
let data;

/**
 * This function lauches the reset of the modal :
 * - Sets the buttons of the modale navbar and the main button 
 *   using AddWorkButtonGalleryMode() 
 * - Sets the body position (for scrolling).
 * - Sets the display of the modale itself
 * 
 * [use AddWorkButtonGalleryMode()]
 * [use rebootModale()]
 * 
 */
function closeModal() {
    AddWorkButtonGalleryMode(document.querySelector(".add-photo-btn"));
    modalWindowButtonsContainer.style.justifyContent = "flex-end";

    modaleContainer.addEventListener("click", () => {rebootModale()});

    modalCloseButton.addEventListener("click", () => {
        removeCssClass("body-modal-mode", DOM_body);
        rebootModale();
    });
    
    if (document.getElementById("go-back-button") !== null) {
        document.getElementById("go-back-button").remove();
    };

    modaleContainer.setAttribute("aria-hiden", "true");
    DOM_body.classList.remove("body-modal-mode");
};

/**
 * This function allows the user to access the modal by placing an 
 * eventListener on the editor button.
 * 
 * [use displayEditorGallery()]
 * 
 */
function openModal() {
    let editorButton = document.querySelector(".editor-button");
    modalGalleryContent.innerHTML = "";
    
    editorButton.addEventListener("click", () => {
        addCssClass("body-modal-mode", DOM_body);
        modaleContainer.style.display = "flex";
        modalGalleryContent.innerHTML = "";
        displayEditorGallery();
    })
    modaleContent.addEventListener("click", (event) => {
        event.stopPropagation();
    })
};

/**
 * This function restarts the modal :
 * - Sets the buttons of the modale navbar and the main button 
 *   using AddWorkButtonGalleryMode() 
 * - Sets the display of the modale itself
 * 
 * [use AddWorkButtonGalleryMode()]
 *  
 */
function rebootModale() {
    AddWorkButtonGalleryMode(document.querySelector(".add-photo-btn"));
    modaleContainer.style.display = "none";
    modalGalleryContent.innerHTML = "";
    addCssClass("modale-gallery", modalGalleryContent);
    modalWindowButtonsContainer.style.justifyContent = "flex-end";
    if (document.getElementById("go-back-button") !== null) { 
        document.getElementById("go-back-button").remove();
    };
    modaleContainer.setAttribute("aria-hidden", "true");
};

/**
 * This function generates a goBackButton (left arrow) allowing 
 * the user to exit the addWork() functionality of the editor.
 * 
 * [use displayEditorGallery()]
 * [use AddWorkButtonGalleryMode()]
 * 
 */
function createAddWorkGoBackButton() {
    const goBackButton = document.createElement("div");
    goBackButton.id = "go-back-button";
    addCssClass("go-back-button", goBackButton);
    goBackButton.innerHTML = "<i class=\"fa-solid fa-arrow-left fa-lg\"></i>";
    modalWindowButtonsContainer.prepend(goBackButton);
    modalWindowButtonsContainer.style.justifyContent = "space-between";

    goBackButton.addEventListener("click", () => {
        modalGalleryContent.innerHTML = "";
        addCssClass("modale-gallery", modalGalleryContent)
        modalWindowButtonsContainer.style.justifyContent = "flex-end";
        modalWindowButtonsContainer.removeChild(modalWindowButtonsContainer.firstElementChild);
        modalTitle.innerText = "Galerie photo";
        displayEditorGallery();
        AddWorkButtonGalleryMode(document.querySelector(".add-photo-btn"));
    })
};

/**
 * This function sets the adWorkButton in editor mode
 * 
 * @param {element} element 
 */
function AddWorkButtonEditorMode(element) {
    element.textContent = "Valider";
    element.style.backgroundColor = "var(--app-modal-submit-btn-disabled-bkg-clr)";
};

/**
 * This function sets the adWorkButton in gallery mode
 * 
 * @param {element} element 
 */
function AddWorkButtonGalleryMode(element) {
    element.textContent = "Ajouter une photo";
    element.style.backgroundColor = "var(--app-theme-secondary-clr)";
    element.disabled = false;
};

/**
 * This function lauches the display of the addWorkForm.
 * 
 * [use createAddWorkForm()]
 * [use AddWorkButtonEditorMode()]
 */
function addWorkButtonFunctionality() {
    document.querySelector(".add-photo-btn").addEventListener("click", () => {
        modalGalleryContent.innerHTML = "";
        removeCssClass("modale-gallery", modalGalleryContent);
        if (!document.getElementById("go-back-button")) {
            createAddWorkGoBackButton();
        }
        
        createAddWorkForm();
        modalTitle.innerText = "Ajout photo";
        AddWorkButtonEditorMode(document.querySelector(".add-photo-btn"));
    })
};
//////////////////////////////////////
// --- set form :

/**
 * This function creates an input file for addWorkForm.
 * 
 * @param {element} element 
 */
function createInputFile(element) {  //console.log("FROM ELEMENT : " + element)
    let inputFile = document.createElement("input");

    inputFile.type = "file";
    inputFile.id = "file";
    // inputFile.classList.add("");
    inputFile.style.opacity = 0;
    inputFile.style.height = "0px";
    inputFile.setAttribute("name", "image");
    inputFile.setAttribute("accept", ".jpg, .png");

    let inputFileLabel = document.createElement("label");

    inputFileLabel.classList.add("addWork-input-file-label");
    // inputFile.classList.add("");
    inputFileLabel.setAttribute("for", "file");
    inputFileLabel.textContent = "+ Ajouter photo";

    element.appendChild(inputFileLabel);
    element.appendChild(inputFile);
};

/**
 * 
 * This function cretes an input text for addWorkForm.
 * 
 * @param {element} element 
 */
function createInputText(element) {
    let inputText = document.createElement("input");

    inputText.type = "text";
    inputText.classList.add("addWork-input");
    inputText.name = "title";
    inputText.id = "title";

    let inputTextLabel = document.createElement("label");
    inputTextLabel.textContent = "Titre";
    inputTextLabel.setAttribute("for", "title");

    element.appendChild(inputTextLabel);
    element.appendChild(inputText);
};

/**
 * This function creates an input select for addWorkForm.
 * -> fetch "categories"
 * 
 * @param {element} element 
 */
async function createInputSelect(element) {
    let inputSelect = document.createElement("select");

    inputSelect.name = "category";
    inputSelect.id = "categories";
    inputSelect.classList.add("addWork-input");

    let inputSelectLabel = document.createElement("label");

    inputSelectLabel.setAttribute("for", "categories");
    inputSelectLabel.id = "selected-category";
    inputSelectLabel.textContent = "Categorie";

    let defaultOption = document.createElement("option");

    defaultOption.value = "";

    inputSelect.appendChild(defaultOption);
    element.appendChild(inputSelectLabel);
    element.appendChild(inputSelect);

    data = await getData("categories"); console.log("FROM INPUT : " + JSON.stringify(data))

    for (const category of data) {
        let option = document.createElement("option");

        option.value = category.id;
        option.textContent = category.name;

        inputSelect.appendChild(option);
    }
};

/**
 * This function creates a submit button for addWorkForm.
 */
function createSubmitButton() {
    let editorSubmitButton = document.createElement("button");

    editorSubmitButton.id = "editorSubmitButton";
    editorSubmitButton.setAttribute("form", "addWorkForm");
    editorSubmitButton.setAttribute("type", "submit");
    editorSubmitButton.innerText = "Valider";
    editorSubmitButton.classList.add("add-photo-btn");
    editorSubmitButton.style.backgroundColor = "var(--app-modal-submit-btn-bkg-clr)";

    document.querySelector(".close-modale-container").appendChild(editorSubmitButton);
};

/**
 * This function creates the addWorkForm allowing the user to 
 * create new works.
 */
function createAddWorkForm() {
    document.querySelector(".add-photo-btn").remove()

    form = document.createElement("form");
    form.id = "addWorkForm";
    form.setAttribute("action", "");
    form.setAttribute("method", "post");
    form.classList.add("addWorkForm");

    let inputFileContainer = document.createElement("div");
    inputFileContainer.classList.add("addWork-input-file-container");

    let allowedDataText = document.createElement("p");
    allowedDataText.classList.add("allowed-data-text");
    // allowedDataText.classList.add("");
    allowedDataText.textContent = "jpg, png : 4mo max";

    let bkgImage = document.createElement("img");    
    bkgImage.src = "../FrontEnd/assets/icons/picture-svgrepo-com 1.png";

    inputFileContainer.appendChild(bkgImage);

    createInputFile(inputFileContainer);
    inputFileContainer.appendChild(allowedDataText);

    form.appendChild(inputFileContainer);

    createInputText(form);
    createInputSelect(form);
    createSubmitButton(); 
    
    modalGalleryContent.appendChild(form);
}

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
//////////////////////////////////////////////////////////////////////////
if (window.localStorage.getItem("token")) {
    console.log("VOUS ETES CONNECTE")
    editModeInterfaceInit();
    openModal();
    closeModal();
}
