import tasks from './tasks';

// DOM manipulation object 
export const domManipulation = (() => {
    const taskWrapper = document.getElementById('sund-tasks');
    const taskModal = document.getElementById('sund-todo-modal');
    const taskModalOpen = document.getElementById('sund-add-task');
    const taskModalClose = document.querySelectorAll(".sund-modal-close");
    const taskModalCard = document.querySelector('.sund-modal-card');
    const taskModalForm = document.getElementById('sund-task-form');
    const allTasks = document.getElementById('sund-tasks-all');
    const confirmTask = document.getElementById('sund-modal-confirm');
    const taskCountDisplay = document.getElementById('sund-tasks-count');
    const editTaskBtn = document.querySelectorAll('.edit-task');

    function toggleModal(show) {
        taskModal.classList.toggle('show', show);
        taskModal.classList.toggle('hide', !show);
    }
    taskModalOpen.addEventListener('click', () => toggleModal(true));

    taskModal.addEventListener('click', (event) => {
        if (!taskModalCard.contains(event.target)) {
            toggleModal(false);
        }
    });
    
    taskModalClose.forEach(taskModalCloseEl => {
        taskModalCloseEl.addEventListener('click', () => toggleModal(false));
    });
    function clearForm() {
        taskModalForm.reset();
    }
    confirmTask.addEventListener('click', () => {
        tasks.createTask();
        displayTasksInProject();
        clearForm();
        toggleModal(false);
    });
   
    function displayTasksInProject(){
        allTasks.innerHTML = '';
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
            taskComplete.innerHTML = '<i class="fal fa-circle"></i>'
    
            allTasks.appendChild(taskDisplay);
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
        taskCountDisplay.textContent = taskArray.length;       
    }
    
    function editTask(event) {
        if (event.target.classList.contains('edit-task')) {
            event.target.closest('.sund-task')
            console.log('1sdsdd');
        }
    }

    allTasks.addEventListener('click', editTask);
    allTasks.addEventListener('click', tasks.deleteTask);
    return{
        displayTasksInProject
    }
})();



