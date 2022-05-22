class Department {
  //name: string;
  private employees: string[] = [];

  constructor(public name: string) {
    //this.name = name;
  }

  // to not to loose context
  describe(this: Department) {
    console.log("Description: " + this.name);
  }

  addEmployee(employee: string) {
    //this.employees.push(employee);
  }
}

const accounting = new Department("Accounting");
accounting.describe();
