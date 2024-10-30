// Accediendo a los elementos y guardarlos en variables
const taskForm = document.getElementById('task-form');
const confirmCloseDialog = document.getElementById('confirm-close-dialog');
const openTaskFormBtn = document.getElementById('open-task-form-btn');
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

// Matriz almacenará tareas con datos asociados
// Esto permitirá realizar seguimiento, mostrarlas en página y guardarlas en localStorage
const taskData = [];
// Esta variable se utilizará para realizar un seguimiento del estado al editar y descartar tareas.
let currentTask = {};

const addOrUpdateTask = () => {

  // Se corrobora con metodo findIndex() si la tarea a agregar existe o no
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);

  // cuando se crea una task se guarda en un objeto
  const taskObj = {
    id: `${titleInput.value.toLowerCase().split(' ').join('-')}-${Date.now()}`,
    title: titleInput.value, 
    date: dateInput.value,
    description: descriptionInput.value
  }

  // console.log(taskObj);

  // Si la compracion de -1 se agrega al array taskData el objeto taskObj
  if(dataArrIndex === -1){
    taskData.unshift(taskObj)
  } else {
    taskData[dataArrIndex] = taskObj;
  }


  updateTaskContainer();
  reset();

};

const updateTaskContainer = () => {

  // Borrar el contenido existente de taskContainer antes de agregar una nueva tarea
  tasksContainer.innerHTML = '';

  // mostrar la tarea en la pagina recorriendo un bucle forEach()
  taskData.forEach(({id, title, date, description})=>{
    tasksContainer.innerHTML += `
      <div class='task' id='${id}'>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Description:</strong> ${description}</p>
        <button type='button' onclick='editTask(this)' class='btn'>Edit</button>
        <button type='button' onclick='deleteTask(this)' class='btn'>Delete</button>
      </div>
    `;
  });
  
}

// eliminar Task
const deleteTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex((item) => item.id === buttonEl.parentElement.id)

  buttonEl.parentElement.remove();
  taskData.splice(dataArrIndex, 1);

};

// Editar task
const editTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex((item) => item.id === buttonEl.parentElement.id)

  currentTask = taskData[dataArrIndex];

  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;

  addOrUpdateTaskBtn.innerText = 'Update Task';

  taskForm.classList.toggle('hidden');

}

// Funcion de reset para borrar los campos
const reset = () => {
  titleInput.value = '';
  dateInput.value = '' ;
  descriptionInput.value = '';
  taskForm.classList.toggle("hidden");
  currentTask = {};
}

// Se crea un evento en openTaskFormBtn con el metodo para agregar o quitar class toggle
openTaskFormBtn.addEventListener('click', () => taskForm.classList.toggle("hidden"));

// Se crea evento para mostrar si se confirma el cierre del diaolo
closeTaskFormBtn.addEventListener("click", () => {
  confirmCloseDialog.showModal();

  const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value;

  const formInputValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date || descriptionInput.value !== currentTask.description;

  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal();
  } else {
    reset();
  }
});

// Se crea evento para cerrar el dialogo modal
cancelBtn.addEventListener('click', ()=> confirmCloseDialog.close());

// Se crea evento para descartar el task
discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  // taskForm.classList.toggle("hidden");
  reset();
});

// Evento para el envio del task
taskForm.addEventListener('submit', (e)=>{
  e.preventDefault()

  

  

  // taskForm.classList.toggle("hidden");
  // reset(); se cancela este reset por refactoring y se modifica por la sig funcion
  addOrUpdateTask()
});


// Configurar Local Storage
localStorage.setItem('data', myTaskArr);