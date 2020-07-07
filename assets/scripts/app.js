const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryText = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');


const movies = [];

const updateUI = () => {
    if (movies.length === 0) {
        entryText.style.display = 'block';
    }else {
        entryText.style.display = 'none';
    }
};

const cancelMovieDelection = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
} 

const deleteMovie = (movieId) => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    cancelMovieDelection();
}



const deleteMovieHandler = () => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();
    const cancelDeleteButton = deleteMovieModal.querySelector('.btn--passive');
    let confirmDelteButton = deleteMovieModal.querySelector('.btn--danger');

    confirmDelteButton.replaceWith(confirmDelteButton.cloneNode(true));

    confirmDelteButton = deleteMovieModal.querySelector('.btn--danger');

    cancelDeleteButton.removeEventListener('click', cancelMovieDelection);
    cancelDeleteButton.addEventListener('click', () => {
        cancelMovieDelection();
    });

    confirmDelteButton.addEventListener('click', deleteMovieHandler.bind(null, movieId));
    // deleteMovie(movieId);
}

const renderNewMovieElement = (id, title, imageUrl, ratting) => {
    const newMovieElement = document.createElement('li');
     newMovieElement.className = 'movie-element';
     newMovieElement.innerHTML = `
     <div class="movie-element__image">
        <img src="${imageUrl}" alt = "${title}">
     </div>
     <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${ratting}/5 stars</p>
     </div>  
     `;

    newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id));
     const listRoot = document.getElementById('movie-list');
     listRoot.append(newMovieElement);
};


const clearMovieInput = () => {
    for (const usrInput of userInputs) {
        usrInput.value = '';
    }
};

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
};


const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBackdrop();
};
const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const backdropClickHandler = () => {
    closeMovieModal();
    cancelMovieDelection();
    clearMovieInput();
};

const cancelAddMovieHandler = () => {
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
};

const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const rattingValue = userInputs[2].value;

    if (
        titleValue.trim() === '' ||
        imageUrlValue.trim() === '' ||
        rattingValue.trim() === '' ||
        +rattingValue < 1 ||
        +rattingValue > 5) {
            alert('Please Enter Valid Ratting Between 1 to 5.');
            return;
        }
        const newMovie = {
            id: Math.random().toString(),
            title: titleValue,
            image: imageUrlValue,
            ratting: rattingValue
               };
        
        movies.push(newMovie);
        console.log(movies);
        closeMovieModal(); 
        toggleBackdrop();   
        clearMovieInput();
        renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.ratting);
        updateUI();

};


startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);