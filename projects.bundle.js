/******/ (() => { // webpackBootstrap
/*!****************************!*\
  !*** ./src/js/projects.js ***!
  \****************************/
const project = document.createElement('div');
project.classList.add('sund-project');
project.innerHTML = 'task';

const projectPlaces = document.querySelectorAll('.sund-all-projects');
projectPlaces.forEach( place =>{
    const clonedProject = project.cloneNode(true);
    place.appendChild(clonedProject);
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2pzL3Byb2plY3RzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxucHJvamVjdC5jbGFzc0xpc3QuYWRkKCdzdW5kLXByb2plY3QnKTtcclxucHJvamVjdC5pbm5lckhUTUwgPSAndGFzayc7XHJcblxyXG5jb25zdCBwcm9qZWN0UGxhY2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN1bmQtYWxsLXByb2plY3RzJyk7XHJcbnByb2plY3RQbGFjZXMuZm9yRWFjaCggcGxhY2UgPT57XHJcbiAgICBjb25zdCBjbG9uZWRQcm9qZWN0ID0gcHJvamVjdC5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICBwbGFjZS5hcHBlbmRDaGlsZChjbG9uZWRQcm9qZWN0KTtcclxufSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9