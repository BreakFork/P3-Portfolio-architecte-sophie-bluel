import { getData } from "./main.js"
import { displayProjectsGallery } from "./main.js";
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
            // console.log(event.target.parentNode.id)
            let workId;
            event.target.id === "" ? workId = event.target.parentNode.id : null;
            event.target.id !== "" ? workId = event.target.id            : null;
            deleteWorks(workId).then(workId = "");
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
    let addWorkbutton = document.querySelector(".add-photo-btn");
    AddWorkButtonGalleryMode(addWorkbutton);
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
    let addWorkBtn = document.querySelector(".add-photo-btn");
    AddWorkButtonGalleryMode(addWorkBtn);
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
    element.classList.add("disabled");
};

/**
 * This function sets the adWorkButton in gallery mode
 * 
 * @param {element} element 
 */
function AddWorkButtonGalleryMode(element) {
    element.textContent = "Ajouter une photo";
    element.classList.remove("disabled");
    element.disabled = false;
};

/**
 * This function lauches the display of the addWorkForm.
 * 
 * [use createAddWorkForm()]
 * [use AddWorkButtonEditorMode()]
 */
function addWorkButtonFunctionality() {
    let addWorkBtn = document.querySelector(".add-photo-btn");
    addWorkBtn.addEventListener("click", () => {

        modalGalleryContent.innerHTML = "";

        createAddWorkForm();

        modalTitle.innerText = "Ajout photo";

        AddWorkButtonEditorMode(addWorkBtn);

        removeCssClass("modale-gallery", modalGalleryContent);

        if (!document.getElementById("go-back-button")) {
            createAddWorkGoBackButton();
        }
    })
};
//////////////////////////////////////
// --- set form :

/**
 * This function creates an input file for addWorkForm.
 * 
 * @param {element} element 
 */
function createInputFile(element) {  
    let inputFile = document.createElement("input");

    inputFile.type = "file";
    inputFile.id = "file";
    inputFile.classList.add("invisible");
    inputFile.style.opacity = 0;
    inputFile.style.height = "0px";
    inputFile.setAttribute("name", "image");
    inputFile.setAttribute("accept", ".jpg, .png");

    let inputFileLabel = document.createElement("label");

    inputFileLabel.classList.add("addWork-input-file-label");
    inputFileLabel.classList.add("invisible");
    inputFileLabel.setAttribute("for", "file");
    inputFileLabel.textContent = "+ Ajouter photo";

    element.appendChild(inputFileLabel);
    element.appendChild(inputFile);
};

/**
 * This function creates an input text for addWorkForm.
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
    editorSubmitButton.classList.add("disabled");

    document.querySelector(".close-modale-container").appendChild(editorSubmitButton);
};

/**
 * This function creates a container to diplay the the form's
 * error messages.
 * 
 * @param {element} element 
 * @param {number} id 
 */
function createErrorMessageContainer(element, id) {
    let errorContainer = document.createElement("div");
    errorContainer.id = "error" + id;
    errorContainer.setAttribute("arira-hiden", "true");
    element.appendChild(errorContainer);
}

/**
 * This function creates the addWorkForm allowing the user to 
 * create new works.
 */
