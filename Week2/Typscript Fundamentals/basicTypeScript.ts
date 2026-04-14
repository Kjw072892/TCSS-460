/**
 * Structural Typing
 */
interface User {
  name: string;
  age: number;
}

interface Employee {
  name: string;
  age: number;
  department: string;
}

function greet(user: User): string {
  return `Hello ${user.name}`;
}

const employee: Employee = {
  name: "Kassie",
  age: 32,
  department: "Software Engineering",
};

const greeting: string = greet(employee);

console.log(greeting);

/**
 * Type alias
 */

// Without type alias - hard to read
function processResponse(
  status: 200 | 201 | 400 | 401 | 404 | 500,
  id: string,
  coordinate: [number, number],
): void {
  switch (status) {
    case 200:
      console.log("Good");
    case 201:
      console.log("Good");
    case 400:
      console.log("Invalid Response");
    case 401:
      console.log("Invalid Permission");
    case 404:
      console.log("Not Found");
    case 500:
      console.log("Server error");
  }
}

// with a type alias - clear intent
type ID = string;
type Coordinate = [number, number];
type StatusCode = 200 | 201 | 400 | 401 | 404 | 500;

function processResponse1(
  status: StatusCode,
  id: ID,
  coordinate: Coordinate,
): void {
  switch (status) {
    case 200:
      console.log("Good");
    case 201:
      console.log("Good");
    case 400:
      console.log("Invalid Response");
    case 401:
      console.log("Invalid Permission");
    case 404:
      console.log("Not Found");
    case 500:
      console.log("Server error");
  }
}

/**
 * Type vs Interface
 */

//Defining the shape of objects - your default choice
// Use interface for objects
interface UserA {
  name: string;
  age: number;
}

// Defining unions, tuples, or giving a name to a non-object type
// Use Type for unions and non-object types
type UserB = {
  name: string;
  age: number;
};

/**
 * Union Types
 */

// A Union type allows a variable to hold one of several types. This is a concept with no direct
// Java equivalent - and one of TypeScripts most powerful feature

type ID_A = string | number; // the | reads as or so ID_A is string or number

let userId: ID_A = "abc - 123"; // valid
userId = 42; // also valid
//userId = true; // Error: Type 'boolean' is not assignable to type 'ID_A'

/**
 * Type Narrowing
 */
// When a variable has a union type, you cannot use type-specific operations on it directly - TypeScript does not
// know which type it currently holds:

function formatID(id: string | number): string {
  // return id.toUpperCase(); // Error: Property 'toUpperCase' does not exist on type number
  if (typeof id === "string") {
    // Inside this block, typescript know id is a string
    return id.toUpperCase();
  }
  return id.toString();
}

// TypeScript tracks the typeof check and narrows the type within each branch. This is called control
// flow analysis - the compiler is smart enough to follow your if statements and know which type is possible
// at each point

// Narrowing with truthiness
function greet_a(name: string | undefined): string {
  if (name) {
    return `Hello ${name}!`; // name is string here
  }
  return "Hello, stranger!";
}

// Narrowing with 'in' operator (for objects)
interface Dog {
  bark(): void;
}
interface Cat {
  meow(): void;
}

function speak(animal: Dog | Cat): void {
  if ("bark" in animal) {
    // checks if the animal union parameter has a bark property.
    animal.bark(); // TypeScript knows it's a Dog
  } else {
    animal.meow(); // Typescript knows it's a Cat
  }
}

/**
 * Type declaration
 */

const names: Array<string> = [];
names.push("Kassie");
names.push("Kevin");
names.push("Josh");

const count: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(names);
console.log(count);

/**
 * Optional Parameters
 */
// In java when you want a method to accept different numbers of arguments, you overload it.
// In typescript you instead use ? on the parameters that are optional

function greet_b(name: string, greeting?: string): string {
  // greeting? must go after required parameters and never before.
  const g = greeting ?? "Hello"; // Use "Hello" if greeting is undefined
  return `${g}, ${name}!`;
}

greet_b("Alice"); // "Hello, Alice!"
greet_b("Alice", "Bye"); // "Bye, Alice!"

/**
 * Default values
 */

function greet_c(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

greet_c("Alice"); //Hello, Alice!
greet_c("Alice", "Bye"); //Bye, Alice!

/**
 * Function Types as parameters
 */
// TypeScript has a higher order function where you can have functions take in functions as params
// In java, passing behavior to a method requires an interface and an anonymous class
// In TypeScript, you can specify a function type directly in the parameter list:

function processItems(
  items: string[],
  callback: (item: string) => string,
): string[] {
  return items.map(callback);
}

const uppercased = processItems(["hello", "world"], (item) =>
  item.toUpperCase(),
); // ["HELLO", "WORLD"]

// The type (item: string) => string means "a function that takes a string and returns a string."
// TypeScript enforces this - if you pass a function with the wrong signature, the compiler catches it.
// This pattern appears everywhere:
//    * Array methods: filter, map, find all accept function parameters
//    * Express middleware: (request: Request, response: Response, next: NextFunction) => void
//    * Event Handlers: (event: Event) => void

// For complex function types, you can use a type alias to keep signatures readable;
type Validator = (value: string) => boolean;

function validateAll(values: string[], validator: Validator): boolean {
  return values.every(validator);
}

const isNonEmpty: Validator = (value) => value.length > 0;
validateAll(["Hello", "World"], isNonEmpty); // true
