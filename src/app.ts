/// <reference path="components/project-list.ts"/>
/// <reference path="components/project-input.ts"/>

namespace App {
  const projInput = new ProjectInput();
  const activeProjList = new ProjectList("active");
  const finishedProjList = new ProjectList("finished");
}
