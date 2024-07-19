// DOM manipulation object 
export const domManipulation = (() => {
    function taskModal(){
        const taskModal = document.getElementById('sund-todo-modal');
        const taskModalOpen = document.getElementById('sund-add-task');
    
        taskModalOpen.addEventListener('click', () => {
            taskModal.classList.remove('hide');
            taskModal.classList.add('show');        
        });
        const taskModalClose = document.querySelectorAll(".sund-modal__close");
        
            taskModalClose.forEach(taskModalClose => {
            taskModalClose.addEventListener('click', () => {
                taskModal.classList.remove('show');
                taskModal.classList.add('hide');
            });
        });
    }

    return {
        taskModal
    }
})();



