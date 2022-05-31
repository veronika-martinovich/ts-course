// Array
const person1: {
  name: string;
  age: number;
  role: (string | number)[]; // any amount of elements
} = {
  name: "Veronika",
  age: 29,
  role: [2, "admin"],
};

// Tuple
const person2: {
  name: string;
  age: number;
  role: [number, string]; // only two elements with precise length
} = {
  name: "Veronika",
  age: 29,
  role: [2, "admin"],
};

// Enum and Custom Type
enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

type Profession = "economist" | "programmist";

const person3: {
  name: string;
  age: number;
  role: Role;
  profession: Profession;
} = {
  name: "Veronika",
  age: 29,
  role: Role.ADMIN,
  profession: "programmist",
};