function createAddWorkForm() {
    document.querySelector(".add-photo-btn").remove();

    form = document.createElement("form");
    form.id = "addWorkForm";
    form.setAttribute("action", "");
    form.setAttribute("method", "post");
    form.classList.add("addWorkForm");

    let inputFileContainer = document.createElement("div");
    inputFileContainer.classList.add("addWork-input-file-container");

    let allowedDataText = document.createElement("p");
    allowedDataText.classList.add("allowed-data-text");
    allowedDataText.classList.add("invisible");
    allowedDataText.textContent = "jpg, png : 4mo max";

    let bkgImage = document.createElement("img");    
    bkgImage.src = "../FrontEnd/assets/icons/picture-svgrepo-com 1.png";
    bkgImage.classList.add("invisible");
    inputFileContainer.appendChild(bkgImage);

    let messageContainer = document.createElement("p");
    messageContainer.classList.add("error-container");

    createInputFile(inputFileContainer);
    inputFileContainer.appendChild(allowedDataText);

    form.appendChild(inputFileContainer);

    createInputText(form);
    createInputSelect(form);
    form.appendChild(messageContainer);
    createErrorMessageContainer(messageContainer, "File");
    createErrorMessageContainer(messageContainer, "Title");
    createErrorMessageContainer(messageContainer, "Category");
    createSubmitButton(); 
    
    modalGalleryContent.appendChild(form);
    submitAddWorkFormValidation(form);
}
//////////////////////////////////////
// ADD WORKS FUNCTIONALITY
// --- sets inputs
/**
 * This function sends the form's error messages on submit event.
 * 
 * @param {string} message 
 * @param {number} id 
 */
function sendErrorMessage(message, id) {
    let errorMessage = document.getElementById("error" + id);
    errorMessage.classList.add("error-message")
    errorMessage.textContent = message;
};

/**
 * This function checks if the input file is entered and displays 
 * the error message if necessary (using sendErrorMessage() function).
 * 
 * [use sendErrorMessage()]
 * 
 * @param {object} inputFile 
 * @returns 
 */
function inputFileValidation(inputFile) {
    if (inputFile.value != "") {
        document.getElementById("errorFile").style.display = "none";
        return true;
    } else {
        document.getElementById("errorFile").style.display = "block";
        sendErrorMessage("Veuillez charger une image", "File");
    }
};

/**
 * This function checks if the input text (for Title) is entered and displays 
 * the error message if necessary (using sendErrorMessage() function).
 * 
 * [use sendErrorMessage()]
 * 
 * @param {string} inputTitle 
 * @returns 
 */
function inputTextValidation(inputTitle) {
    let regex = new RegExp("[a-zA-Z0-9._-]+");
    if (regex.test(inputTitle)) {
        document.getElementById("errorTitle").style.display = "none";
        return true;
    } else {
        document.getElementById("errorTitle").style.display = "block";
        sendErrorMessage("Veuillez renseigner un titre", "Title");
    };
}

/**
 * This function checks if the input select is entered and displays 
 * the error message if necessary (using sendErrorMessage() function).
 * 
 * [use sendErrorMessage()]
 * 
 * @param {string} inputCategory 
 * @returns 
 */
function inputSelectValidation(inputCategory) {
    if (inputCategory !== "") {
        document.getElementById("errorCategory").style.display = "none";
        return true;
    } else {
        document.getElementById("errorCategory").style.display = "block";
        sendErrorMessage("Veuillez renseigner une catégorie", "Category");
    }
};

/**
 * This function generates a validation message to display when
 * user successfully add a work using addWorkForm's submit event.
 * 
 * @param {element} element 
 */
function sendValidationMessage(element) {
    let validationMessage = document.createElement("p");
    validationMessage.id = "addWork-checked";
    element.appendChild(validationMessage);
    validationMessage.textContent = "Votre travail a bien été ajouté";
}

/**
 * This function removes the message of validation (when user adds work) 
 * after timeout setted inside postWork() function.
 */
function removeValidationMessage() {
    let validationMessage = document.getElementById("addWork-checked");
    if (validationMessage !== null) {
        validationMessage.remove();
    }
}

/**
 * This function hides elements of the addWorkForm to allow the preview
 * of the image loaded.
 * 
 * @param {element} elements 
 * @param {img} imgPreview 
 */
function hideElementsForImgPreview(elements, imgPreview) {
    for (const element of elements) {
        element.classList.toggle("opacity-zero");
    }
    imgPreview.remove();
};

/**
 * This function creates the image preview functionality in addWorkForm.
 * 
 * [use hideElementsForImgPreview()]
 * 
 * @param {object} inputFile 
 */
