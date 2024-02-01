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
 * This function removes a CSS class on a HTMLElement.
 * 
 * @param {String} cssClass The CSS class to remove on the element
 * @param {Element} element The HTMLElement ------- the CSS class
 */
export async function removeCssClass(removedClass, element) {
    element.classList.remove(removedClass);
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

/**
 * 
 * @param {element} emptyElement 
 * @param {array || null} param1 
 * @param {boolean} option 
 */
export function removeChildElementsFromNodeList([...removedElements], emptyElement, option) {
    const parentArray = [];
    const childArray = [];
    const resultArray = [];

    const array = Array.from(emptyElement.childNodes);
    const args = Array.from([...removedElements]);

    for(const member of array) {
        parentArray.push(member);
    }

    for(const arg of args) {
        childArray.push(arg);
    }

    childArray.forEach(member => {
        if(parentArray.includes(member)) {
            console.log(...member)
        }
    })

    // console.log(childArray)

    

    // console.log(parentArray)




    function cleaner() { console.log("CLEANER :")

        const parentArray = [];
        const childArray = [];
        const resultArray = [];

        const array = Array.from(emptyElement.childNodes);
        const args = Array.from([...removedElements]);
        console.log(array)
        for(const member of array) {
            parentArray.push(member);     
        }

        for(const arg of args) {
            childArray.push(arg);
        }


        // console.log(childArray)
        childArray.forEach(element => {
            if(parentArray.includes(element)) {
                return console.log(element)
            }
        })
    }

    option === true ? cleaner()
    : console.log(option);
}

