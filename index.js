const searchInput = document.getElementById( 'search' );

function getSuperHero( toSearch ) {
    fetch( `https://www.superheroapi.com/api.php/620535288570128/search/${toSearch}` )
        .then( res => res.json() )
        .then( superHeroes => {
            if ( superHeroes.response == "success" ) {
                let value = toSearch;
                if ( value && value.trim().length > 0 ) {
                    value = value.trim();
                    setList( superHeroes.results.filter( person => {
                        return person.name.toLowerCase().includes( value );
                    } ).sort( ( personA, personB ) => {
                        return getRelevancy( personB.name, value ) - getRelevancy( personA.name, value );
                    } ) );
                }
            } else {
                clearList();
                setNoResults();
            }
        } )
        .catch( err => console.log( err ) );
}

searchInput.addEventListener( 'input', ( event ) => {
    let value = event.target.value;
    if ( value.length > 2 ) {
        getSuperHero( value );
    } else {
        clearList()
    }
} )

const list = document.getElementById( 'list' );

function setList( group ) {
    clearList();
    for ( const person of group ) {
        const ht = document.createElement( 'a' );
        const item = document.createElement( 'li' );
        item.classList.add( 'list-group-item' );
        const text = document.createTextNode( person.name );
        ht.appendChild( text );
        ht.setAttribute( 'href', `superHero.html?id=${person.id}` )
        item.appendChild( ht );
        item.innerHTML += `<button onClick="setFavorite(this.id)" id=${person.id} class="right"><i class="fas fa-heart"></i></button>`;
        list.appendChild( item );
    }
    if ( group.length === 0 ) {
        setNoResults();
    }
}

function clearList() {
    while ( list.firstChild ) {
        list.removeChild( list.firstChild );
    }
}

function setNoResults() {
    const item = document.createElement( 'li' );
    item.classList.add( 'list-group-item' );
    const text = document.createTextNode( 'No results found.' );
    item.appendChild( text );
    list.appendChild( item );
}

function getRelevancy( value, searchTerm ) {
    if ( value === searchTerm ) {
        return 2;
    } else if ( value.startsWith( searchTerm ) ) {
        return 1;
    } else {
        return 0;
    }
}