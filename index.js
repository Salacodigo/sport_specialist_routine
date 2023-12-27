import {
    rutinaFuerza
} from './javascript/data.js'

let actualRoutine = rutinaFuerza;


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
    if(actualRoutine.length<=0) return;
    
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
            <iframe width="480" height="230" src="${video_url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            
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