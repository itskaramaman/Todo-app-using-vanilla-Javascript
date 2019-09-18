var todos = [];

// EVENTS

// event for add task
var addTaskBtn = document.querySelector('#addTaskBtn');
addTaskBtn.addEventListener('click', addTaskBtnClick);
// event for add button
var addBtn = document.querySelector('#addBtn');
addBtn.addEventListener('click', addBtnClick);

//---------------------------------------------------------------------------------------------------------------//

// FUNCTIONS

// function for add task
function addTaskBtnClick() {
    document.querySelector('#popupRadioBtn').checked = false;
}

// function for add button
function addBtnClick() {
    let title = document.querySelector('#todo-title');
    let description = document.querySelector('#description');
    let is_completed = document.querySelector('#popupRadioBtn');
    if(title.value && description.value) {
        todo = {
            'title' : title.value,
            'description': description.value,
            'is_completed': is_completed.checked
        }
        todos.push(todo);
        console.log(todos);
        title.value = "";
        description.value = "";
        is_completed.checked = false;
        tableData()
    }
}


// function for populating table
function tableData() {
    // table data
    let tbody = document.querySelector('tbody');
    tbody.innerHTML = "";
    for(i=0; i<todos.length; i++){
        let row = tbody.insertRow(0);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);

        // delete button
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn', 'btn-danger');
        deleteBtn.setAttribute('type', 'button');
        deleteBtn.setAttribute('onclick', 'deleteBtnClick(event)');
        deleteBtn.innerHTML = "Delete";

        //edit button
        let editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-info','mr-2');
        editBtn.setAttribute('type', 'button');
        editBtn.setAttribute('onclick', 'editBtnClick(event)');
        editBtn.innerHTML = "Edit";

        // radio button
        let radioBtn = document.createElement('input');
        radioBtn.setAttribute('type', 'radio');
        radioBtn.setAttribute('onclick', 'radioBtnClick(event)');

        cell1.innerText = todos.length-i;
        cell2.innerText = todos[i].title;
        cell3.innerText = todos[i].description;
        radioBtn.checked = todos[i].is_completed;
        cell4.appendChild(radioBtn);
        cell5.appendChild(editBtn);
        cell5.appendChild(deleteBtn);
    }
}

// delete function
function deleteBtnClick(e) {
    let todo_item = e.target.parentNode.parentNode.children[0].textContent;
    todos.splice(todos.length-todo_item, 1);
    tableData();
}


// edit function
function editBtnClick(e) {
    let tr = e.target.parentNode.parentNode;
    let editTitle =  tr.children[1];
    let editDescription = tr.children[2];
    editTitle.contentEditable = true;
    editTitle.focus();
    editDescription.contentEditable = true;
    editDescription.focus = true;
    
    // creating update button
    updateBtn = document.createElement('button');
    updateBtn.setAttribute('type', 'button')
    updateBtn.classList.add('btn', 'btn-success', 'mr-2');
    updateBtn.innerHTML = "Update"
    updateBtn.setAttribute('onclick', 'updateBtnClick(event)')
    // changing edit to update
    let actions = tr.children[4];
    actions.removeChild(actions.children[0]);
    actions.insertBefore(updateBtn, actions.children[0]);
}

// function for update button
function updateBtnClick(e) {
    let tr = e.target.parentNode.parentNode.children;
    let newTitle = tr[1].innerText;
    let newDescription = tr[2].innerText;
    console.log(newTitle);
    console.log(newDescription);
    let array_index = todos.length-tr[0].innerText;
    console.log(array_index);
    todos[array_index].title = newTitle;
    todos[array_index].description = newDescription;
    console.log(todos);
    tableData();
}

// function for radio button
function radioBtnClick(e) {
    let array_index = todos.length - e.target.parentNode.parentNode.children[0].innerText;
    if(todos[array_index].is_completed == false) {
        todos[array_index].is_completed = true;
    } else {
        todos[array_index].is_completed = false;
    }
    tableData();
}