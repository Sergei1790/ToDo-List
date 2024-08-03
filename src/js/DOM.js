import {taskManager} from './tasks';
import {Project, projectManager} from './projects';
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
        this.tasksShowAll = document.getElementById('sund-tasks-show-all');
        this.tasksShowToday = document.getElementById('sund-tasks-show-today');
        this.tasksShowWeek = document.getElementById('sund-tasks-show-week');
        this.tasksShowImportant = document.getElementById('sund-tasks-show-important');
        this.tasksShowComplete = document.getElementById('sund-tasks-show-complete');


        this.projectMode;
        this.addProject = document.querySelectorAll(".sund-add-project");
        this.projectModalForm = document.getElementById('sund-project-form');
        this.projectCountDisplay = document.getElementById('sund-projects-count');
        this.allProjects = document.getElementById('sund-all-projects');
        this.confirmProject = document.getElementById('sund-project-form-confirm');

        // Function fires immediately when an instance of DomManipulation is created
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
            // If we did not add title of task in modal throw error
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
            if (event.target.closest('.sund-task') && !event.target.classList.contains('edit-task') && !event.target.classList.contains('delete-task')) {
                taskManager.completeTask(event);
                this.displayTasksInProject();
            }
        });
        this.tasksShowAll.addEventListener('click', () => {
            document.getElementById('sund-project__title').textContent = 'All Tasks';
            document.getElementById('sund-add-task').style.display = 'none';
            this.displayTasks(taskManager.allTasks());
            // or
            // taskManager.allTasks();
            // this.displayTasksInProject();
        })
        this.tasksShowToday.addEventListener('click', () => {
            document.getElementById('sund-project__title').textContent = 'Today Tasks';
            document.getElementById('sund-add-task').style.display = 'none';
            this.displayTasks(taskManager.todayTasks());
        })
        this.tasksShowWeek.addEventListener('click', () => {
            document.getElementById('sund-project__title').textContent = 'Week Tasks';
            document.getElementById('sund-add-task').style.display = 'none';
            this.displayTasks(taskManager.weekTasks());
        })
        this.tasksShowImportant.addEventListener('click', () => {
            document.getElementById('sund-project__title').textContent = 'Important Tasks';
            document.getElementById('sund-add-task').style.display = 'none';
            this.displayTasks(taskManager.importantTasks());
        })
        this.tasksShowComplete.addEventListener('click', () => {
            document.getElementById('sund-project__title').textContent = 'Completed Tasks';
            document.getElementById('sund-add-task').style.display = 'none';
            this.displayTasks(taskManager.completedTasks());    
        })


        // PROJECTS

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
    }

    // ... is rest parameter, which means we get array of modalForms
    //  it can be 1 or 2 or many, used if we can be able to use like
    // this.clearForm(this.taskModalForm, this.projectModalForm);
    // or this.clearForm(this.projectModalForm);
    clearForm(...modalForms) {
        modalForms.forEach(modalForm => {
            // reset clears <form> element, only can be used on <form>, not <div> or other
            modalForm.reset();
            modalForm.querySelector('.modal-title-error').style.display = 'none';
        });
    }
    displayProjects(){
        this.allProjects.innerHTML = '';
        const allProjects = Project.allProjects;

        // Using localStorage to save Project.allProjects
        // Storage only supports storing and retrieving strings.
        //  If we want to save other data types, we have to convert them to strings.
        //  For plain objects and arrays, we can use JSON.stringify().
        localStorage.setItem('allProjects', JSON.stringify(Project.allProjects));
        console.log(`In Projects ${localStorage.getItem("allProjects")}`);
        // Index is inbuilt, so we can get number of el in array
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
            projectDisplay.appendChild(projectBody);
            projectDisplay.appendChild(projectControls);
            projectControls.appendChild(projectEdit);
            projectControls.appendChild(projectDelete);
        });
        this.projectCountDisplay.textContent = allProjects.length;
    }

    displayTasksInProject() {
        // if #sund-project-display data-project-index is number (!isNaN) like data-project-index='0';
        // we display tasks in our projects
        // else like - data-project-index="allTasks"; we display tasks in "All", "Today", "Week", "Important", "Completed"
        if(!isNaN(document.getElementById('sund-project-display').getAttribute('data-project-index'))){
            const currentProjectIndex = document.getElementById('sund-project-display').getAttribute('data-project-index');
            const taskArray = Project.allProjects[currentProjectIndex].tasks;
            document.getElementById('sund-add-task').style.display = 'block';
            this.displayTasks(taskArray);
        } else{
            const tasks = document.getElementById('sund-project-display').getAttribute('data-project-index');
            // taskManager[tasks]() === taskManager.AllTasks() for example
            // or taskManager[tasks]() === taskManager.todayTasks()
            this.displayTasks(taskManager[tasks]());
        }
        // To remember added task in project
        localStorage.setItem('allProjects', JSON.stringify(Project.allProjects));
    }

    displayTasks(tasks){
        
        this.allTasks.innerHTML = '';
        // Using localStorage to save Project.allProjects
        // Storage only supports storing and retrieving strings.
        //  If we want to save other data types, we have to convert them to strings.
        //  For plain objects and arrays, we can use JSON.stringify().
        localStorage.setItem('allProjects', JSON.stringify(Project.allProjects));
        tasks.forEach((task) => {
            const taskDisplay = document.createElement('div');
            const taskBody = document.createElement('div');
            const taskTitle = document.createElement('div');
            const taskDescription = document.createElement('div');
            const taskDueDate = document.createElement('div');
            const taskPriority = document.createElement('div');
            const taskComplete = document.createElement('i');
            const taskControls = document.createElement('div');
            const taskEdit = document.createElement('i');
            const taskDelete = document.createElement('i');

            taskDisplay.classList.add('sund-task');
            if(task.completed){
                taskDisplay.classList.add('task_completed');
            } 
            taskDisplay.setAttribute('data-id', task.id);
            taskDisplay.setAttribute('data-project-index', task.projectIndex);
            taskBody.classList.add('sund-task-body');
            taskTitle.classList.add('sund-task__title');
            taskDescription.classList.add('sund-task__desc');
            taskDueDate.classList.add('sund-task__duedate');
            taskPriority.classList.add('sund-task__priority');
            taskEdit.classList.add('fal', 'fa-edit', 'edit-task');
            taskDelete.classList.add('fal', 'fa-trash-alt', 'delete-task');
            taskComplete.classList.add('fal', 'fa-circle', 'sund-task__complete'); 
            taskControls.classList.add('sund-task__controls');

            taskTitle.textContent = task.title;
            taskDescription.textContent = task.description;
            taskDueDate.textContent = task.dueDate;
            taskPriority.textContent = task.priority;

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
        this.taskCountDisplay.textContent = tasks.length;
    }
}

const domManipulation = new DomManipulation();
export { domManipulation };
