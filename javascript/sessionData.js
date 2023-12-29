import {
    rutinaFlexibilidad
} from './flexibilityRoutine.js'


let currentRoutine = {
    routine_type: 'fuerza',
    routine_day: 2,
    selected_flexiblity_exercises: [1,3,5,8],
    total_flexiblity_exercises: rutinaFlexibilidad.length,
};


const routine_types = ['fuerza', 'flexibilidad'];

export {
    currentRoutine,
    routine_types
}