import {taskManager} from './tasks';
import {Project, projectManager, defaultProject} from './projects';
class DomManipulation {
    constructor() {
        this.sidebar = document.getElementById("sund-sidebar");

        
        this.taskMode;
        this.taskModal = document.getElementById('sund-todo-modal');
        this.taskAdd = document.getElementById('sund-add-task');
        this.taskModalClose = document.querySelectorAll(".sund-modal-close");
        this.taskModalCard = document.querySelector('.sund-modal-card');
        this.taskModalForm = document.getElementById('sund-task-form');
        this.allTasks = document.getElementById('sund-tasks-all');
        this.confirmTask = document.getElementById('sund-modal-confirm');
        this.taskCountDisplay = document.getElementById('sund-tasks-count');

        this.projectMode;
        this.addProject = document.querySelectorAll(".sund-add-project");
        this.projectModalForm = document.getElementById('sund-project-form');
        this.projectCountDisplay = document.getElementById('sund-projects-count');
        this.allProjects = document.getElementById('sund-all-projects');
        this.confirmProject = document.getElementById('sund-project-form-confirm');
        this.init();
    }

    init() {
        this.sidebar.addEventListener('click', (event) => {
            if (event.target.closest('.sund__btn')) {
                // Remove 'active' class from all buttons
                document.querySelectorAll(".sund__btn").forEach(button => {
                    button.classList.remove('active');
                });
                // Add 'active' class to the clicked button
                event.target.closest('.sund__btn').classList.add('active');
            }
        });
       

        // TASKS
        this.taskAdd.addEventListener('click', () => {
            this.taskModalForm.style.display = 'block';
            this.projectModalForm.style.display = 'none';
            this.taskMode = 'create';
            document.getElementById('sund-modal__title').textContent = 'Add Task';
            this.confirmTask.textContent = 'Add';
            this.toggleModal(true);
        });

  
        this.taskModal.addEventListener('click', (event) => {
            if (!this.taskModalCard.contains(event.target)) {
                this.clearForm(this.taskModalForm, this.projectModalForm);
                this.toggleModal(false);
            }
        });

        this.taskModalClose.forEach(taskModalCloseEl => {
            taskModalCloseEl.addEventListener('click', () => {
                this.clearForm(this.taskModalForm, this.projectModalForm);
                this.toggleModal(false)
            });
        });

        this.confirmTask.addEventListener('click', () => {
            console.log(this.taskMode);
            if(document.getElementById('sund-task-title').value !== ''){
                if (this.taskMode === 'create') {
                    taskManager.createTask();
                } else {
                    taskManager.updateTask();
                }
                this.displayTasksInProject();
                this.clearForm(this.taskModalForm);
                this.toggleModal(false);
                this.taskModalForm.querySelector('.modal-title-error').style.display = 'none';
            } else{
                this.taskModalForm.querySelector('.modal-title-error').style.display = 'block';
            }
        });

        this.allTasks.addEventListener('click', (event) => {
            if (event.target.classList.contains('edit-task')) {
                this.taskModalForm.style.display = 'block';
                this.projectModalForm.style.display = 'none';
                this.taskMode = 'edit';
                document.getElementById('sund-modal__title').textContent = 'Edit Task';
                this.confirmTask.textContent = 'Confirm';
                this.toggleModal(true);
                taskManager.editTask(event);
            }
            if (event.target.classList.contains('delete-task')) {
                taskManager.deleteTask(event);
                this.displayTasksInProject();
            }
        });

        // PROJECTS

        document.getElementById('sund-project__title').textContent = defaultProject.name;
        document.getElementById('sund-project-display').setAttribute('data-project-index', 0);

        this.addProject.forEach(addProjectEl => {
            addProjectEl.addEventListener('click', () => {
                this.projectMode = 'create';
                document.getElementById('sund-modal__title').textContent = 'Add Project';
                this.confirmProject.textContent = 'Add';
                this.taskModalForm.style.display = 'none';
                this.projectModalForm.style.display = 'block';
                this.toggleModal(true);
            });
        });

        this.allProjects.addEventListener('click', (event) => {
            this.taskModalForm.style.display = 'none';
            this.projectModalForm.style.display = 'block';
            if (event.target.classList.contains('edit-project')) {
                this.projectMode = 'edit';
                this.taskModalForm.style.display = 'none';
                this.projectModalForm.style.display = 'block';
                projectManager.editProject(event);
                document.getElementById('sund-modal__title').textContent = 'Edit Project';
                this.confirmProject.textContent = 'Confirm';
                this.toggleModal(true);
            }
            if (event.target.classList.contains('delete-project')) {
                projectManager.deleteProject(event);
                this.displayProjects();
            }
            if (event.target.closest('.sund-project') && !event.target.classList.contains('edit-project') && !event.target.classList.contains('delete-project')) {
                projectManager.openProject(event);
                this.displayTasksInProject();
            }
        });

        this.confirmProject.addEventListener('click', () => {
            if(document.getElementById('sund-project-title').value !== ''){
                if (this.projectMode === 'create') {
                    projectManager.createProject();
                } else {
                    projectManager.updateProject();
                }
                this.projectModalForm.querySelector('.modal-title-error').style.display = 'none';
                this.displayProjects();
                this.clearForm(this.projectModalForm);
                this.toggleModal(false);
            } else{
                this.projectModalForm.querySelector('.modal-title-error').style.display = 'block';
            }
        });
        
    }

