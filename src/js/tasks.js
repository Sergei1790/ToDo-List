import {domManipulation} from './DOM';
import {Project, defaultProject} from './projects';
import { format, parseISO, parse, isValid } from 'date-fns';

class Task {
    constructor(title, description, dueDate, priority, project = defaultProject) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        // Checking whether project is an instance of the Project class before accessing project.id
        this.projectId = project instanceof Project ? project.id : project;
        // simpler ->
        // this.projectId = project.id;
        
    }
}

class TaskManager {
    constructor() {
        this.isCreatingToggler = true;
        this.currentTaskId = null;
        // this.taskArray = defaultProject;
        this.taskArray = [];
    }

    createTask() {
        const dueDateInput = document.getElementById('sund-task-dueDate').value;
        let formattedDueDate;

        if (dueDateInput) {
            try {
                formattedDueDate = format(parseISO(dueDateInput), 'dd.MM.yyyy');
            } catch (error) {
                console.error('Invalid date format:', error);
                formattedDueDate = 'No Due Date';
            }
        } else {
            formattedDueDate = 'No Due Date';
        }
        const task = new Task(
            document.getElementById('sund-task-title').value,
            document.getElementById('sund-task-desc').value,
            formattedDueDate,
            document.getElementById('sund-task-priority').value
        );
        this.taskArray.push(task);
        console.log(this.taskArray);
        return task;
    }

    deleteTask(event) {
        if (event.target.classList.contains('delete-task')) {
            const task = event.target.closest('.sund-task');
            const dataIndex = parseInt(task.getAttribute('data-task-index'), 10);
            this.taskArray.splice(dataIndex, 1);
            console.log(this.taskArray);
        }
        domManipulation.displayTasksInProject();
    }

    editTask(event) {
        if (event.target.classList.contains('edit-task')) {
            this.isCreatingToggler = false;
            const task = event.target.closest('.sund-task');
            this.currentTaskId = parseInt(task.getAttribute('data-task-index'), 10);

            document.getElementById('sund-modal__title').textContent = 'Edit Task';
            document.getElementById('sund-modal-confirm').textContent = 'Confirm';
            domManipulation.toggleModal(true);

            document.getElementById('sund-task-title').value = this.taskArray[this.currentTaskId].title;
            document.getElementById('sund-task-desc').value = this.taskArray[this.currentTaskId].description;

            const dueDateInput = document.getElementById('sund-task-dueDate');
            if (this.taskArray[this.currentTaskId].dueDate !== 'No Due Date') {
                const parsedDate = parse(this.taskArray[this.currentTaskId].dueDate, 'dd.MM.yyyy', new Date());
                if (isValid(parsedDate)) {
                    const formattedDate = format(parsedDate, 'yyyy-MM-dd');
                    document.getElementById('sund-task-dueDate').value = formattedDate;
                } else {
                    console.error('Invalid date:', this.taskArray[this.currentTaskId].dueDate);
                    dueDateInput.value = '';
                }
            } else {
                dueDateInput.value = '';
            }
            document.getElementById('sund-task-priority').value = this.taskArray[this.currentTaskId].priority;
        }
    }

    updateTask() {
        const task = this.taskArray[this.currentTaskId];
        task.title = document.getElementById('sund-task-title').value;
        task.description = document.getElementById('sund-task-desc').value;

        const dueDateInput = document.getElementById('sund-task-dueDate').value;
        let formattedDueDate;

        if (dueDateInput) {
            try {
                formattedDueDate = format(parseISO(dueDateInput), 'dd.MM.yyyy');
            } catch (error) {
                console.error('Invalid date format:', error);
                formattedDueDate = 'No Due Date';
            }
        } else {
            formattedDueDate = 'No Due Date';
        }

        task.dueDate = formattedDueDate;
        task.priority = document.getElementById('sund-task-priority').value;

        console.log('Task Updated:', task);
        console.log('Task Array:', this.taskArray);
        this.isCreatingToggler = true;
    }
}

const tasks = new TaskManager();
export {Task, tasks};

