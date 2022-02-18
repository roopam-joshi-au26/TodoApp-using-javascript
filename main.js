showtask();//to show data bydefault
let addtaskinput = document.getElementById('addtaskinput');
let addtaskbtn = document.getElementById('addtaskbtn');

addtaskbtn.addEventListener('click', function(){
    addtaskinputval = addtaskinput.value;
    if(addtaskinputval.trim()!=0){// check if input is not blank
        let webtask = localStorage.getItem('localtask'); //read data from loacal storage
        // to check weather data is already there in storage or not
        if(webtask == null){
            taskobj =[];
        }
        else{
            taskobj = JSON.parse(webtask);//because in local storage value is in string that why we make it as object to perform any action into it
        }
        taskobj.push(addtaskinputval);// to store the data 
        localStorage.setItem('localtask', JSON.stringify(taskobj));//save data to local storage
        addtaskinput.value="";
    }
    showtask();
})

//on enter task

// Execute a function when the user releases a key on the keyboard
addtaskinput.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.key === 'Enter') {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("addtaskbtn").click();
  }
});

//to show data in task area
function showtask(){
    let webtask = localStorage.getItem('localtask');
    if(webtask == null){
        taskobj =[];
    }
    else{
        taskobj = JSON.parse(webtask);//because in local storage value is in string that why we make it as object to perform any action into it
    }
    //to show data in html 
    let html = "";
    let addedtasklist = document.getElementById("addedtasklist");
    taskobj.forEach((item,index)=>{
        html+=`<tr>
        <th scope="row">${index+1}</th>
        <td>${item}</td>
        <td><button type="button" onclick="edittask(${index})" class="text-primary"><i class="fa fa-edit"></i>Edit</button></td>
        <td><button type="button" onclick="deleteitem(${index})" class="text-danger"><i class="fa fa-trash"></i>Delete</button></td>
        </tr>`;
    });
    addedtasklist.innerHTML=html;
}

//to edit task
function edittask(index) {
    let saveindex = document.getElementById('saveindex')
    let addtaskbtn = document.getElementById('addtaskbtn')
    let savetaskbtn = document.getElementById('savetaskbtn')
    saveindex.value = index;//to get the index value in text area
    let webtask = localStorage.getItem('localtask');
    let taskobj = JSON.parse(webtask);//convert data from string to object
    addtaskinput.value = taskobj[index];//to take the index value in text area
    addtaskbtn.style.display ="none";//to hide add button
    savetaskbtn.style.display ="block";//to display save button
}

//for saving the task
let savetaskbtn = document.getElementById('savetaskbtn');
savetaskbtn.addEventListener("click", function(){
    let webtask = localStorage.getItem('localtask');
    let taskobj = JSON.parse(webtask);
    let saveindex = document.getElementById('saveindex').value;//to get the index value 
    taskobj[saveindex] = addtaskinput.value;
    savetaskbtn.style.display="none";
    addtaskbtn.style.display="block";
    localStorage.setItem('localtask', JSON.stringify(taskobj));
    addtaskinput.value="";
    showtask();
})

//delete item
function deleteitem(index){
    let webtask = localStorage.getItem('localtask');
    let taskobj = JSON.parse(webtask);//we got an array of tasks
    taskobj.splice(index, 1);
    localStorage.setItem('localtask', JSON.stringify(taskobj));
    showtask();
}

//delete all tasks
let deleteallbtn = document.getElementById('deleteallbtn');
deleteallbtn.addEventListener('click',function(){
    let savetaskbtn = document.getElementById('savetaskbtn');
    let addtaskbtn = document.getElementById('addtaskbtn');
    let webtask = localStorage.getItem('localtask');
    let taskobj = JSON.parse(webtask);
    if(webtask == null){
        taskobj =[];
    }
    else{
        taskobj = JSON.parse(webtask);
        taskobj = [];
    }
    savetaskbtn.style.display="none";
    addtaskbtn.style.display="block";
    localStorage.setItem('localtask', JSON.stringify(taskobj));
    showtask();
})

//search list
let searchtextbox = document.getElementById('searchtextbox');
searchtextbox.addEventListener('input', function(){
    let trlist = document.querySelectorAll("tr");//selecting all tr elements
    Array.from(trlist).forEach(function(item){
        let searchedtext = item.getElementsByTagName("td")[0].innerText;
        let searchtextboxval = searchtextbox.value;
        let re = new RegExp(searchtextboxval,'gi');//searching globally
        if(searchedtext.match(re)){//searching through regular expression
            item.style.display = 'table-row';
        }
        else{
            item.style.display = 'none';
        }
    })
})