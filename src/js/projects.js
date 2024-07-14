const project = document.createElement('div');
project.classList.add('sund-project');
project.innerHTML = 'task';

const projectPlaces = document.querySelectorAll('.sund-all-projects');
projectPlaces.forEach( place =>{
    const clonedProject = project.cloneNode(true);
    place.appendChild(clonedProject);
});