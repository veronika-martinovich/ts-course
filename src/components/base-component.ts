namespace App {
  // Component Base Class
  export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(templateId: string, hostElementId: string, elementId?: string) {
      this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
      this.hostElement = document.getElementById(hostElementId)! as T;
      this.element = document.importNode(this.templateElement.content, true).firstElementChild! as U;
      if (elementId) {
        this.element.id = elementId;
      }

      this.attach();
    }

    private attach() {
      this.hostElement.appendChild(this.element);
    }

    abstract configure(): void;

    abstract renderContent(): void;
  }
}
