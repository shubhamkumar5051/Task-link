const taskContainer = document.querySelector(".task__container");
let globalStore = [];

//generate new card

const generateNewCard = (taskData) =>
  `<div class="col-sm-12 col-md-6 col-lg-4 my-2 ${taskData.id}" >
 <div class="card">
     <div class="card-header d-flex justify-content-end gap-2">
         <button type="button" class="btn btn-success"><i class="fas fa-pencil-alt"></i></button>
         <button type="button" class="btn btn-danger" id=${taskData.id} onclick="deleteCard.apply(this,arguments)" > <i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"></i></button>
     </div>
     <div class="card-body">
         <img src=${taskData.imageUrl}
             class="card-img-top" alt="task image">
         <h5 class="card-title mt-3 text-black fw-bold">${taskData.taskTitle}</h5>
         <p class="card-text">${taskData.taskDescription}</p>
         <a href="#" class="btn btn-info fw-bold">${taskData.taskType}</a>
     </div>
 </div>
</div>`;

//delete function

const deleteCard = (event) => {
  event = window.event;
  //fetching the id of event
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
  localStorage.setItem(
    "maal",
    JSON.stringify({
      cards: globalStore,
    })
  );

  if (tagname === "BUTTON") {
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode
    );
  } else {
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode.parentNode
    );
  }
};

//this function will get trigerred by "onLoad" attribute inside body tag
const loadIntialCardData = () => {
  //local storage to get tasky card data
  const getCardData = localStorage.getItem("maal");

  //convert to normal object [converting array of object into object to object]
  const { cards } = JSON.parse(getCardData);

  //loop over those array of task object to create HTML Card , inject to DOM
  cards.map((cardObject) => {
    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));
    //Upadte our globalStore
    globalStore.push(cardObject);
  });
};

//Arrow function which will get trigerred by save changes button inside modal
const saveChanges = () => {
  const taskData = {
    //object
    id: `${Date.now()}`, //it will generate id uniquely for every task
    imageUrl: document.getElementById("imageurl").value,
    taskTitle: document.getElementById("tasktitle").value, //key value pair
    taskType: document.getElementById("tasktype").value,
    taskDescription: document.getElementById("taskdescription").value,
  };

  taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

  //   creating local database

  globalStore.push(taskData); //pushing object into an globalStore Array

  localStorage.setItem("maal", JSON.stringify({ cards: globalStore })); // maal is unique id for local storage

  //converting (object of object) into (Array of object) with help of stringify. and stringfy store the data in key value format
};
