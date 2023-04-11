
let container = document.getElementById("container");
let getUrl = "http://localhost:5000/todos";
const form = document.getElementById("form");
let id = localStorage.getItem("id");
let token = localStorage.getItem('token');
let data;


loadData();
async function loadData() {
    let response = await fetch(getUrl);
    let data = await response.json();
    let token = localStorage.getItem('token');

    for (let i = 0; i < data.length; i++) {
        let div = document.createElement('div');
        div.innerHTML += "<ul ><li class='h3-text'><h3 class='h3-text'>" + data[i].title + "</h3></li></ul>";
        div.innerHTML += "<p>" + data[i].description + "</p>  ";

        container.appendChild(div);

        let deleteBtn = document.createElement('trash-outline');
        deleteBtn.innerHTML += `<h3><ion-icon name='trash-outline'class='deletIonIcon' id=${data[i].id}>` + "</ion-icon></h3> <hr>";
        container.appendChild(deleteBtn);

        deleteBtn.addEventListener("click", async function (e) {
            let options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': token,
                }
            }

            let deleteUrl = `http://localhost:5000/todos/${e.target.id}`;
            let response = await fetch(deleteUrl, options);
            let data = await response.json();
        })
    }

    let emptyBtn = document.getElementById('empty-btn');

    emptyBtn.addEventListener("click", async function () {
        let options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorization': token,
            }
        }
        let deleteUrl = `http://localhost:5000/todos/clear`;
        let response = await fetch(deleteUrl, options);
        let data = await response.json();
        localStorage.removeItem("toDo");
    });
};

postNewData();
async function postNewData() {
    try {
        form.addEventListener('submit', async function (evt) {
            evt.preventDefault();

            let name = document.getElementById('name').value;
            let desc = document.getElementById('desc').value;

            //configration opject--fetch post request
            let url = ("http://localhost:5000/todos");
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    title: name,
                    description: desc
                }),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                }
            })
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    let div = document.createElement('div');
                    div.innerHTML += "<ul ><li class='h3-text'><h3 class='h3-text'>" + data.title + "</h3></li></ul>";
                    div.innerHTML += "<p>" + data.description + "</p>  ";
                    container.appendChild(div);

                    let deleteBtn = document.createElement('trash-outline');
                    deleteBtn.innerHTML += `<h3><ion-icon name='trash-outline'class='deletIonIcon' id=${data.id}>` + "</ion-icon></h3> <hr>";
                    container.appendChild(deleteBtn);
            
                    deleteBtn.addEventListener("click", async function (e) {
                        let options = {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'authorization': token,
                            }
                        }
            
                        let deleteUrl = `http://localhost:5000/todos/${e.target.id}`;
                        let response = await fetch(deleteUrl, options);
                        let data = await response.json();
                    })
                })
        })
    }
    catch (err) {
        console.log(err);
    }
}