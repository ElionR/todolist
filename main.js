var addInput = document.getElementById("addInput");
var addButton = document.getElementById("addButton");

//Date
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1; // returns month from 0 to 11
const year = date.getFullYear();

const str = "  :"+day  + "/" + month + "/" + year;


//get Data
var getData = JSON.parse(localStorage.getItem("ToDoList"));
if (getData == null) {
  var toDoList = [];
} else {
  toDoList = getData;
}

addButton.addEventListener("click", () => {
  if (addInput.value.trim() != "") {
    let obj = {
      id: toDoList.length,
      title: addInput.value,
      completed: 0,
      date:str,
   
    };
    toDoList.push(obj);
  }

  //set data
  localStorage.setItem("ToDoList", JSON.stringify(toDoList));
  location.reload();
});

//append child
window.addEventListener("load", () => {
  toDoList.forEach((x) => {
    const container = document.createElement("div");
    const node = document.createElement("li");
    const spanDate = document.createElement("span");

    //create the item as list tag and display it
    node.setAttribute("status", x.completed);
    node.setAttribute("class", "list");
    node.innerHTML = x.title;
    spanDate.innerHTML = x.date;

    node.appendChild(spanDate)
    document.getElementById("items").appendChild(node);


    // u gotta double click to undo the done task
    // call that a feature :)
    var flag = false;
    node.addEventListener("click", () => {
      if (!flag) {
        x.completed = 1;
        node.style.textDecoration = "line-through";
      } else {
        x.completed = 0;
        node.style.textDecoration = "none";
      }
      node.setAttribute("status", x.completed);
      flag = !flag;

      //set data, so if an item has changed the state the data
      //should be updated
      localStorage.setItem("ToDoList", JSON.stringify(toDoList));
    });

    /// change style if its clicked
    async function changeP() {
      var gg = await document.getElementsByClassName("list");
      for (let i = 0; i < gg.length; i++) {
        if (gg[i].getAttribute("status") == 1) {
          gg[i].style.textDecoration = "line-through";
        } else {
          gg[i].style.textDecoration = "none";
        }
      }
    }

    changeP();
  });

  var clear = document.getElementById("clear");

  clear.addEventListener("click", () => {
    localStorage.removeItem('ToDoList');
    location.reload();
  });
});

///change name
var btnChange = document.getElementById("change");

btnChange.addEventListener("click", () => {
  var title = document.getElementById("title");
  var name = window.prompt("Write your name");

  if (name.trim() == "") {
    name = "Dri";
  } else {
    name = name;
  }
  localStorage.setItem("name", name);
  btnChange.style.display = "none";
  location.reload()
});

var localname = localStorage.getItem("name");
document.getElementById(
  "title"
).innerHTML = `${localname}'s personal to do list`;