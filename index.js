import {
    rutinaFuerza
} from './javascript/strengthRoutine.js'

import{
    rutinaFlexibilidad
} from './javascript/flexibilityRoutine.js'

import {
    currentRoutine,
    routine_types
} from './javascript/sessionData.js'

import {
    saveLocalStorage,
    readLocalStorage,
} from './javascript/localStorage.js'

let routineData = rutinaFuerza;
const routineTypeList = document.getElementsByClassName('routine-type-item');

const routineDayList = document.getElementsByClassName('routine-day-item');
const flexibilityExerciseList = document.getElementsByClassName('flexibility-exercise-item');

const routineContainer = document.getElementById('routine-container');


document.addEventListener('DOMContentLoaded', () => {
    addEventListeners();
    loadData();
    showData();
})


function addEventListeners(){
    routineTypeListAddEventListeners();
    routineDayListAddEventListeners();
    flexibilityExerciseListAddEventListeners();
}

function routineTypeListAddEventListeners(){    
    if(routineTypeList.length <= 0){ return }

    for(let position = 0; position < routineTypeList.length; position++ ){
        
        routineTypeList[position].addEventListener("click", (e) => {
            let routineType = e.target.attributes[1].value;
            currentRoutine.routine_type = routineType;
            setActiveRoutineTypeList( routineType );
            setRoutineTitle( routineType );
            showData();
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

function setRoutineTitle( routineType ){
    const routineTitle = document.getElementById('routine-type-title');
    routineTitle.innerText = `${ routineType }`;
}

function routineDayListAddEventListeners( value ){

    if(routineDayList.length <= 0){ return }

    for(let position = 0; position < routineDayList.length; position++ ){
        
        routineDayList[position].addEventListener("click", (e) => {
            let routineDay = e.target.attributes[1].value;
            currentRoutine.routine_day = Number(routineDay);
            setActiveRoutineDayList( routineDay );
            showData();
        })
    }
}

function setActiveRoutineDayList( value ){
    for(let position = 0; position < routineDayList.length; position++ ){
        routineDayList[position].classList.remove("active");
        
        let compareValue = routineDayList[position].attributes[1].value;
        
        if(compareValue === value ){
            routineDayList[position].classList.add('active');
        }
    }
}

function flexibilityExerciseListAddEventListeners(){
    if(flexibilityExerciseList.length <= 0){ return }

    for(let position = 0; position < flexibilityExerciseList.length; position++ ){
        
        flexibilityExerciseList[position].addEventListener("click", (e) => {
            let selected = e.target.attributes[1].value;
            modifyFlexibilityExercises( selected );
            setActiveFlexibilityExerciseList();
            showData();
        })
    }
}

function modifyFlexibilityExercises( selected, size = 4 ){
    selected = Number(selected);
    let currentFlexibilityExercises = currentRoutine.selected_flexiblity_exercises; // Array
    let newFlexibilityExercises = [];

    if(currentFlexibilityExercises.includes(selected)){
        
        newFlexibilityExercises = currentFlexibilityExercises.filter(
            (exerciseNumber) => {
            return exerciseNumber !== selected;
        })
        
    } else {
        if(currentFlexibilityExercises.length == size){ return;}
        if(currentFlexibilityExercises.length > size){ 
            currentFlexibilityExercises.splice(3)
        }
        currentFlexibilityExercises.push(selected);
        newFlexibilityExercises = currentFlexibilityExercises;
    }

    currentRoutine.selected_flexiblity_exercises = newFlexibilityExercises;
}

function setActiveFlexibilityExerciseList(){
    // flexibilityExerciseList
    let currentFlexibilityExercises = currentRoutine.selected_flexiblity_exercises; // Array
    let totalFlexibilityExercises = currentRoutine.total_flexiblity_exercises; // number

    // HTML elements
    for(let position = 1; position <= totalFlexibilityExercises; position++ ){
        let condition = currentFlexibilityExercises.includes(position);
        if(condition){
            flexibilityExerciseList[position-1].classList.add('active');
        } else {
            flexibilityExerciseList[position-1].classList.remove('active');
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
    showMenu();
    cleanContainer(routineContainer);
    if(routineData.length<=0) return;
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
                if(currentRoutine.selected_flexiblity_exercises.includes(exercise.number)){
                    return exercise;
                };
            }
        )
        paintFlexibilityExercisesList();
        setActiveFlexibilityExerciseList();
        return selectedRoutine;
    }
}

function showMenu(){
    currentRoutine.routine_type == 'fuerza' ? showStrengthMenu() : showFlexibilityMenu();
}

function showStrengthMenu(){
    const flexibility_exercises_section = document.getElementById('flexibility-exercises');
    flexibility_exercises_section.classList.add('hidden');
    flexibility_exercises_section.classList.remove('visible');

    const routine_day_section = document.getElementById('routine-day');
    routine_day_section.classList.remove('hidden');
    routine_day_section.classList.add('visible');
    
}

function showFlexibilityMenu(){
    const routine_day_section = document.getElementById('routine-day');
    routine_day_section.classList.add('hidden');
    routine_day_section.classList.remove('visible');

    const flexibility_exercises_section = document.getElementById('flexibility-exercises');
    flexibility_exercises_section.classList.remove('hidden');
    flexibility_exercises_section.classList.add('visible');

}



function paintRoutine(routineData){
    for(let position in routineData){

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
            dia: ${routineData[position].dia}
        `;
        exerciseBox.innerHTML=`
            ${routineData[position].ejercicio}
        `;
        seriesBox.innerHTML=`
            Series: ${routineData[position].series}
        `;
        repsBox.innerHTML=`
            Reps: ${routineData[position].repeticiones}
        `;
        volumen_Box.innerHTML=`
            Volumen: ${routineData[position].volumen_total}
        `;
        restBox.innerHTML=`
            Descanso: ${routineData[position].descanso_entre_series} s
        `;
        let video_url = routineData[position].video2;
        
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

function paintFlexibilityExercisesList(){
    const flexibilityExercisesContainer = document.getElementById('flexibility-exercise-list-container');

    cleanContainer(flexibilityExercisesContainer);

    for(let position = 0; position < currentRoutine.total_flexiblity_exercises; position++){
        const flexibilityExerciseItem = document.createElement('div');
        flexibilityExerciseItem.classList.add('flexibility-exercise-item');
        flexibilityExerciseItem.setAttribute('name', `${position+1}`);
        flexibilityExerciseItem.innerText = `${position+1}`;

        flexibilityExercisesContainer.append(flexibilityExerciseItem);
    }
    flexibilityExerciseListAddEventListeners();
}




function cleanContainer( container ){
    if(!container) return;

    while(container.firstChild){
        container.removeChild(container.firstChild);
        }
}