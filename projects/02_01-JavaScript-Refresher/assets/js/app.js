// import { api_key as my_apikey } from "./component.js";
// import url from "./component.js";
// console.log(my_apikey);
// url();

// Object demo
let getUserName = (userId) => {
  let map = { A123456789: "Andy" };
  return map[userId];
};

console.log(getUserName("A123456789"));

// how to build a class and initialize it
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    console.log(`Hi my name is ${this.name}, my age is ${this.age}`);
  }
}
let user = new User("Andy", 33);
console.log(user);
user.greet();

//Array demo
const hobbies = ["Sport", "Reading", "Hiking"];
const first = hobbies[0];
console.log(`First element is ${first}`);
//decontruct array
let nameList = ["Andy", "Tom", "Jessica"];
const [name1, name2] = nameList;
console.log(`name1: ${name1}, name2: ${name2}`);
//deconstruct object
let user2 = { userName: "Andy", age: 12 };
const { userName: name, age } = user2;
console.log(`name: ${name}, age: ${age}`);
//deconstruct with function input
function printName({ userName }) {
  console.log("Print name: " + userName);
}
printName(user2);

//spread oerator with array
const array1 = ["element1", "element2", "element3"];
const array2 = ["element4", "element5", "element6"];
const mergedArray = [...array1, ...array2];
console.log(mergedArray);
//spread operator with object
const object1 = { prop1: "val1", prop2: "val2" };
const object2 = { prop3: "val3", prop4: "val4" };
const mergerObj = { ...object1, ...object2 };
console.log(mergerObj);
// callback function
function handleTimeout() {
  console.log("Handle Timeout By function");
}
setTimeout(handleTimeout, 2000);
// callback function (anonymous function or arrow function)
setTimeout(() => console.log("Handel Timeout By arrow funciton"), 2000);
// custom function to take function as input
function personDoAction(name, action) {
  console.log("Person: " + name);
  console.log("Person do action:");
  action();
}
personDoAction("Andy", () => console.log("Play basketball"));
