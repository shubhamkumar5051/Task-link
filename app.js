const taskContainer = document.querySelector(".task__container");
const globalStore = [];
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
  //  creating new card by getting user data from modal
  const newCard = `
  <div class="col-sm-12 col-md-6 col-lg-4" id=${taskData.id} >
            <div class="card">
                <div class="card-header d-flex justify-content-end gap-2">
                    <button type="button" class="btn btn-success"><i class="fas fa-pencil-alt"></i></button>
                    <button type="button" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
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

  taskContainer.insertAdjacentHTML("beforeend", newCard);

  //   creating local database

  globalStore.push(taskData); //pushing object into an globalStore Array

  localStorage.setItem("maal", JSON.stringify({ cards: globalStore })); // maal is unique id for local storage

  //converting (object of object) into (Array of object) with help of stringify
};
