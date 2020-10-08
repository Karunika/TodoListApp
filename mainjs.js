var todoTitleInput = document.querySelector('#todo-title-input');
var todoAddBtn = document.querySelector('#todo-add-btn');
var todoList = document.querySelector('#todo-list')
var todos = JSON.parse(localStorage.getItem('todos'));

// Constructor Class
function todoItemTemplate(title, done = false){
    this.title = title;
    this.done = done;
};

// messages DOM Selection for the manipulation later in the javascript document
var startEditingMsg = document.getElementById('start-editing');
var savedMsg = document.getElementById('saved');
var deletedMsg = document.getElementById('deleted');
var startEditingMsgST, savedMsgST, deletedMsgST;
function startEditingMsgSTF(){
    startEditingMsgST = setTimeout(function(){
        startEditingMsg.style.opacity = '0';
    }, 8000);
}
function savedMsgSTF(){
    savedMsgST = setTimeout(function(){
        savedMsg.style.opacity = '0';
    }, 5000);
}
function deletedMsgSTF(){
    deletedMsgST = setTimeout(function(){
        deletedMsg.style.opacity = '0';
    }, 5000);
}
function startEditingMsgCTF(){
    clearTimeout(startEditingMsgST);
}
function savedMsgCTF(){
    clearTimeout(savedMsgST);
}
function deletedMsgCTF(){
    clearTimeout(deletedMsgST);
}



if(todos !== null){
    todos.forEach(todo => {
        addListItem(todo['title']);
        if(todo['done']){
            todoList.children[todos.indexOf(todo)].classList.add('done-assistance');
            todoList.children[todos.indexOf(todo)].firstElementChild.classList.add('done');
        }
    });
}else if(todos === null){
    todos = new Array();
    localStorage.setItem('todos', JSON.stringify(todos));
};

// Add event listeners 
todoAddBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(todoTitleInput.value !== ""){
        var todos = JSON.parse(localStorage.getItem('todos'));
        todos.push(new todoItemTemplate(todoTitleInput.value));
        localStorage.setItem('todos', JSON.stringify(todos));
        addListItem(todoTitleInput.value);
    }
    todoTitleInput.value = "";
})

// console.log(todos);

function addListItem(todoTitleValue){
        // creating the list item
        var todoListItem = document.createElement('li');
        todoListItem.classList.add('todo-list-item');


        // creating the todo list title
        var todoListTitle = document.createElement('h1');
        todoListTitle.classList.add('todo-list-title');
        todoListItem.appendChild(todoListTitle);
        todoListTitle.innerText = todoTitleValue;
        

        // creating div for buttons
        var listBtns = document.createElement('div');
        listBtns.classList.add('list-btns');

        var editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        listBtns.appendChild(editBtn);
        editBtn.innerHTML = '<i class="fa fa-edit"></i>';

        var updateBtn = document.createElement('button');
        updateBtn.classList.add('update-btn');
        listBtns.appendChild(updateBtn);
        updateBtn.innerHTML = '<i class="fa fa-save"></i>';

        var doneBtn = document.createElement('button');
        doneBtn.classList.add('done-btn');
        listBtns.appendChild(doneBtn);
        doneBtn.innerHTML = '<i class="fa fa-check"></i>';

        var dltBtn = document.createElement('button');
        dltBtn.classList.add('dlt-btn');
        listBtns.appendChild(dltBtn);
        dltBtn.innerHTML = '<i class="fa fa-trash"></i>';

        todoListItem.appendChild(listBtns);

        // appending the entire list item inside the todo list
        todoList.appendChild(todoListItem);

        // console.log(todoListItem);

};
todoList.addEventListener('click', (e)=> {
    if(e.target.classList[0] == "edit-btn"){
        // if done is true, cant edit
        var reqIndex;
        for (var i = 0; i < todoList.children.length; i++){
        if(e.target.parentElement.parentElement === todoList.children[i]){
            reqIndex = i;
            break;
            }
        }
        var todos = JSON.parse(localStorage.getItem('todos'));
        if(todos[reqIndex]['done']){
            window.alert('Error! Can\'t edit if done');
        }else{
            e.target.nextElementSibling.style.display = "flex";
            e.target.style.display = "none";
            e.target.parentElement.parentElement.firstElementChild.contentEditable = true;
            e.target.nextElementSibling.nextElementSibling.disabled = true;
            // start editing message alert
            startEditingMsg.style.opacity = '1';
            savedMsg.style.opacity = '0';
            deletedMsg.style.opacity = '0';
            startEditingMsgCTF();
            savedMsgCTF();
            deletedMsgCTF();
            startEditingMsgSTF();
        }
    };
    if(e.target.classList[0] == "update-btn"){
        if(e.target.parentElement.parentElement.firstElementChild.innerText !== ""){
            e.target.previousElementSibling.style.display = "flex";
            e.target.style.display = "none";
            e.target.parentElement.parentElement.firstElementChild.contentEditable = false;
            e.target.nextElementSibling.disabled = false;

            // localStorage work
            var reqIndex;
            for (var i = 0; i < todoList.children.length; i++){
                if(e.target.parentElement.parentElement === todoList.children[i]){
                    reqIndex = i;
                    break;
                }
            }
            var todos = JSON.parse(localStorage.getItem('todos'));
            // localStorage.removeItem('todos');
            todos[reqIndex] = new todoItemTemplate(e.target.parentElement.parentElement.firstElementChild.innerText);
            localStorage.setItem('todos', JSON.stringify(todos));



            // saved message alert
            startEditingMsg.style.opacity = '0';
            savedMsg.style.opacity = '1';
            deletedMsg.style.opacity = '0';
            startEditingMsgCTF();
            savedMsgCTF();
            deletedMsgCTF();
            savedMsgSTF();
        }
        if(e.target.parentElement.parentElement.firstElementChild.innerText == ""){
            window.alert('Error! You can\'t leave the space empty');
        }
    }
    if(e.target.classList[0] == "done-btn"){
        e.target.parentElement.parentElement.firstElementChild.classList.toggle('done');
        e.target.parentElement.parentElement.classList.toggle('done-assistance');

        // localStorage work
        var reqIndex;
        for (var i = 0; i < todoList.children.length; i++){
            if(e.target.parentElement.parentElement === todoList.children[i]){
                reqIndex = i;
                break;
            }
        }
        var todos = JSON.parse(localStorage.getItem('todos'));
        if (todos[reqIndex]['done']){
            todos[reqIndex] = new todoItemTemplate(e.target.parentElement.parentElement.firstElementChild.innerText, false);
        }else{
            todos[reqIndex] = new todoItemTemplate(e.target.parentElement.parentElement.firstElementChild.innerText, true);
        };
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    if(e.target.classList[0] == "dlt-btn"){

        // localStorage work
        for (var i = 0; i < todoList.children.length; i++){
            if(e.target.parentElement.parentElement === todoList.children[i]){
                reqIndex = i;
                break;
            };
        };
        var todos = JSON.parse(localStorage.getItem('todos'));
        todos.splice(reqIndex, 1);
        localStorage.setItem('todos', JSON.stringify(todos));

        //real function
        e.target.parentElement.parentElement.remove();

        // delete message alert
        startEditingMsg.style.opacity = '0';
        savedMsg.style.opacity = '0';
        deletedMsg.style.opacity = '1';
        startEditingMsgCTF();
        savedMsgCTF();
        deletedMsgCTF();
        deletedMsgSTF();
    }

});




