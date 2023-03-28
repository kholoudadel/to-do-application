
let container = document.getElementById("container"); 

loadData();

async function loadData() {
    let url = "http://localhost:3000";

    try {
        let resp = await fetch(url);
        let data = await resp.json();
        
        for (let toDoList of data) {
            
            let toDoDiv = document.createElement("div");

            toDoDiv.innerHTML += "<p class='list-font'>" + toDoList.text + "</p>"; 
           // toDoDiv.innerHTML += "<p class='list-font'>" + toDoList._id + "</p>";
           toDoDiv.innerHTML += "<ion-icon name='trash-outline' class='delete-icon' id='deleteBtn'></ion-icon>";
          toDoDiv.innerHTML += "<ion-icon name='create-outline' class='edit-icon'></ion-icon>";
        container.appendChild(toDoDiv);

            toDoDiv.addEventListener('click', function(evt) {
            localStorage.setItem("toDo", JSON.stringify(toDoList));
             });

        } 
    }
    
    catch(err) {
        console.log(err);
    }
}



