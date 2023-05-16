

function getToAddTasks() {
    window.location.href="./addtask.html";
}

function viewTasks() {
    window.location.href="./viewtasks.html";
}

//console.log("Hello World")

const form = document.querySelector('form');
const API_URL = 'http://localhost:3000/task';

if(form){
    form.addEventListener('submit', (event) => {
        event.preventDefault(); 
        const formData = new FormData(form);
        const task = formData.get('task');

        var obj = {
            task: task
        }

        console.log(obj)
        fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'content-type': 'application/json'
            }
        });
    });
}; 



