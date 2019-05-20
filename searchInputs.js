class SearchStuff extends HTMLElement {
     static get observedAttributes() {
         return ['names', 'types', 'labels', 'formId', 'action'];
     }

    constructor() {

        super();

        this.names = "";
        this.types = "";     
        this.labels = "";
        this.values = "";
        this.radioSelected = "";
        this.radioValues = "";
        this.action = "";     
        this.formId = "";
        this.radiosCreated = 0;
        this.JSONdata = {};

       window.addEventListener('load', () => {
            let shadow = this.attachShadow({
                mode: 'open'
            });
           
            this.wraper = document.createElement('form');
            this.wraper.setAttribute('class', 'flexTable');
           

            //If element has been created with variables change them
            // if(this.hasAttribute('names')) {
            //     this.names = this.getAttribute('names').split(',')
            // }
            // console.log(this)   
            // if(this.hasAttribute('types')) {
            //     this.types = this.getAttribute('types').split(',')
            // }
            // if(this.hasAttribute('labels')) {
            //     this.labels = this.getAttribute('labels').split(',')
            // }
            // if(this.hasAttribute('values')) {
            //     this.values = this.getAttribute('values').split(',')
            // }
            // if(this.hasAttribute('radiovalues')) {
            //     this.radioValues = this.getAttribute('radiovalues').split(',')
            // }
            // if(this.hasAttribute('radioselected')) {
            //     this.radioSelected = this.getAttribute('radioselected')
            // }
            // if(this.hasAttribute('action')) {
            //     this.wraper.setAttribute('action', this.getAttribute('action'))
            // }
            // if(this.hasAttribute('formId')) {
            //     this.wraper.setAttribute('id', this.getAttribute('formId'))
            // }
            if(this.hasAttribute('JSONdata')) {
                this.JSONdata = JSON.parse(this.getAttribute('JSONdata'))
            }
            console.log(this.JSONdata)
            console.log(typeof(this.JSONdata))
            
             this.JSONdata['action'] ? this.wraper.setAttribute('action', this.JSONdata['action']) : ''
             this.JSONdata['formId'] ? this.wraper.setAttribute('id', this.JSONdata['formId']) : ''

             if(this.JSONdata['inputs']) {
                this.JSONdata['inputs'].forEach((input) => { 
                    switch(input.type) {
                        case 'text':
                            this.buildInputLabelDiv(this.renderlabel(input.label), this.renderTextInput(input.name, input.value));
                            break;
                        case 'email':
                            this.buildInputLabelDiv(this.renderlabel(input.label), this.renderEmailInput(input.name, input.value));
                            break;
                        case 'number':
                            this.buildInputLabelDiv(this.renderlabel(input.label), this.renderNumberInput(input.name, input.value));
                            break;
                        case 'tel':
                            this.buildInputLabelDiv(this.renderlabel(input.label), this.renderTelInput(input.name, input.value));
                            break;
                        case 'url':
                            this.buildInputLabelDiv(this.renderlabel(input.label), this.renderUrlInput(input.name, input.value));
                            break;
                        case 'button':
                            this.buildInputLabelDiv(this.renderlabel(input.label), this.renderButtonInput(input.name, input.value));
                            break;
                        case 'checkbox':
                            this.buildInputLabelDiv(this.renderlabel(input.label), this.renderCheckboxInput(input.name, input.value));
                            break;
                        case 'submit':
                            this.buildInputLabelDiv(this.renderlabel(input.label), this.renderSubmitInput(input.name, input.value));
                            break;
                        case 'radio':
                            this.buildInputLabelDiv(this.renderlabel(input.label), this.renderRadioInput(input.name, input.value, input.selected));
                            break;
                        case 'newThing':
                            this.buildInputLabelDiv(this.renderlabel(input.label), this.renderInput(input.attributes))
                    }
                });
             }
            // if(this.names.length !== this.types.length || this.types.length !== this.labels.length || this.names.length !== this.labels.length){
            //     alert("Developer names, types and labels are not the same length. Go home and re-think your life")
                
            // }

            // for(let i in this.names) {
            //     switch(this.types[i]) {
            //         case 'text':
            //             this.buildInputLabelDiv(this.renderlabel(this.labels[i]), this.renderTextInput(this.names[i], this.values[i]));
            //             break;
            //         case 'email':
            //             this.buildInputLabelDiv(this.renderlabel(this.labels[i]), this.renderEmailInput(this.names[i], this.values[i]));
            //             break;
            //         case 'number':
            //             this.buildInputLabelDiv(this.renderlabel(this.labels[i]), this.rendernumberInput(this.names[i], this.values[i]));
            //             break;
            //         case 'tel':
            //             this.buildInputLabelDiv(this.renderlabel(this.labels[i]), this.renderTelInput(this.names[i], this.values[i]));
            //             break;
            //         case 'url':
            //             this.buildInputLabelDiv(this.renderlabel(this.labels[i]), this.renderUrlInput(this.names[i], this.values[i]));
            //             break;
            //         case 'button':
            //             this.buildInputLabelDiv(this.renderlabel(this.labels[i]), this.renderButtonInput(this.names[i], this.values[i]));
            //             break;
            //         case 'checkbox':
            //             this.buildInputLabelDiv(this.renderlabel(this.labels[i]), this.renderCheckboxInput(this.names[i], this.values[i]));
            //             break;
            //         case 'submit':
            //             this.buildInputLabelDiv(this.renderlabel(this.labels[i]), this.renderSubmitInput(this.names[i], this.values[i]));
            //             break;
            //         case 'radio':
            //             this.buildInputLabelDiv(this.renderlabel(this.labels[i]), this.renderRadioInput(this.names[i], this.values[i]));
            //             break;
            //     }

            // }

            shadow.appendChild(this.wraper);
       });
    } 



    renderlabel(label) {
        let labelDiv = document.createElement('div');
        labelDiv.innerText = label;
        return labelDiv;
    }

    //Make any input type element
    renderInput(attributes) {
        let newInput = document.createElement('input');
        for(let i in attributes) { 
            newInput.setAttribute(i, attributes[i])
        }
        return newInput;
    }

    //Make any element (Dun Dun DUn!!!)
    renderElement(elementType, attributes) {
        let newElement = document.createElement(elementType);
        for(let i in attributes) { 
            newElement.setAttribute(i, attributes[i])
        }
        return newElement;
    }
    // Make a text input
    renderTextInput(name, value) {
        console.log(name, value)
        let newInput = document.createElement('input');
        newInput.setAttribute('name', name);
        newInput.setAttribute('value', value);
        newInput.setAttribute('type', 'text');
        return newInput;
    }
    // Make a email input
    renderEmailInput(name, value) {
        let newInput = document.createElement('input');
        newInput.setAttribute('name', name);
        newInput.setAttribute('value', value);
        newInput.setAttribute('type', 'email');
        return newInput;
    }
    // Make a number input
    renderNumberInput(name, value) {
        let newInput = document.createElement('input');
        newInput.setAttribute('name', name);
        newInput.setAttribute('value', value);
        newInput.setAttribute('type', 'number');
        return newInput;
    }
    // Make a tel input
    renderTelInput(name, value) {
        let newInput = document.createElement('input');
        newInput.setAttribute('name', name);
        newInput.setAttribute('value', value);
        newInput.setAttribute('type', 'tel');
        return newInput;
    }
    // Make a url input
    renderUrlInput(name, value) {
        let newInput = document.createElement('input');
        newInput.setAttribute('name', name);
        newInput.setAttribute('value', value);
        newInput.setAttribute('type', 'url');
        return newInput;
    }
    // Make a button input
    renderButtonInput(name, value) {
        let newInput = document.createElement('input');
        newInput.setAttribute('name', name);
        newInput.setAttribute('value', value);
        newInput.setAttribute('type', 'button');
        return newInput;
    }
    // Make a checkbox input
    renderCheckboxInput(name, value) {
        let newInput = document.createElement('input');
        newInput.setAttribute('name', name);
        newInput.setAttribute('value', value);
        newInput.setAttribute('type', 'checkbox');
        return newInput;
    }
    // Make a submit input
    renderSubmitInput(name, value) {
        let newInput = document.createElement('input');
        newInput.setAttribute('name', name);
        newInput.setAttribute('value', value);
        newInput.setAttribute('type', 'submit');
        return newInput;
    }
    // Make a email input
    renderRadioInput(name, value, selected) {
        let newInput = document.createElement('input');
        newInput.setAttribute('name', name);
        newInput.setAttribute('type', 'radio');

        newInput.setAttribute('value', value);
        if(selected == 'true'){
            newInput.setAttribute('checked', 'true');

        }
        this.radiosCreated += 1
        return newInput;
    }

    renderTimeDateElem(name, value) {
        newinput ='<form name="formTimeDateInputOne"> <#FTLSTUFF> </form>'
    }

    buildInputLabelDiv(labelElement, inputElement) {
        let inputLabelDiv = document.createElement("div");
        inputLabelDiv.appendChild(labelElement);
        inputLabelDiv.appendChild(inputElement);
        this.wraper.appendChild(inputLabelDiv)
    }
}

customElements.define('search-stuff', SearchStuff);
window.SearchStuff = SearchStuff;