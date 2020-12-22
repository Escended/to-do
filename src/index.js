import Project from "./modules/project";
import DOMController from "./modules/DOMController";
import "./assets/styles/style.css";
import parse from "date-fns/parse";
import { fromPairs } from "lodash";

// Render initial page view
const display = new DOMController();
display.render();

// container for all the projects
let listOfProjects = [new Project("Default Project")];

const parseDate = (date) => {
    let dateParsed = parse(date, "yyyy-mm-dd", new Date());
    return dateParsed.toDateString();
};

// Dummy tasks
listOfProjects[0].addTask("Gym", parseDate("2020-12-20"));
listOfProjects[0].addTask("Run", parseDate("2020-12-20"));
display.addProject(listOfProjects[0]);
// console.table(listOfProjects[0].tasks);

let currentProject;

// projects = Array.prototype.slice(projects);
const projectViewContainer = document.getElementById("taskView");

const update = () => {
    let projects = document.querySelectorAll(".project");
    let numOfClicks = 0;
    projects.forEach((project) => {
        project.addEventListener("click", () => {
            const found = listOfProjects.find((proj) => proj.name === project.innerHTML);
            currentProject = found;
            // console.log(currentProject);
            if (typeof found !== "undefined" && numOfClicks === 0) {
                projectViewContainer.removeChild(projectViewContainer.lastChild);
                display.displayTasks(found.tasks);
                numOfClicks += 1;
            } else {
                projectViewContainer.innerHTML = "";
                display.displayTasks(found.tasks);
                numOfClicks += 1;
            }

            const deleteButtons = document.querySelectorAll("button.bn27");
            let num = 0;
            deleteButtons.forEach((button) => {
                button.setAttribute("data-id", num);
                button.addEventListener("click", () => {
                    let index = button.getAttribute("data-id");
                    currentProject.tasks.splice(index, 1);
                    console.table(currentProject.tasks);
                    let task = document.querySelector(`[data-id= "${index}"]`).parentNode;
                    console.log(task);
                    // projectViewContainer.removeChild(task.parentNode);
                    projectViewContainer.lastChild.removeChild(task);
                });
                num += 1;
            });

            let addTaskBtn = document.getElementById("modal-btn");
            let modal = document.querySelector(".modal");
            let closeBtn = document.querySelector(".close-btn");

            addTaskBtn.onclick = function () {
                modal.style.display = "block";
            };

            closeBtn.onclick = function () {
                modal.style.display = "none";
            };

            window.onclick = function (e) {
                if (e.target == modal) {
                    modal.style.display = "none";
                }
            };
        });
    });
};

const getInputValues = () => {
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const dropdown = document.getElementById("dropdown").value;
    const date = document.getElementById("time").value;
    let dateParsed = parse(date, "yyyy-mm-dd", new Date());
    let d = dateParsed.toDateString();
    // console.log(x)
    return { name, d, description, dropdown };
};

let addBtn = document.getElementById("addTaskBtn");

// store values from form
const addNewTask = () => {
    addBtn.addEventListener("click", () => {
        let form = getInputValues();
        let modal = document.querySelector(".modal");
        console.log(form);
        currentProject.addTask(form.name, form.d);
        let t = display.renderTask(form.name, form.d);
        console.log(t);
        projectViewContainer.lastChild.appendChild(t);
        modal.style.display = "none";
        // Connect delete button without re-rendering entire page
        let num = 0;
        const deleteButtons = document.querySelectorAll("button.bn27");
        deleteButtons.forEach((button) => {
            button.setAttribute("data-id", num);
            button.addEventListener("click", () => {
                let index = button.getAttribute("data-id");
                currentProject.tasks.splice(index, 1);
                console.table(currentProject.tasks);
                // let task = document.querySelector(`[data-id= "${index}"]`).parentNode;
                let task;
                if (document.querySelector(`[data-id= "${index}"]`).parentNode !== null) {
                    task = document.querySelector(`[data-id= "${index}"]`).parentNode;
                }
                projectViewContainer.lastChild.removeChild(task);
            });
            num += 1;
        });
        console.table(listOfProjects);
    });
};

const addNewProject = () => {
    // let projects = document.querySelectorAll('.project');
    const addProjectBtn = document.getElementById("add-project");
    const addProjectModal = document.getElementById("project-modal");
    // const closeBtn = document.querySelector(".close-btn");
    const closeBtn = document.querySelector(
        "#project-modal > div:nth-child(1) > span:nth-child(1)"
    );
    const addBtn = document.getElementById("addProjectBtn");

    addProjectBtn.onclick = function () {
        addProjectModal.style.display = "block";
    };
    closeBtn.onclick = function () {
        addProjectModal.style.display = "none";
        console.log("hi");
    };

    window.onclick = function (e) {
        if (e.target == addProjectModal) {
            addProjectModal.style.display = "none";
        }
    };
    addBtn.addEventListener("click", () => {
        let input = document.getElementById("nameProj").value;
        console.log(input);
        listOfProjects.push(new Project(input));
        addProjectModal.style.display = "none";
        display.addProject(listOfProjects.slice(-1)[0]);
        console.log(listOfProjects);
        // console.log(projects);
        // projects = document.querySelectorAll('.project');
        update();
        // projectViewContainer.removeChild(projectViewContainer.lastChild);
        console.log(projectViewContainer);
    });
};

addNewProject();
update();
addNewTask();
