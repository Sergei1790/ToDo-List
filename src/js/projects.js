import {Task, tasks} from './tasks';
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
    editProject(event) {
        console.log('Editing project:', this);
        // if (event.target.classList.contains('edit-project')) {
        //     // this.isCreatingToggler = false;
        //     const project = event.target.closest('.sund-project');
        //     this.currentprojectId = parseInt(project.getAttribute('data-task-index'), 10);

        //     document.getElementById('sund-modal__title').textContent = 'Edit Project';
        //     document.getElementById('sund-project-form-confirm').textContent = 'Confirm';
        //     domManipulation.toggleModal(true);

        //     document.getElementById('sund-project-title').value = this.taskArray[this.currentTaskId].title;
           
        // }
    }
}
class ProjectManager{

}
const defaultProject = new Project('Default Project');
export { Project, defaultProject };