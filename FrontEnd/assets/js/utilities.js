// ///////////////////////////////////////////////////////////////////////
// UTILITIES FUNCTIONS ///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
/**
 * This function removes one CSS class on a nodeList.
 * 
 * [used in filterEngine()]
 * 
 * @param {String} removedClass the CSS class to remove.
 * @param {String} classTargetingNodeList the CSS class that targets the node list.
 * 
 * [used in filterEngine()]
 * 
 */
export async function removeCssClassOnNodeList(removedClass, classTargetingNodeList) {
    const nodeList = [...document.getElementsByClassName(classTargetingNodeList)];

    nodeList.forEach(element => {
        if (element.classList.contains(removedClass)) { 
            element.classList.remove(removedClass);
        }
    })
};

/**
 * This function adds a CSS class on a HTMLElement.
 * 
 * [used in filterEngine()]
 * [used in ButtonFilterFactory()]
 * 
 * @param {String} cssClass The CSS class to add on the element.
 * @param {Element} element The HTMLElement receving the CSS class.
 * 
 */
export async function addCssClass(cssClass, element) {
    element.classList.add(cssClass);
};

/**
 * This function toggles a CSS class on a HTMLElement.
 * 
 * [used in toggleEditionHeaderDisplay()]
 * [used in toggleFilterButtonsDisplay()]
 * [used in toggleEditorButtonDisplay()]
 * 
 * @param {String} cssClass The CSS class to switch.
 * @param {Element} element The HTMLElement on wich we switch the CSS class.
 * 
 */
export async function toggleCssClass(cssClass, element) {
    element.classList.toggle(cssClass);
};
