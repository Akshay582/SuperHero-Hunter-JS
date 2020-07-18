var getParams = function ( url ) {
    var params = {};
    var parser = document.createElement( 'a' );
    parser.href = url;
    var query = parser.search.substring( 1 );
    var vars = query.split( '&' );
    for ( var i = 0; i < vars.length; i++ ) {
        var pair = vars[ i ].split( '=' );
        params[ pair[ 0 ] ] = decodeURIComponent( pair[ 1 ] );
    }
    return params;
};

const id = getParams( window.location.href ).id;

fetch( `https://www.superheroapi.com/api.php/620535288570128/${id}` )
    .then( res => res.json() )
    .then( data => {
        const title = document.querySelector( '.display-4' );
        title.textContent = `${data.name}`
        const desc = document.querySelector( '.lead' );
        if ( desc.textContent == '' ) {
            desc.textContent = 'Retired I guess!'
        } else {
            desc.textContent = `${data.work.base}`
        }
        const imgSrc = document.getElementById( 'hero-image' );
        imgSrc.setAttribute( 'src', `${data.image.url}` )
        const featured = document.querySelector( '.card-title' );
        featured.innerHTML = `${data.biography[ 'full-name' ]}`
        const publisher = document.querySelector( '.card-header' );
        publisher.innerHTML = `${data.biography.publisher}`
        const ul = document.getElementById( 'powerstats' );
        for ( let k in data.powerstats ) {
            const li = document.createElement( 'li' );
            const text = document.createTextNode( `${k[ 0 ].toUpperCase() + k.slice( 1 )}: ${data.powerstats[ k ]}` );
            li.appendChild( text );
            ul.appendChild( li );
        }
        console.log( data );
    } )
    .catch( err => console.log( err ) );