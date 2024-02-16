let pokemonRepository = (function () {
    let pokemonList = [];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=40';
    let modalContainer = document.querySelector('#modal-container');

    // Add a Pokemon Item to list
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    // Return an array of pokemon
    function getAll() {
        return pokemonList;
    }

    // Loading the list of Pokemon from external API
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
    
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        });
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details of the item
            console.log('results', details);
            item.imgUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    function showModal(title, text, imgUrl) {
        //Clear all existing modal content
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        //Add new modal content
        let titleElement = document.createElement('h1');
        titleElement.innerText = title;
        modal.appendChild(titleElement);

        let contentElement = document.createElement('p');
        contentElement.innerText = text;
        modal.appendChild(contentElement);

        let imageElement = document.createElement('img');

        imageElement.src = imgUrl;
        imageElement.setAttribute('width', '160');
        imageElement.setAttribute('height', '128');
        modal.appendChild(imageElement);

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        modal.appendChild(closeButtonElement);
        closeButtonElement.addEventListener('click', hideModal);
        modalContainer.appendChild(modal);
        modalContainer.classList.add('is-visible');
    }

    function showDetails(item) {
        loadDetails(item).then(function () {
            console.log(item);
            showModal(item.name, ' Height: ' + item.height + ' Type: ' + item.types.map(type => type.type.name).join(', '), item.imgUrl);
        });
    }

    function addListItem(pokemon) {
        let ulItem = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');

        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');

        listItem.appendChild(button);
        ulItem.appendChild(listItem);
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    modalContainer.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    modalContainer.addEventListener('click', (e) => {
        //Since this is also triggered when clicking inside the modal
        //We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    document.querySelector('#show-modal').addEventListener('click', () => {
        showModal('Modal title', 'This is the modal content!');
    });

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
}());

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
