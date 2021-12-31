let Input = document.getElementById("input");
let Add = document.getElementById("add");
let Save = document.getElementById("save");
let Delete = document.getElementById("delete");

showTask();

Add.addEventListener('click', function () {
    InputVal = Input.value;
    let Task = localStorage.getItem('myTask');
    if (Task == null) {
        taskObj = [];
    }
    else {
        taskObj = JSON.parse(Task);
    }
    if (Input.value.length < 3) {
        let alert = document.getElementById('alert');
        alert.classList.add('wrong');
        setTimeout(() => {
            alert.classList.remove('wrong');
        }, 2000);
    }
    else {
        taskObj.push(InputVal);
        localStorage.setItem("myTask", JSON.stringify(taskObj));
        let done = document.getElementById('done');
        done.classList.add('right');
        setTimeout(() => {
            done.classList.remove('right');
        }, 2000);

    }
    Input.value = "";
    showTask();
})
function showTask() {
    let Task = localStorage.getItem('myTask');
    if (Task == null) {
        taskObj = [];
    }
    else {
        taskObj = JSON.parse(Task);
    }
    let html = '';
    taskObj.forEach(function (element, index) {
        html += `<tr class="element">
        <th scope="row">${index + 1}</th>
        <td><p>${element}</p></td>
        <td onclick="editTask(${index})"><span class="edit">Edit</span></td>
        <td onclick="deleteTask(${index})"><span class="delete">Delete</span></td>
      </tr>`;
    })
    let tbody = document.getElementById('tbody');
    tbody.innerHTML = html;

    if(taskObj == 0){
        tbody.innerHTML = `Add Something !!`;
    }
}

function editTask(index) {
    let Task = localStorage.getItem('myTask');
    let taskObj = JSON.parse(Task);
    //Setting input value as the local storage value at that index
    Input.value = taskObj[index];

    //Setting the save btn inplace of add btn
    Save.style.display = 'block';
    Add.style.display = 'none';

    //Creating a hidden input with some id and when clicked on edit btn setting the  value as index value of clicked element
    let saveIndex = document.getElementById('saveIndex');
    saveIndex.value = index;

}

//Save Task
Save.addEventListener('click', function () {
    let Task = localStorage.getItem('myTask');
    let taskObj = JSON.parse(Task);

    //Getting the value of saveIndex input in saveIndexVal
    let saveIndexVal = document.getElementById('saveIndex').value;
    taskObj[saveIndexVal] = Input.value;
    localStorage.setItem('myTask', JSON.stringify(taskObj));

    //Shows the updated value
    showTask();
    
    //Blanking the input value
    Input.value = '';
    //Removing the Save and replacing Add
    Save.style.display = 'none';
    Add.style.display = 'block';
})

//Delete All
Delete.addEventListener('click' , function(){
    if(confirm("Do you want to Delete All really??"))
    {
        localStorage.clear();
        showTask();
    }
})

function deleteTask(index){
    let Task = localStorage.getItem('myTask');
    let taskObj = JSON.parse(Task);
    taskObj.splice(index , 1) ;

    localStorage.setItem("myTask" , JSON.stringify(taskObj));
    showTask();
}
//Search Task
let search = document.getElementById('searchTxt');
search.addEventListener('input' , function(){

    let inputVal = search.value.toLowerCase();

    let element = document.getElementsByClassName('element');
    Array.from(element).forEach(function(elem){
        let CardTxt = elem.getElementsByTagName('p')[0].innerText.toLowerCase();

        if(CardTxt.includes(inputVal)){
            elem.style.display = `block`;
        }
        else{
            elem.style.display = `none`;
        }
    })
})
