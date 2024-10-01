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

        // Limpiar el campo de entrada
        taskInput.value = '';

        // Evento para eliminar la tarea
        deleteBtn.addEventListener('click', function() {
            li.remove();
        });
    }
});