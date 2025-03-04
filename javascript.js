const addButton = document.querySelector(".button-add");
const subject = document.querySelector(".button-start");
const input = document.querySelector(".input");

let subjects = [];

document.addEventListener("DOMContentLoaded", function () {
  const savedSubjects = localStorage.getItem("subjects");

  if (savedSubjects) {
    subjects = JSON.parse(savedSubjects);
    console.log(subjects);
  }
});

addButton.addEventListener("click", function () {
  const value = input.value.trim();

  if (value) {
    subjects.push(value);
    localStorage.setItem("subjects", JSON.stringify(subjects));
    console.log(subjects);
    renderSubjects();
    input.value = "";
  } else {
    console.log("Adicione uma matéria");
  }
});

const list = document.querySelector(".lista");

function renderSubjects() {
    list.innerHTML = "";
  
    subjects.forEach((subject, index) => {
      const li = document.createElement("li");
  
      li.innerHTML = `
        <button class="button-start" onclick="start(${index})">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
          </svg>
        </button> ${subject}
      `;
  
      list.appendChild(li);
    });
  }
  
const display = document.querySelector('.stopwatch');
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function start() {
    if(!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10)
        isRunning = true;
    }
}

function stop(){
    if(isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;

    }

}
function reset(){
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.textContent = "00:00:00"
}
function update(){
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));

    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60 );

    let seconds = Math.floor(elapsedTime / 1000 % 60);

    hours = String(hours).padStart(2, "0")
    minutes = String(minutes).padStart(2, "0")
    seconds = String(seconds).padStart(2, "0")



    display.textContent = `${hours}:${minutes}:${seconds}`;
}


// características do relógio: 
// - não pode voltar pro zero quando apertar em start denovo logo apos dar stop
