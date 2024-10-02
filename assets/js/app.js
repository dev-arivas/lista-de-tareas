document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const taskInput = document.getElementById('task-input');
    const task = taskInput.value.trim();
    const isEditing = taskInput.getAttribute('data-editing');

    if (task !== '') {
        if (isEditing) {
            updateTaskInLocalStorage(isEditing, task);
            document.querySelector(`[data-task="${isEditing}"]`).textContent = task;
            taskInput.removeAttribute('data-editing');
            document.querySelector('button[type="submit"]').textContent = 'Agregar';
        } else {
            addTask(task);
            saveTaskInLocalStorage(task);
        }

        taskInput.value = '';
    }
});

// Agregar función para editar tarea
function addTask(task) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.textContent = task;
    li.setAttribute('data-task', task);

    // Botones de eliminar y editar
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm';
    deleteBtn.textContent = 'Eliminar';
    li.appendChild(deleteBtn);

    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-info btn-sm ms-2';
    editBtn.textContent = 'Editar';
    li.appendChild(editBtn);

    document.getElementById('task-list').appendChild(li);

    // Eventos de eliminar y editar
    deleteBtn.addEventListener('click', function() {
        li.remove();
        removeTaskFromLocalStorage(task);
    });

    editBtn.addEventListener('click', function() {
        taskInput.value = task;
        taskInput.setAttribute('data-editing', task);
        document.querySelector('button[type="submit"]').textContent = 'Actualizar';
    });
}

function updateTaskInLocalStorage(oldTask, newTask) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.map(task => task === oldTask ? newTask : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}