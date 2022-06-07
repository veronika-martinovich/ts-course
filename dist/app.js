import { ProjectList } from "./components/project-list.js";
import { ProjectInput } from "./components/project-input.js";
var App;
(function (App) {
    const projInput = new ProjectInput();
    const activeProjList = new ProjectList("active");
    const finishedProjList = new ProjectList("finished");
})(App || (App = {}));
