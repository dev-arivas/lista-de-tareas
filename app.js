document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario

    // Obtener el valor de la tarea
    const taskInput = document.getElementById('task-input');
    const task = taskInput.value.trim();

    if (task !== '') {
        // Crear un elemento de lista para la nueva tarea
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.textContent = task;

        // Agregar botón para eliminar la tarea
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm';
        deleteBtn.textContent = 'Eliminar';
        li.appendChild(deleteBtn);

        // Agregar la tarea a la lista
        document.getElementById('task-list').appendChild(li);

        // Guardar tarea en el almacenamiento local
        saveTaskInLocalStorage(task);

        // Limpiar el campo de entrada
        taskInput.value = '';

        // Evento para eliminar la tarea
        deleteBtn.addEventListener('click', function() {
            li.remove();
            removeTaskFromLocalStorage(task);
        });
    }
});

// Función para guardar la tarea en el almacenamiento local
function saveTaskInLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para obtener las tareas del almacenamiento local
function getTasksFromLocalStorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

// Función para eliminar la tarea del almacenamiento local
function removeTaskFromLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Cargar tareas desde el almacenamiento local al iniciar
document.addEventListener('DOMContentLoaded', function() {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(function(task) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.textContent = task;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm';
        deleteBtn.textContent = 'Eliminar';
        li.appendChild(deleteBtn);

        document.getElementById('task-list').appendChild(li);

        deleteBtn.addEventListener('click', function() {
            li.remove();
            removeTaskFromLocalStorage(task);
        });
    });
});