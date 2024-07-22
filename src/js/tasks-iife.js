import {domManipulation} from './DOM-iife';
import { format, parseISO, parse, isValid } from 'date-fns';

const tasks = (() => {
    let isCreatingToggler = true;
    let currentTaskId = null; // Track the ID of the task being edited
    const taskArray = [];
    function Task(title, description, dueDate, priority, projectId) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projectId = projectId;
    }
    function createTask() {
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
        taskArray.push(task);
        console.log(taskArray);
        return task;
    }

    function deleteTask(event){
        if (event.target.classList.contains('delete-task')) {
            const task = event.target.closest('.sund-task');
            const dataIndex = parseInt(task.getAttribute('data-task-index'), 10);
            taskArray.splice(dataIndex, 1);
            console.log(taskArray);
        }
        domManipulation.displayTasksInProject();
    }
   
    function editTask(event){
        if (event.target.classList.contains('edit-task')) {
            isCreatingToggler = false;
            console.log(`Entering Edit Mode: isCreatingToggler = ${isCreatingToggler}`);
            // catching task
            const task = event.target.closest('.sund-task');
            currentTaskId = parseInt(task.getAttribute('data-task-index'), 10);

            document.getElementById('sund-modal__title').textContent = 'Edit Task';
            document.getElementById('sund-modal-confirm').textContent = 'Confirm';
            domManipulation.toggleModal(true);
            

            document.getElementById('sund-task-title').value = taskArray[currentTaskId].title;
            document.getElementById('sund-task-desc').value = taskArray[currentTaskId].description;

            const dueDateInput = document.getElementById('sund-task-dueDate');
            if (taskArray[currentTaskId].dueDate !== 'No Due Date') {
                // Parse the date stored as 'dd.MM.yyyy'
                const parsedDate = parse(taskArray[currentTaskId].dueDate, 'dd.MM.yyyy', new Date());
                if (isValid(parsedDate)) {
                    // Format the parsed date to 'yyyy-MM-dd' for the input field
                    const formattedDate = format(parsedDate, 'yyyy-MM-dd');
                    document.getElementById('sund-task-dueDate').value = formattedDate;
                } else {
                    console.error('Invalid date:', taskArray[currentTaskId].dueDate);
                    dueDateInput.value = '';
                }
            } else {
                dueDateInput.value = '';
            }
            document.getElementById('sund-task-priority').value = taskArray[currentTaskId].priority;
        }
    }
    function updateTask() {
        const task = taskArray[currentTaskId];
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
        console.log('Task Array:', taskArray);
        isCreatingToggler = true;
    }


    return{
        taskArray,
        isCreatingToggler,
        createTask,
        deleteTask,
        editTask,
        updateTask,
        getToggler
    }

})();
export default tasks;