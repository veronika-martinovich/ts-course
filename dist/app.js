"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var App;
(function (App) {
    // State Class
    class State {
        constructor() {
            this.listeners = [];
        }
        addListener(listenerFn) {
            this.listeners.push(listenerFn);
        }
    }
    // ProjectState Class
    class ProjectState extends State {
        constructor() {
            super();
            this.projects = [];
        }
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            this.instance = new ProjectState();
            return this.instance;
        }
        addProject(title, description, numOfPeople) {
            const newProject = new App.Project(Math.random().toString(), title, description, numOfPeople, App.ProjectStatus.Active);
            this.projects.push(newProject);
            for (const listenerFn of this.listeners) {
                listenerFn([...this.projects]);
            }
        }
        moveProject(projectId, newStatus) {
            const project = this.projects.find((proj) => proj.id === projectId);
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
            }
        }
        updateListeners() {
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice());
            }
        }
    }
    const projectState = ProjectState.getInstance();
    function validate(validatableInput) {
        let isValid = true;
        if (validatableInput.value) {
            isValid = isValid && validatableInput.value.toString().trim().length !== 0;
        }
        if (validatableInput.minLength && typeof validatableInput.value === "string") {
            isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
        }
        if (validatableInput.maxLength && typeof validatableInput.value === "string") {
            isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
        }
        if (validatableInput.min && typeof validatableInput.value === "number") {
            isValid = isValid && validatableInput.value >= validatableInput.min;
        }
        if (validatableInput.max && typeof validatableInput.value === "number") {
            isValid = isValid && validatableInput.value <= validatableInput.max;
        }
        return isValid;
    }
    // Autobind Decorator
    function Autobind(target, methodName, descriptor) {
        const originalMethod = descriptor.value;
        const adjustedDescriptor = {
            configurable: true,
            get() {
                const boundFn = originalMethod.bind(this);
                return boundFn;
            },
        };
        return adjustedDescriptor;
    }
    // Component Base Class
    class Component {
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
    // ProjectItem Class
    class ProjectItem extends Component {
        constructor(hostId, project) {
            super("single-project", hostId, project.id);
            this.project = project;
            this.configure();
            this.renderContent();
        }
        get persons() {
            if (this.project.people === 1) {
                return "1 person";
            }
            else {
                return `${this.project.people} persons`;
            }
        }
        dragStartHandler(event) {
            event.dataTransfer.setData("text/plain", this.project.id);
            event.dataTransfer.effectAllowed = "move";
        }
        configure() {
            this.element.addEventListener("dragstart", this.dragStartHandler);
        }
        renderContent() {
            this.element.querySelector("h2").textContent = this.project.title;
            this.element.querySelector("h3").textContent = this.persons + " assigned";
            this.element.querySelector("p").textContent = this.project.description;
        }
    }
    __decorate([
        Autobind
    ], ProjectItem.prototype, "dragStartHandler", null);
    // ProjectList Class
    class ProjectList extends Component {
        constructor(type) {
            super("project-list", "app", `${type}-projects`);
            this.type = type;
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }
        dragOverHandler(event) {
            if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
                event.preventDefault();
                const listEl = this.element.querySelector("ul");
                listEl.classList.add("droppable");
            }
        }
        dropHandler(event) {
            const projId = event.dataTransfer.getData("text/plain");
            projectState.moveProject(projId, this.type === "active" ? App.ProjectStatus.Active : App.ProjectStatus.Finished);
        }
        dragLeaveHandler(event) {
            const listEl = this.element.querySelector("ul");
            listEl.classList.remove("droppable");
        }
        configure() {
            this.element.addEventListener("dragover", this.dragOverHandler);
            this.element.addEventListener("dragleave", this.dragLeaveHandler);
            this.element.addEventListener("drop", this.dropHandler);
            projectState.addListener((projects) => {
                const relevantProjects = projects.filter((proj) => {
                    if (this.type === "active")
                        return proj.status === App.ProjectStatus.Active;
                    return proj.status === App.ProjectStatus.Finished;
                });
                this.assignedProjects = relevantProjects;
                this.renderProjects();
            });
        }
        renderContent() {
            const listId = `${this.type}-projects-list`;
            this.element.querySelector("ul").id = listId;
            this.element.querySelector("h2").textContent = this.type.toUpperCase() + "PROJECTS";
        }
        renderProjects() {
            const listEl = document.getElementById(`${this.type}-projects-list`);
            listEl.innerHTML = "";
            for (const projItem of this.assignedProjects) {
                new ProjectItem(this.element.querySelector("ul").id, projItem);
            }
        }
    }
    __decorate([
        Autobind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        Autobind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        Autobind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    // ProjectInput Class
    class ProjectInput extends Component {
        constructor() {
            super("project-input", "app", "user-input");
            this.titleInputElement = this.element.querySelector("#title");
            this.descriptionInputElement = this.element.querySelector("#description");
            this.peopleInputElement = this.element.querySelector("#people");
            this.configure();
            this.renderContent();
        }
        configure() {
            this.element.addEventListener("submit", this.submitHandler);
        }
        renderContent() { }
        gatherUserInputs() {
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredPeople = this.peopleInputElement.value;
            const titleValidatable = { value: enteredTitle, required: true };
            const descriptionValidatable = { value: enteredDescription, required: true, minLength: 5 };
            const peopleValidatable = { value: +enteredPeople, required: true, min: 1, max: 5 };
            if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {
                alert("Invalid inputs, please try again!");
                return;
            }
            else {
            }
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
        clearInputs() {
            this.titleInputElement.value = "";
            this.descriptionInputElement.value = "";
            this.peopleInputElement.value = "";
        }
        submitHandler(event) {
            event.preventDefault();
            const userInputs = this.gatherUserInputs();
            if (Array.isArray(userInputs)) {
                const [enteredTitle, enteredDescription, enteredPeople] = userInputs;
                projectState.addProject(enteredTitle, enteredDescription, enteredPeople);
                this.clearInputs();
            }
        }
    }
    __decorate([
        Autobind
    ], ProjectInput.prototype, "submitHandler", null);
    const projInput = new ProjectInput();
    const activeProjList = new ProjectList("active");
    const finishedProjList = new ProjectList("finished");
})(App || (App = {}));
