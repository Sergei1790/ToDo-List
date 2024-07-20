import tasks from './tasks';

// DOM manipulation object 
export const domManipulation = (() => {
    const taskModal = document.getElementById('sund-todo-modal');
    const taskModalOpen = document.getElementById('sund-add-task');
    const taskModalClose = document.querySelectorAll(".sund-modal-close");
    const taskModalCard = document.querySelector('.sund-modal-card');
    const taskModalForm = document.getElementById('sund-task-form');
    const allTasks = document.getElementById('sund-tasks');
    const confirmTask = document.getElementById('sund-modal-confirm');
    const taskCountDisplay = document.getElementById('sund-tasks-count');

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
        const { task, taskCount } = tasks.createTask();
        showTask(task, taskCount);
        clearForm();
        toggleModal(false);
    });
   
    function showTask(task, taskCount){
        const taskDisplay = document.createElement('div');
        const taskBody = document.createElement('div');
        const taskTitle = document.createElement('div');
        const taskDescription = document.createElement('div');
        const taskDueDate = document.createElement('div');
        const taskPriority = document.createElement('div');
        const taskComplete = document.createElement('div');
        const taskControls = document.createElement('div');
        // const taskEdit = document.createElement('div');
        // const taskDelete = document.createElement('div');

        taskDisplay.classList.add('sund-task');
        taskBody.classList.add('sund-task-body');
        taskTitle.classList.add('sund-task__title');
        taskDescription.classList.add('sund-task__desc');
        taskDueDate.classList.add('sund-task__duedate');
        taskPriority.classList.add('sund-task__priority');
        // taskEdit.classList.add('sund-task__edit');
        // taskDelete.classList.add('sund-task__delete');
        taskComplete.classList.add('sund-task__complete');
        taskControls.classList.add('sund-task__controls');

        taskTitle.textContent = task.title;
        taskDescription.textContent = task.description;
        taskDueDate.textContent = task.dueDate;
        taskPriority.textContent = task.priority;
        taskComplete.innerHTML = '<i class="fal fa-circle"></i>'
        taskControls.innerHTML = '<i class="fal fa-edit edit-task"></i><i class="fal fa-trash-alt delete-task"></i>'
        
        // taskEdit.innerHTML = '<i class="fal fa-edit edit-task"></i>';
        // taskDelete.innerHTML = '<i class="fal fa-trash-alt delete-task"></i>';

        allTasks.appendChild(taskDisplay);
        taskDisplay.appendChild(taskComplete);
        taskDisplay.appendChild(taskBody);
        taskBody.appendChild(taskTitle);
        taskBody.appendChild(taskDescription);
        taskDisplay.appendChild(taskDueDate);
        taskDisplay.appendChild(taskPriority);
        // taskDisplay.appendChild(taskEdit);
        // taskDisplay.appendChild(taskDelete);
        taskDisplay.appendChild(taskControls);
        taskCountDisplay.textContent = taskCount;
    }

    function deleteTask(event) {
        if (event.target.classList.contains('delete-task')) {
            event.target.closest('.sund-task').remove();
        }
    }

    allTasks.addEventListener('click', deleteTask);
})();



