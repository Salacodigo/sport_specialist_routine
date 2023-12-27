import {
    rutinaFuerza
} from './javascript/data.js'


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
    if(rutinaFuerza.length<=0) return;
    
    for(let position in rutinaFuerza){
        console.log(rutinaFuerza[position]);

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
            dia: ${rutinaFuerza[position].dia}
        `;
        exerciseBox.innerHTML=`
            ${rutinaFuerza[position].ejercicio}
        `;
        seriesBox.innerHTML=`
            Series: ${rutinaFuerza[position].series}
        `;
        repsBox.innerHTML=`
            Reps: ${rutinaFuerza[position].repeticiones}
        `;
        volumen_Box.innerHTML=`
            Volumen: ${rutinaFuerza[position].volumen_total}
        `;
        restBox.innerHTML=`
            Descanso: ${rutinaFuerza[position].descanso_entre_series} s
        `;
        let video_url = rutinaFuerza[position].video;
        console.log({video_url});
        videoBox.innerHTML=`
            <iframe width="440" height="230" src="https://www.youtube.com/embed/WJM6OKRxqq4?si=A0JWq1io3-9BboFe" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            
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