/* eslint-disable no-undef */
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=40';

    // Return an array of pokemon
    function getAll() {
        return pokemonList;
    }

    // Add a Pokemon Item to list
    function add(pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log('Pokemon is not correct')
        }
    }

    function addListItem(pokemon) {
        let pokemonAddList = document.querySelector('.row');
        let li = document.createElement('li');
        li.classList.add('list-group-item', 'col-12', 'col-sm-6', 'col-md-4', 'col-lg-3');
        li.id = pokemon.name;
        
        
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('btn', 'btn-success', 'btn-block', 'btn-lg', 'w-100', 'mb-3');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#exampleModal');
        li.appendChild(button);
        pokemonAddList.appendChild(li);

        addEventListenerToButton(button, pokemon);
    }

    function addEventListenerToButton(button, pokemon) {
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
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
            item.imgUrlFront = details.sprites.front_default;
            item.imgUrlBack = details.sprites.back_default;
            item.types = details.types.map((type) => type.type.name).join(',');
            item.height = details.height;
            item.weight = details.weight;
            item.abilities = details.abilities.map((ability) => ability.ability.name).join(',');
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(item) {
        loadDetails(item).then(function () {
            showModal(item);
        });
    }

    function showModal(item) {
        let modalBody = $('.modal-body');
        let modalHeader = $('.modal-header');
        let modalTitle = $('.modal-title');
        
        //Clear all existing modal content
        modalTitle.empty();
        modalBody.empty();

        //Creating element to put name in modal content
        let nameElement = $('<h1>' + item.name + '<h1>');
        //Creating img in modal content
        let imageElementFront = $('<img class="modal-img" style="width:50%">');
        imageElementFront.attr('src', item.imgUrlFront);
        let imageElementBack = $('<img class="modal-img" style="width:50%">');
        imageElementBack.attr('src', item.imgUrlBack);
        //Creating elements for height, weight, types and abilities in modal content
        let heightElement = $('<p>' + 'Height : ' + item.height + '</p>');
        let weightElement = $('<p>' + 'Weight : ' + item.weight + '</p>');
        let typesElement = $('<p>' + 'Types : ' + item.types + '</p>');
        let abilitiesElement = $('<p>' + 'Abilities : ' + item.abilities + '</p>');

        modalBody.append(nameElement);
        modalBody.append(imageElementFront);
        modalBody.append(imageElementBack);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
        modalBody.append(abilitiesElement);
    }


    function hideModal() {
        modal.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-visible')) {
            hideModal();
        }
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
