//GIVES AN UNIQUE IDENTITY FOR EVERY TODO ITEM
let ID = 1;
//ARRAY TO LIST ALL TODO ITEM PROPERTIES IN OBJECT FORMAT
let todoStack = new Array();
//FUNCTION TO ADD A NEW TASK INTO LIST
function addTask(){
    //PROCESSING...
    let text = document.getElementById('inp');
    //CHECKING CONDITION WHETHER USER TYPED ANY INPUT OR NOT
    if(text.value.length > 0){
        //BLUE-PRINT FOR NEWLY CREATED TODO ITEM
        let template =  `
        <div class="todo-item" id="${ID}">
            <div class="chk-list" id="chk-list${ID}" onclick="crossTask(${ID})">
                <div id="checkmark${ID}" class="checkmark"></div>
            </div>
            <div class="todo-text" id="todo-text${ID}" onclick="crossTask(${ID})">
                <p>${text.value}</p>
            </div>
            <div class="todo-del" id="todo-del${ID}" onclick="delTask(${ID})" style="display:none;">
                <img src="/images/icon-cross.svg">
            </div>
        </div>`;
    //PUT THAT TEMPLATE INTO TODO LIST
    document.querySelector('.todo-list').innerHTML += template;
    let todoVal = text.value;
    //OBJECT LITERAL FOR STORING INFO ABOUT EACH TODO ITEM
    let arrObj = {
        node : template,
        todo :  todoVal,
        id : ID,
        isCompleted : false,
        life : 'alive',
    }
    //PUSH IT INTO OUR MAIN TODOSTACK ARRAY
    todoStack.push(arrObj);
    //ADDING CHECK MARK EFFECT AFTER ADDING NEW TODO INTO LIST,IT LASTS FOR UPTO 1000 MILLISECONDS
    let chkBox = document.getElementById('checkmark');
    chkBox.style.background = 'linear-gradient(135deg,hsl(192,100%,67%),hsl(280,87%,65%))';
    let checkimg = document.createElement("img");
    checkimg.setAttribute("src","/images/icon-check.svg");
    chkBox.append(checkimg);
    text.value = '';
    setTimeout(() => {
        chkBox.removeChild(chkBox.firstChild);
        chkBox.style.background = '';
    },1000);
    //INCREMENTATION OF ID SO THAT NEXT CREATED ITEM WILL HAVE DIFFERENT ID
    ID++;
    //CALLING FUNCTION TO UPDATE NO OF ITEMS LEFT TEXT IN ACTIONS TAB
    itemsLeft();
    }
}
//TO DELETE A PARTICULAR TODO ITEM AFTER BEING COMPLETED
function delTask(identity){
    //REMOVING AND UPDATING TODOSTACK PROPERTY
    let ele = document.getElementById(identity);
    ele.remove();
    let match = todoStack[identity-1];
    match.life = 'dead';

}
//TO MAKE ITEM COMPLETED I.E MAKE IT CROSSED 
function crossTask(identity){
    //VARIABLES...
    let todo = document.getElementById(identity);
    let chkmark = 'checkmark'+identity;
    let chkBox = document.getElementById(chkmark);
    let idVal = `todo-del${identity}`;
    let cross = document.getElementById(idVal);
    let chkId = `chk-list${identity}`;
    let todoId = `todo-text${identity}`;
    //CHECKING WHETHER ITEM IS ALREADY CHECKED OR NOT USING ARRAY OBJECT PROPERTY
    if(todoStack[identity-1].isCompleted != true){
        todo.style.textDecorationLine = 'line-through';
        todo.style.textDecorationColor = 'hsl(233,14%,35%)';
        //APPLYING STYLES
        chkBox.style.background = 'linear-gradient(135deg,hsl(192,100%,67%),hsl(280,87%,65%))';
        let checkimg = document.createElement("img");
        checkimg.setAttribute("src","/images/icon-check.svg");
        chkBox.append(checkimg);
        //MAKING CROSS SYMBOL VISIBLE
        cross.style.display = 'flex';
        //MAKING COMPLETED ELEMENT UNCLICKABLE
        document.getElementById(chkId).style.pointerEvents = 'none';
        document.getElementById(todoId).style.pointerEvents = 'none';
        document.getElementById(todoId).style.color = 'hsl(233,14%,35%)';
        //UPDATING OUR TODOSTACK ARRAY
        let match = todoStack[identity-1];
        match.isCompleted = true;
        //UPDATING ITEMS LEFT VALUE IN ACTIONS TAB
        itemsLeft();
    }
}
//TO SHOW THE NUMBER OF ITEMS LEFT AS UNCOMPLETED
function itemsLeft(){
    //MAKING...
    let len = todoStack.length;
    let count = 0;
    for(let i=0;i<len;i++){
        if(todoStack[i].isCompleted == false){
            count = count+1;
        }
    }
    //UPDATING DOM...
    document.getElementById('items-left').innerHTML = `<p>${count} items left</p>`;

}
//TO CLEAR THE ALL COMPLETED VALUES FROM THE VIEW
function clearCompleted(){
    //DELETING...
    let len = todoStack.length;
    for(let i=0;i<len;i++){
        if(todoStack[i].isCompleted == true && todoStack[i].life != 'dead'){
            console.log(todoStack[i]);
            delTask(i+1);
        }
    }

}
//TO SHOW THE ALL TODO ITEMS BOTH ACTIVE AND COMPLTETD AND RENDER THEM INTO VIEW
function listAll(){
    //MAKING...
    let allStack = ''
    let len = todoStack.length;
    for(let i=0;i<len;i++){
    if(todoStack[i].life != 'dead'){
        if(todoStack[i].isCompleted == true){
            let ID = todoStack[i].id;
            let template =  `
            <div class="todo-item" id="${ID}" style="text-decoration-line : line-through;text-decoration-color : rgb(77,80,102);">
                <div class="chk-list" id="chk-list${ID}" onclick="crossTask(${ID})" style="pointer-events : none;">
                    <div id="checkmark${ID}" class="checkmark" style="background : linear-gradient(135deg,rgb(87,221,225),rgb(192,88,243));">
                        <img src="/images/icon-check.svg">
                    </div>
                </div>
                <div class="todo-text" id="todo-text${ID}" onclick="crossTask(${ID})" style="pointer-events:none;color:rgb(77,80,102);">
                    <p>${todoStack[i].todo}</p>
                </div>
                <div class="todo-del" id="todo-del${ID}" onclick="delTask(${ID})" style="display:flex;">
                    <img src="/images/icon-cross.svg">
                </div>
            </div>`;
            todoStack[i].node = template;
            allStack = allStack + todoStack[i].node;
        }else{
            allStack = allStack + todoStack[i].node;
        }
    }
    }
    //UPDATING DOM
    document.getElementById('todo-list').innerHTML = allStack;
}
//TO LIST ALL THE ACTIVED TODO ITEMS AND RENDER THEM INTO VIEW 
function listActive(){
    //MAKING...
    let activeStack = '';
    let len = todoStack.length;
    for(let i=0;i<len;i++){
        if(todoStack[i].isCompleted != true){
            activeStack = activeStack + todoStack[i].node;
        }
    }
    //UPDATING DOM
    document.getElementById('todo-list').innerHTML = activeStack;

}
//TO LIST ALL THE COMPLETED TODO ITEMS AND RENDER THEM INTO VIEW
function listCompleted(){
    //MAKING...
    let completedStack = '';
    let len = todoStack.length;
    for(let i=0;i<len;i++){
        if(todoStack[i].isCompleted == true && todoStack[i].life == 'alive'){
            completedStack = completedStack + todoStack[i].node;
        }
    }
    //UPDATING DOM
    document.getElementById('todo-list').innerHTML = completedStack;

}






