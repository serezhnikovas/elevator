const house = document.querySelector(".house");
const elevator = document.querySelector(".elevator");
const floors = document.querySelector(".floors");
const firstCallButton = document.querySelector("[data-floor='1'] img");
const buildingForm = document.querySelector(".form");
let isFinishedElevating = true;

function changeActiveButton(obj) {
  const previousActiveButton = document.querySelector(".floor__number_active");
  const currentActiveButton = obj.previousElementSibling;
  previousActiveButton.classList.remove("floor__number_active");
  currentActiveButton.classList.add("floor__number_active");
}

function moveElevator(obj) {
  const currentFloor = obj.parentElement;
  const numCurrentFloor = currentFloor.dataset.floor;
  const currentOffsetY = 142 * (+numCurrentFloor - 1);
  elevator.style.transform = `translateY(-${currentOffsetY}px)`;
}

function clearAllPreviousFloors() {
  const currentHouseFloors = document.querySelectorAll(".house__floor");
  currentHouseFloors.forEach((elem) => {
    if (elem.dataset.floor > 5) {
      elem.remove();
    }
  });
}

function rebuildHouse(str) {
  changeActiveButton(firstCallButton);
  clearAllPreviousFloors();
  elevator.style.transform = "translateY(0px)";
  for (let i = 6; i < +str + 1; i++) {
    const houseFloor = document.createElement("div");
    const houseFloorNumber = document.createElement("div");
    const imgCallButton = document.createElement("img");
    houseFloor.setAttribute("class", "house__floor");
    houseFloor.setAttribute("data-floor", `${i}`);
    houseFloorNumber.setAttribute("class", "house__floor__number");
    houseFloorNumber.innerHTML = `${i}`;
    imgCallButton.setAttribute("src", "./img/button.png");
    imgCallButton.setAttribute("alt", "button");
    houseFloor.append(houseFloorNumber, imgCallButton);
    floors.prepend(houseFloor);
  }
}

elevator.addEventListener("transitionend", (event) => {
  const callButtons = document.querySelectorAll("img[src*='button']");
  callButtons.forEach((btn) => {
    btn.style.cursor = "pointer";
  });
  isFinishedElevating = true;
});

house.addEventListener("click", (event) => {
  const callButtons = document.querySelectorAll("img[src*='button']");
  if (isFinishedElevating) {
    if (event.target.alt === "button") {
      changeActiveButton(event.target);
      moveElevator(event.target);
      callButtons.forEach((btn) => {
        btn.style.cursor = "not-allowed";
      });
      isFinishedElevating = false;
    }
  }
});

buildingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = document.querySelector(".form__input").value;
  if (inputValue) {
    if (!Number.isNaN(+inputValue)) {
      if (+inputValue > 5) {
        rebuildHouse(inputValue);
      } else {
        alert(
          `Да ну ты брось, в ${+inputValue}-этажных зданиях лифтов не бывает.`
        );
      }
    } else {
      alert("О нет, здесь хотелось бы видеть числовое значение.");
    }
  } else {
    alert("Так не пойдет, нужно указать число этажей.");
  }
});
