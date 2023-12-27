



function saveLocalStorage( object, name){
    if(!object || !name) { return }
    let nameString = String(name);
    
    localStorage.setItem(nameString, JSON.stringify(object));
}

function readLocalStorage( name ){
    let nameString = String(name);
    
    let object = JSON.parse(localStorage.getItem(nameString));

    return object;
}


export {
    saveLocalStorage,
    readLocalStorage,
}