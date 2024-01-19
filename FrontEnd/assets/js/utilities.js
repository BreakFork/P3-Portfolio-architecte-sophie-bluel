// ///////////////////////////////////////////////////////////////////////
// UTILITIES FUNCTIONS ///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
// FILTERS SYSTEM

/**
 * This function removes one CSS class on nodeList.
 * 
 * @param {String} removedClass the CSS class to remove.
 * @param {String} classTargetingNodeList the CSS class that targets the node list.
 */
export async function removeCssClassOnNodeList(removedClass, classTargetingNodeList) {
    const nodeList = [...document.getElementsByClassName(classTargetingNodeList)];

    nodeList.forEach(element => {
        if (element.classList.contains(removedClass)) { 
            element.classList.remove(removedClass);
        }
    })
};

//////////////////////////////////////////////////////////////////////////
// APP

/**
 * This function adds a CSS class on a HTMLElement.
 * 
 * @param {String} cssClass The CSS class to add on the element.
 * @param {Element} element The HTMLElement receving the CSS class.
 */
export async function addCssClass(cssClass, element) {
    element.classList.add(cssClass);
};