function updatePreviewImage(inputFile) {
    document.getElementById("errorFile").style.display = "none";

    let hiddenElements = document.querySelectorAll(".invisible");
    let imgPreview = document.createElement("img");

    imgPreview.style.position = "absolute";
    imgPreview.style.height = "100%";
    imgPreview.style.width = "100%";
    imgPreview.style.maxWidth = "169px";
    imgPreview.style.maxHeight = "169px";
    imgPreview.style.marginTop = "0px";
    imgPreview.src = URL.createObjectURL(inputFile.files[0]);
    imgPreview.alt = inputFile.files[0].name;
    imgPreview.id  = "imgPreview" 

    hideElementsForImgPreview(hiddenElements, imgPreview);

    document.querySelector(".addWork-input-file-container").appendChild(imgPreview);
};

/**
 * This function POST a new work in DB.
 * Sets the reboot of the gallery.
 * Sets the elements for previewing.
 * Sets the validation message.
 * 
 * [use displayProjectsGallery()]
 * [use hideElementsForImgPreview()]
 * [use sendValidationMessage()]
 * 
 * @param {object} formData 
 */
async function postWork(formData) {
    const token = window.localStorage.getItem("token");
    // let messageContainer = document.querySelector("error-container")
    let data;

    try {
        const response = await fetch("http://localhost:5678/api/works",{
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData

        }).then(data = await getData())
        //   .then(response => console.log(response))
          .then(displayProjectsGallery(data))
          .then(hideElementsForImgPreview(document.querySelectorAll(".invisible"), document.getElementById("imgPreview")))
          .then(sendValidationMessage(form))
          .then(setTimeout(removeValidationMessage, 5000))
          .then(form.reset());
          
        if (response.status === 400) {
            throw new Error("400, Bad Request")
        }
        if (response.status === 404) {
            throw new Error("401, Unauthorized")
        }
        if (response.status === 500) {
            throw new Error("500, Internal server error")
        }

    } catch (error) {
        console.log("Error: ", error);
    }
};

/**
 * This function monitors changes to the inputs to manage the display 
 * of the preview and initiates input validation. If validated, launch 
 * the postWork() function.
 * 
 * [use inputFileValidation()]
 * [use inputTextValidation()]
 * [use inputSelectValidation()]
 * [use postWork()]
 * 
 * @param {object} form 
 */
async function submitAddWorkFormValidation(form) {
    let inputFile = document.getElementById("file");
    let inputTitle = document.getElementById("title");
    let inputCategories = document.getElementById("categories");
    let inputGroup = [inputFile, inputTitle, inputCategories];

    inputFile.addEventListener("change", () => {
        updatePreviewImage(inputFile);
    })

    inputGroup.map((element) => element.addEventListener("change", () => {
        document.querySelector(".add-photo-btn").classList.remove("disabled");
    }))

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);

        inputFileValidation(inputFile);
        inputTextValidation(inputTitle.value);
        inputSelectValidation(inputCategories.value);

        if (inputFileValidation(inputFile) && inputTextValidation(inputTitle.value) && inputSelectValidation(inputCategories.value)) {
            postWork(formData);
        }
    })
};
//////////////////////////////////////
// --- Delete Functionality :

/**
 * This function allows the user to delete works in DB.
 * 
 * @param {object} workId 
 */
async function deleteWorks(workId) {
    const token = window.localStorage.getItem("token");

    try {
        const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json",
                       "Authorization": `Bearer ${token}`
                     }
                     
        })
          .then(modalGalleryContent.innerHTML = "")
          .then(await displayEditorGallery())
          .then(await displayProjectsGallery())
          
        if (response.status === 404) {
            throw new Error("401, Unauthorized")
        }
        if (response.status === 500) {
            throw new Error("500, Internal servor error")
        }

    } catch (error) {
        console.log("Error: ", error);
    }
};

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
};
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
if (window.localStorage.getItem("token")) {
    console.log("VOUS ETES CONNECTE(E)")
    editModeInterfaceInit();
    openModal();
    closeModal();
}
