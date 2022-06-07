import { Component } from "./base-component.js";
import { Autobind } from "../decorators/autobind.js";
import { Validatable, validate } from "../utils/validation.js";
import { projectState } from "../state/project-state.js";

// ProjectInput Class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", "user-input");
    this.titleInputElement = this.element.querySelector("#title")! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector("#description")! as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector("#people")! as HTMLInputElement;

    this.configure();
    this.renderContent();
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent() {}

  private gatherUserInputs(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = { value: enteredTitle, required: true };
    const descriptionValidatable: Validatable = { value: enteredDescription, required: true, minLength: 5 };
    const peopleValidatable: Validatable = { value: +enteredPeople, required: true, min: 1, max: 5 };

    if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {
      alert("Invalid inputs, please try again!");
      return;
    } else {
    }
    return [enteredTitle, enteredDescription, +enteredPeople];
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInputs = this.gatherUserInputs();
    if (Array.isArray(userInputs)) {
      const [enteredTitle, enteredDescription, enteredPeople] = userInputs;
      projectState.addProject(enteredTitle, enteredDescription, enteredPeople);
      this.clearInputs();
    }
  }
}
