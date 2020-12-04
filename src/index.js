import item from './modules/item';
import Project from './modules/project';

// let item1 = new Item("gym", "now");

// //item1.name = "Work";
// item1.name = 'Gym';
// console.log(item1);
let item1 = new item("bob", "now");


const p1 = new Project('Work');

console.log(p1);

p1.addTask("task1", "tomorrow");
p1.addTask("task2", "tuesday");
p1.addTask("task3", "wednesday");

console.log(p1.getTask('task2'));


console.table(p1.tasks);