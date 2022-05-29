"use strict";
class Department {
    constructor(name) {
        this.name = name;
        //name: string;
        this.employees = [];
        //this.name = name;
    }
    // to not to loose context
    describe() {
        console.log("Description: " + this.name);
    }
    addEmployee(employee) {
        //this.employees.push(employee);
    }
}
const accounting = new Department("Accounting");
accounting.describe();
