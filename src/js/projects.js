import {Task, tasks} from './tasks';
import {domManipulation} from './DOM';
class Project{

    static allProjects = [];
    constructor(name){
        this.name = name;
        this.id = this.name.trim().toLowerCase().replace(/\s+/g, '-');
        this.tasks = [];
        Project.allProjects.push(this);
    }
    // addTask(title, description, dueDate, priority){
    //     const task = new Task(title, description, dueDate, priority, this.id);
    //     this.tasks.push(task);
    // }
    displayProject(){
        console.log(this);
    }
    static createProject(){

    }
 
}
class ProjectManager{
    constructor() {
        this.currentProjectIndex = null;
    }
    static createProject() {
        const project = new Project(document.getElementById('sund-project-title').value);
        return project;
    }
    static deleteProject(event) {
        const currentProjectIndex = parseInt(event.target.closest('.sund-project').getAttribute('data-project-index'), 10);
        Project.allProjects.splice(currentProjectIndex, 1);
    }
    static editProject(event) {
        this.currentProjectIndex = parseInt(event.target.closest('.sund-project').getAttribute('data-project-index'), 10);
        const currentProject = Project.allProjects[this.currentProjectIndex];
        document.getElementById('sund-project-title').value = currentProject.name;
        console.log('Editing project:', currentProject);
    }
    static updateProject() {
        const currentProject = Project.allProjects[this.currentProjectIndex];
        currentProject.name = document.getElementById('sund-project-title').value;
        this.currentProjectIndex = null;
    }
}

const defaultProject = new Project('Default Project');
export { Project, ProjectManager, defaultProject };