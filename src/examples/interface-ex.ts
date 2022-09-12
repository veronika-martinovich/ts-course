interface ISomeClass {
  prop2: string;
  method2(): void;
}

class SomeClass1 implements ISomeClass {
  private prop1: string = "prop1";
  public prop2: string = "prop2";

  private method1() {
    console.log("method1");
  }

  public method2() {
    console.log("method2");
  }
}

class SomeClass2 extends SomeClass1 {
  public method3() {
    console.log("method3");
  }
}

const obj1 = new SomeClass1();

const obj2 = new SomeClass2();
obj2.method3();
obj2.method2();
obj2.prop2;