    toggleModal(show) {
        this.taskModal.classList.toggle('show', show);
        this.taskModal.classList.toggle('hide', !show);
    }

    clearForm(...modalForms) {
        modalForms.forEach(modalForm => {
            modalForm.reset();
            modalForm.querySelector('.modal-title-error').style.display = 'none';
        });
    }
    displayProjects(){
        this.allProjects.innerHTML = '';
        const allProjects = Project.allProjects;
        localStorage.setItem('allProjects', JSON.stringify(Project.allProjects));
        console.log(`In Projects ${localStorage.getItem("allProjects")}`);
        allProjects.forEach((project, index) => {
            const projectDisplay = document.createElement('button');
            const projectBody = document.createElement('div');
            const projectControls = document.createElement('div');
            const projectEdit = document.createElement('i');
            const projectDelete = document.createElement('i');

            projectDisplay.classList.add('sund-project', 'sund__btn');
            projectBody.classList.add('sund-project-title');
            projectControls.classList.add('sund-project-controls');
            projectEdit.classList.add('fal', 'fa-edit', 'edit-project');
            projectDelete.classList.add('fal', 'fa-trash-alt', 'delete-project');
            projectBody.textContent = project.name;

            this.allProjects.appendChild(projectDisplay);
            projectDisplay.setAttribute('data-project-index', index);
            // projectDisplay.setAttribute('id', project.id);
            projectDisplay.appendChild(projectBody);
            projectDisplay.appendChild(projectControls);
            projectControls.appendChild(projectEdit);
            projectControls.appendChild(projectDelete);
        });
        this.projectCountDisplay.textContent = allProjects.length;
    }

    displayTasksInProject() {
        this.allTasks.innerHTML = '';
        const currentProjectIndex = document.getElementById('sund-project-display').getAttribute('data-project-index');
        const taskArray = Project.allProjects[currentProjectIndex].tasks;
 
        localStorage.setItem('allProjects', JSON.stringify(Project.allProjects));

        taskArray.forEach((task, index) => {
            const taskDisplay = document.createElement('div');
            const taskBody = document.createElement('div');
            const taskTitle = document.createElement('div');
            const taskDescription = document.createElement('div');
            const taskDueDate = document.createElement('div');
            const taskPriority = document.createElement('div');
            const taskComplete = document.createElement('div');
            const taskControls = document.createElement('div');
            const taskEdit = document.createElement('i');
            const taskDelete = document.createElement('i');

            taskDisplay.classList.add('sund-task');
            taskDisplay.setAttribute('data-task-index', index);
            taskBody.classList.add('sund-task-body');
            taskTitle.classList.add('sund-task__title');
            taskDescription.classList.add('sund-task__desc');
            taskDueDate.classList.add('sund-task__duedate');
            taskPriority.classList.add('sund-task__priority');
            taskEdit.classList.add('fal', 'fa-edit', 'edit-task');
            taskDelete.classList.add('fal', 'fa-trash-alt', 'delete-task');
            taskComplete.classList.add('sund-task__complete');
            taskControls.classList.add('sund-task__controls');

            taskTitle.textContent = task.title;
            taskDescription.textContent = task.description;
            taskDueDate.textContent = task.dueDate;
            taskPriority.textContent = task.priority;
            taskComplete.innerHTML = '<i class="fal fa-circle"></i>';

            this.allTasks.appendChild(taskDisplay);
            taskDisplay.appendChild(taskComplete);
            taskDisplay.appendChild(taskBody);
            taskBody.appendChild(taskTitle);
            taskBody.appendChild(taskDescription);
            taskDisplay.appendChild(taskDueDate);
            taskDisplay.appendChild(taskPriority);
            taskControls.appendChild(taskEdit);
            taskControls.appendChild(taskDelete);
            taskDisplay.appendChild(taskControls);
        });
        this.taskCountDisplay.textContent = taskArray.length;
    }
}

const domManipulation = new DomManipulation();
export { domManipulation };
