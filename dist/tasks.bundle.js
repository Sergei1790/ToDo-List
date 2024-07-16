/******/ (() => { // webpackBootstrap
/*!*************************!*\
  !*** ./src/js/tasks.js ***!
  \*************************/
function Task(title, description, dueDate, priority){
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
}
const task1 = new Task('Посидеть', 'Посидеть за столом', 'до завтра', 'срочно');
function addTask(){
    
}
const addTaskBtn = document.getElementById('sund-add-task');
addTaskBtn.addEventListener('click', addTask)

// Создать модалку для новой задачи 
// По клику на кнопку открывается окно где задается 4 поля
//  title, description, dueDate, priority
// после заполнения создается новый обьект Task с задаными параметрвми и отображается на экране.
// Там будет кнопка, которая удаляет таски
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza3MuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvanMvdGFza3MuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KXtcclxuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XHJcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XHJcbn1cclxuY29uc3QgdGFzazEgPSBuZXcgVGFzaygn0J/QvtGB0LjQtNC10YLRjCcsICfQn9C+0YHQuNC00LXRgtGMINC30LAg0YHRgtC+0LvQvtC8JywgJ9C00L4g0LfQsNCy0YLRgNCwJywgJ9GB0YDQvtGH0L3QvicpO1xyXG5mdW5jdGlvbiBhZGRUYXNrKCl7XHJcbiAgICBcclxufVxyXG5jb25zdCBhZGRUYXNrQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1bmQtYWRkLXRhc2snKTtcclxuYWRkVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFkZFRhc2spXHJcblxyXG4vLyDQodC+0LfQtNCw0YLRjCDQvNC+0LTQsNC70LrRgyDQtNC70Y8g0L3QvtCy0L7QuSDQt9Cw0LTQsNGH0LggXHJcbi8vINCf0L4g0LrQu9C40LrRgyDQvdCwINC60L3QvtC/0LrRgyDQvtGC0LrRgNGL0LLQsNC10YLRgdGPINC+0LrQvdC+INCz0LTQtSDQt9Cw0LTQsNC10YLRgdGPIDQg0L/QvtC70Y9cclxuLy8gIHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHlcclxuLy8g0L/QvtGB0LvQtSDQt9Cw0L/QvtC70L3QtdC90LjRjyDRgdC+0LfQtNCw0LXRgtGB0Y8g0L3QvtCy0YvQuSDQvtCx0YzQtdC60YIgVGFzayDRgSDQt9Cw0LTQsNC90YvQvNC4INC/0LDRgNCw0LzQtdGC0YDQstC80Lgg0Lgg0L7RgtC+0LHRgNCw0LbQsNC10YLRgdGPINC90LAg0Y3QutGA0LDQvdC1LlxyXG4vLyDQotCw0Lwg0LHRg9C00LXRgiDQutC90L7Qv9C60LAsINC60L7RgtC+0YDQsNGPINGD0LTQsNC70Y/QtdGCINGC0LDRgdC60LgiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=