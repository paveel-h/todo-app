

const taskElement = document.querySelector('.undone');

fetch('http://localhost:3000/gettask')
        .then(response => response.json())
        .then(data => {
            data.forEach(t => {
                console.log(t.Id);
                const label = document.createElement('label');
                const input = document.createElement("input");
                input.type = "checkbox";
                input.name = ""; 
                const box = document.createElement('i'); 
                const taskName = document.createElement('span'); 
                taskName.textContent = t.task; 

                taskElement.appendChild(label);
                label.appendChild(input);
                label.appendChild(box);
                label.appendChild(taskName); 

                
                const button = document.createElement('button'); 
                button.className = 'fa fa-trash';
                button.onclick = function() {deleteTask(t.Id)}; 
                taskName.appendChild(button);

                box.addEventListener('click', (event) => {
                    console.log("Box checked...");
                    addToCompleted(t.task);
                    setTimeout(() => {
                        deleteTask(t.Id);
                        //location.reload();
                    }, 500);
                    
                });

            });
});


const doneTaskElement = document.querySelector('.completed');

fetch('http://localhost:3000/getcompletedtask')
        .then(response => response.json())
        .then(data => {
            data.forEach(t => {
                console.log(t.Id);
                const donelabel = document.createElement('label'); 
                const donetaskName = document.createElement('span'); 
                donetaskName.textContent = t.task; 

                doneTaskElement.appendChild(donelabel);
                donelabel.appendChild(donetaskName); 


                const donebutton = document.createElement('button'); 
                donebutton.className = 'fa fa-trash';
                donebutton.onclick = function() {deleteCompletedTask(t.Id)}; 
                donetaskName.appendChild(donebutton);
       
            });
});


function deleteTask(id) {
    fetch(`http://localhost:3000/delete/${id}`, {
        method: 'DELETE'
    });
    window.location.href="./viewtasks.html";
    //location.reload();
}

function deleteCompletedTask(id) {
    fetch(`http://localhost:3000/deleteCompleted/${id}`, {
        method: 'DELETE'
    });
    window.location.href="./viewtasks.html";
    //location.reload();
}

const getToAddTask = () => {
    window.location.href="./addtask.html";
};

const addToCompleted = (task) => {
    var obj = {
        task: task
    }

    //console.log(obj)
    fetch('http://localhost:3000/complete', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'content-type': 'application/json'
        }
    });
   
};

