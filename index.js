import {
    rutinaFuerza
} from './data.js'


const routineContainer = document.getElementById('routine-container');


document.addEventListener('DOMContentLoaded', () => {
    addEventListeners();
    showData();
})


function addEventListeners(){
    console.log('Cargan eventos');
}



function showData(){

    cleanContainer(routineContainer);
    
    for(let position in rutinaFuerza){
        console.log(rutinaFuerza[position]);

        const exerciseRowContainer = document.createElement('div');

        const dayBox = document.createElement('div');
        const exerciseBox = document.createElement('div');
        const seriesBox = document.createElement('div');
        const repsBox = document.createElement('div');
        const volumen_Box = document.createElement('div');
        const restBox = document.createElement('div');
        const videoBox = document.createElement('div');
        const video2Box = document.createElement('div');

        dayBox.innerHTML=`
            ${rutinaFuerza[position].dia}
        `;
        exerciseBox.innerHTML=`
            ${rutinaFuerza[position].ejercicio}
        `;
        seriesBox.innerHTML=`
            ${rutinaFuerza[position].series}
        `;
        repsBox.innerHTML=`
            ${rutinaFuerza[position].repeticiones}
        `;
        volumen_Box.innerHTML=`
            ${rutinaFuerza[position].volumen_total}
        `;
        restBox.innerHTML=`
            ${rutinaFuerza[position].descanso_entre_series}
        `;
        videoBox.innerHTML=`
            ${rutinaFuerza[position].video}
        `;
        video2Box.innerHTML=`
            ${rutinaFuerza[position].video2}
        `;
        

        exerciseRowContainer.appendChild(dayBox);
        exerciseRowContainer.appendChild(exerciseBox);
        exerciseRowContainer.appendChild(seriesBox);
        exerciseRowContainer.appendChild(repsBox);
        exerciseRowContainer.appendChild(volumen_Box);
        exerciseRowContainer.appendChild(restBox);
        exerciseRowContainer.appendChild(videoBox);
        exerciseRowContainer.appendChild(video2Box);

        routineContainer.appendChild(exerciseRowContainer);
    }
}



function cleanContainer( container ){
    if(!container) return;

    while(container.firstChild){
        container.removeChild(container.firstChild);
        }
}