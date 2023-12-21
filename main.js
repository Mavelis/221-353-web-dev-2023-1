'use strict'
const API_BASE_URL = 'http://tasks-api.std-900.ist.mospolytech.ru/';
        const API_KEY = '50d2199a-42dc-447d-81ed-d68a443b697e';

        function displayTask(taskInfo) {
            let liTemplate = document.getElementById('task-template').content.firstElementChild;
            let li = liTemplate.cloneNode(true);
            li.querySelector(".task-name").textContent = taskInfo.name;
            li.id = taskInfo.id;
            let list = document.getElementById(`${taskInfo.status}-list`);
            list.append(li);
        }

        function displayAllTask() {
            fetch(`${API_BASE_URL}?api_key=${API_KEY}`)
                .then(response => response.json())
                .then(tasks => {
                    tasks.forEach(task => displayTask(task));
                })
                .catch(error => {
                    displayErrorNotification(error.message);
                });
        }

        function createTask(event) {
            event.preventDefault();
        
            let form = document.getElementById("newTaskForm");
            let taskName = form.elements['taskName'].value;
            let taskDescription = form.elements['taskDescription'].value;
            let taskStatus = form.elements['taskStatus'].value;
        
            fetch(`${API_BASE_URL}?api_key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    name: taskName,
                    desc: taskDescription,
                    status: taskStatus
                })
            })
            .then(response => response.json())
            .then(task => {
                displayTask(task);
                form.reset();
            })
            .catch(error => {
                displayErrorNotification(error.error);
            });
        }

        function saveTask(event) {
            event.preventDefault();

            let form = document.getElementById("editTaskForm");
            let taskName = form.elements['taskName'].value;
            let taskDescription = form.elements['taskDescription'].value;
            let taskStatus = form.elements['taskStatus'].value;
            let taskNum = form.dataset.id;

            fetch(`${API_BASE_URL}/${taskNum}?api_key=${API_KEY}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    name: taskName,
                    desc: taskDescription,
                    status: taskStatus
                })
            })
                .then(response => response.json())
                .then(updatedTask => {
                    let listItem = document.getElementById(updatedTask.id);
                    listItem.querySelector(".task-name").innerHTML = updatedTask.name;
                })
                .catch(error => {
                    displayErrorNotification(error.message);
                });
        }

        function displayErrorNotification(errorMessage) {
            let notificationContainer = document.getElementById('errorNotification');
    
            let notification = document.createElement('div');
            notification.classList.add('toast', 'bg-danger', 'text-white');
            notification.setAttribute('role', 'alert');
            notification.setAttribute('aria-live', 'assertive');
            notification.setAttribute('aria-atomic', 'true');
    
            // Добавьте содержимое уведомления
            notification.innerHTML = `
                <div class="toast-header">
                    <strong class="me-auto">Ошибка</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${errorMessage}
                </div>
            `;
    
            notificationContainer.appendChild(notification);
    
            let toast = new bootstrap.Toast(notification);
            toast.show();
        }
    

        if (!localStorage.getItem('taskNum')) {
            localStorage.setItem('taskNum', 0);
        }

        let createButton = document.getElementById("createTaskButton");
        createButton.onclick = createTask;
        window.onload = displayAllTask;

        let editsaveButton = document.getElementById("saveTaskButton");
        editsaveButton.onclick = saveTask;

        let modal = document.getElementById("editModal");
        modal.addEventListener('show.bs.modal', beforeOpenEditModal);

        let showModal = document.getElementById("showTaskModal");
        showModal.addEventListener('show.bs.modal', beforeOpenShowModal);