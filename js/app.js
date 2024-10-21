const publicKey = '675a5d0a3ccf3a6142079ead3bd23dbb';
const privateKey = '5c4c155651615f74274ea35ffdc7c72d8d9f1405';

let ts = Date.now();
let hash = CryptoJS.MD5(ts+privateKey+publicKey).toString();

// aqui vamos a pedir a la API que nos de los datos de los personajes
async function fetchCharactersMarvel(){
    const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    try{
        const response = await fetch(url);
        const data = await response.json();
        mostrarCharacters(data.data.results);
    } catch (error){
        console.error('error' , error);
    }


}

// aqui vamos a crear la carta ,meter los datos a la carta y añdir la carta 
function mostrarCharacters(characters){
    const container = document.querySelector('.card-container');
    container.innerHTML = '';                                      // con este limpiamos el contenedor para agregar nuevos personajes

    characters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h1>${character.name}</h1>
            <img src = "${character.thumbnail.path}/standard_medium.${character.thumbnail.extension}" alt="${character.name}">
            <p>${character.description}</p>
        `;
        container.appendChild(card);
    });
}

// llamamos a la funcion para cargar los personajes
fetchCharactersMarvel();

// tarda un poco en aparecer cosas