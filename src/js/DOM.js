import tasks from './tasks';

class DomManipulation {
    constructor() {
        this.taskModal = document.getElementById('sund-todo-modal');
        this.taskModalOpen = document.getElementById('sund-add-task');
        this.taskModalClose = document.querySelectorAll(".sund-modal-close");
        this.taskModalCard = document.querySelector('.sund-modal-card');
        this.taskModalForm = document.getElementById('sund-task-form');
        this.allTasks = document.getElementById('sund-tasks-all');
        this.confirmTask = document.getElementById('sund-modal-confirm');
        this.taskCountDisplay = document.getElementById('sund-tasks-count');

        this.init();
    }

    init() {
        this.taskModalOpen.addEventListener('click', () => {
            document.getElementById('sund-modal__title').textContent = 'Add Task';
            this.confirmTask.textContent = 'Add';
            this.toggleModal(true);
        });

        this.taskModal.addEventListener('click', (event) => {
            if (!this.taskModalCard.contains(event.target)) {
                this.toggleModal(false);
            }
        });

        this.taskModalClose.forEach(taskModalCloseEl => {
            taskModalCloseEl.addEventListener('click', () => this.toggleModal(false));
        });

        this.confirmTask.addEventListener('click', () => {
            console.log(tasks.isCreatingToggler);
            if (tasks.isCreatingToggler) {
                tasks.createTask();
            } else {
                tasks.updateTask();
            }

            this.displayTasksInProject();
            this.clearForm();
            this.toggleModal(false);

            // Reset after operation
            tasks.currentTaskId = null;
        });

        this.allTasks.addEventListener('click', (event) => {
            if (event.target.classList.contains('edit-task')) {
                tasks.editTask(event);
            }
            if (event.target.classList.contains('delete-task')) {
                tasks.deleteTask(event);
            }
        });
    }

    toggleModal(show) {
        this.taskModal.classList.toggle('show', show);
        this.taskModal.classList.toggle('hide', !show);
    }

    clearForm() {
        this.taskModalForm.reset();
    }

    displayTasksInProject() {
        this.allTasks.innerHTML = '';
        const taskArray = tasks.taskArray;

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
            taskEdit.setAttribute('data-task-index', index);
            taskDelete.classList.add('fal', 'fa-trash-alt', 'delete-task');
            taskDelete.setAttribute('data-task-index', index);
            taskComplete.classList.add('sund-task__complete');
            taskComplete.setAttribute('data-task-index', index);
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
