"use strict";
// Array
const person1 = {
    name: "Veronika",
    age: 29,
    role: [2, "admin"],
};
// Tuple
const person2 = {
    name: "Veronika",
    age: 29,
    role: [2, "admin"],
};
// Enum and Custom Type
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
const person3 = {
    name: "Veronika",
    age: 29,
    role: Role.ADMIN,
    profession: "programmist",
};
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
