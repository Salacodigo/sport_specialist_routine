import {
    rutinaFuerza
} from './javascript/strengthRoutine.js'

import{
    rutinaFlexibilidad
} from './javascript/flexibilityRoutine.js'

import {
    currentRoutine
} from './javascript/sessionData.js'

import {
    saveLocalStorage,
    readLocalStorage,
} from './javascript/localStorage.js'

import {
    capitalizeFirstLetter
} from './javascript/text_transformations.js'



let actualRoutine = rutinaFuerza;
const routine_types = ['fuerza', 'flexibilidad'];
const routineListContainer = document.getElementById('routine-list-container');
const routineTypeList = document.getElementsByClassName('routine-type-item');

const routineDayList = document.getElementsByClassName('routine-day-item');



const routineContainer = document.getElementById('routine-container');


document.addEventListener('DOMContentLoaded', () => {
    addEventListeners();
    loadData();
    showData();
})


function addEventListeners(){
    routineTypeListAddEventListeners();
    routineDayListAddEventListeners();
}

function routineTypeListAddEventListeners(){
    
    if(routineTypeList.length <= 0){ return }

    for(let position = 0; position < routineTypeList.length; position++ ){
        routineTypeList[position].addEventListener("click", (e) => {
            let routineType = e.target.attributes[1].value;
            setActiveRoutineTypeList( routineType );
        })
    }
}

function setActiveRoutineTypeList( value ){
    for(let position = 0; position < routineTypeList.length; position++ ){
        routineTypeList[position].classList.remove("active");
        
        let compareValue = routineTypeList[position].attributes[1].value;
        
        if(compareValue === value ){
            routineTypeList[position].classList.add('active');
        }
    }
}

function routineDayListAddEventListeners( value ){

    if(routineDayList.length <= 0){ return }

    for(let position = 0; position < routineDayList.length; position++ ){
        routineDayList[position].addEventListener("click", (e) => {
            let routineDay = e.target.attributes[1].value;
            setActiveroutineDayList( routineDay );
        })
    }
}

function setActiveroutineDayList( value ){
    for(let position = 0; position < routineDayList.length; position++ ){
        routineDayList[position].classList.remove("active");
        
        let compareValue = routineDayList[position].attributes[1].value;
        
        if(compareValue === value ){
            routineDayList[position].classList.add('active');
        }
    }
}


function loadData(){

    try {
        let currentRoutineLS = readLocalStorage('currentRoutine');
        
        if(!currentRoutineLS) return;

        currentRoutine = currentRoutineLS;
    } catch (error) {
        console.log({error});
    }
}



function showData(){

    cleanContainer(routineContainer);
    if(actualRoutine.length<=0) return;
    let selectedRoutine = filterRoutine(currentRoutine.routine_type);
    paintRoutine( selectedRoutine ); 
}


function filterRoutine( routineType ){

    if(routineType === 'fuerza'){
        // routine filter by day
        let selectedRoutine = rutinaFuerza.filter(
            ( exercise ) => {
                return exercise.dia === currentRoutine.routine_day;
            }
        )
        return selectedRoutine;
    }

    if(routineType === 'flexibilidad'){
        // routine filter by day
        let selectedRoutine = rutinaFlexibilidad.filter(
            ( exercise ) => {
                if(currentRoutine.flexiblity_exercises.includes(exercise.number)){
                    return exercise;
                };
            }
        )
        return selectedRoutine;
    }
}

function paintRoutine(actualRoutine){
    for(let position in actualRoutine){

        const exerciseRowContainer = document.createElement('div');
        exerciseRowContainer.classList.add('exercise-card');

        const dayBox = document.createElement('div');
        dayBox.classList.add('dayBox');
        const exerciseBox = document.createElement('div');
        exerciseBox.classList.add('exerciseBox');
        const seriesBox = document.createElement('div');
        seriesBox.classList.add('seriesBox');
        const repsBox = document.createElement('div');
        repsBox.classList.add('repsBox');
        const volumen_Box = document.createElement('div');
        volumen_Box.classList.add('volumen_Box');
        const restBox = document.createElement('div');
        restBox.classList.add('restBox');
        const videoBox = document.createElement('div');
        videoBox.classList.add('videoBox');
        const video2Box = document.createElement('div');
        video2Box.classList.add('video2Box');

        dayBox.innerHTML=`
            dia: ${actualRoutine[position].dia}
        `;
        exerciseBox.innerHTML=`
            ${actualRoutine[position].ejercicio}
        `;
        seriesBox.innerHTML=`
            Series: ${actualRoutine[position].series}
        `;
        repsBox.innerHTML=`
            Reps: ${actualRoutine[position].repeticiones}
        `;
        volumen_Box.innerHTML=`
            Volumen: ${actualRoutine[position].volumen_total}
        `;
        restBox.innerHTML=`
            Descanso: ${actualRoutine[position].descanso_entre_series} s
        `;
        let video_url = actualRoutine[position].video2;
        
        videoBox.innerHTML=`
            <iframe width="100%" height="230" src="${video_url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            
        `;
        video2Box.innerHTML=`
            
        `;
        
        const exerciseValuesSuperior = document.createElement('div');
        exerciseValuesSuperior.classList.add('exerciseValuesSuperior');
        
        const exerciseValuesInferior = document.createElement('div');
        exerciseValuesInferior.classList.add('exerciseValuesInferior');

        // Video
        exerciseRowContainer.appendChild(videoBox);
        exerciseRowContainer.appendChild(video2Box);
        exerciseRowContainer.appendChild(exerciseBox);
        // Row values
        exerciseValuesSuperior.appendChild(seriesBox);
        exerciseValuesSuperior.appendChild(repsBox);
        exerciseRowContainer.appendChild(exerciseValuesSuperior);
        // 
        
        exerciseValuesInferior.appendChild(dayBox);
        exerciseValuesInferior.appendChild(volumen_Box);
        exerciseValuesInferior.appendChild(restBox);
        exerciseRowContainer.appendChild(exerciseValuesInferior);
        
        //Add Card to container
        routineContainer.appendChild(exerciseRowContainer);
    }
}


function cleanContainer( container ){
    if(!container) return;

    while(container.firstChild){
        container.removeChild(container.firstChild);
        }
}