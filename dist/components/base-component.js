// Component Base Class
export class Component {
    constructor(templateId, hostElementId, elementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        this.element = document.importNode(this.templateElement.content, true).firstElementChild;
        if (elementId) {
            this.element.id = elementId;
        }
        this.attach();
    }
    attach() {
        this.hostElement.appendChild(this.element);
    }
}
