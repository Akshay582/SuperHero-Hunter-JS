ids = localStorage.getItem( 'ids' );
let arr;
if ( ids !== null && ids.substring( 0, 1 ) == ',' ) {
    ids = ids.substring( 1, ids.length );

}

const parent = document.querySelector( '.favorites' );

if ( ids !== null && ids != '' ) {
    arr = ids.split( ',' );
    for ( const id of arr ) {
        fetch( `https://www.superheroapi.com/api.php/620535288570128/${id}` )
            .then( res => res.json() )
            .then( data => {
                const notification = document.querySelector( '.badge' );
                notification.innerHTML = arr.length;
                const child1 = document.createElement( 'div' );
                child1.classList.add( 'card' );
                const child2 = document.createElement( 'div' );
                child2.classList.add( 'card-body' );
                const text1 = document.createTextNode( data.name );
                const heading = document.createElement( 'h5' );
                heading.classList.add( 'card-title' );
                heading.appendChild( text1 );
                const para = document.createElement( 'p' );
                const text2 = document.createTextNode( data.work.occupation );
                para.classList.add( 'card-text' );
                if ( data.work.occupation == '-' ) {
                    para.appendChild( document.createTextNode( 'No occupation found.' ) )
                } else {
                    para.appendChild( text2 );
                }
                const hl = document.createElement( 'a' );
                hl.classList.add( 'btn' );
                hl.classList.add( 'btn-primary' );
                hl.setAttribute( 'href', "index.html" );
                hl.appendChild( document.createTextNode( 'Go Home' ) );
                const button = document.createElement( 'button' );
                button.classList.add( 'btn' );
                button.classList.add( 'btn-primary' );
                button.setAttribute( 'type', "button" );
                button.setAttribute( 'id', `${id}` );
                button.setAttribute( 'onClick', 'removeFav(this.id);' )
                button.appendChild( document.createTextNode( 'Remove from Favorites' ) );
                child2.appendChild( heading );
                child2.appendChild( para );
                child2.appendChild( hl );
                child2.appendChild( button );
                child1.appendChild( child2 );
                parent.appendChild( child1 );
            } )
            .catch( err => console.log( err ) );
    };
} else {
    const notification = document.querySelector( '.badge' );
    notification.innerHTML = 0;
    const text = document.createTextNode( 'No Favorites yet!' );
    const para = document.createElement( 'h4' );
    para.classList.add( 'nulled' );
    const hl = document.createElement( 'a' );
    hl.classList.add( 'btn' );
    hl.classList.add( 'btn-primary' );
    hl.classList.add( 'nulled' );
    hl.setAttribute( 'href', "index.html" );
    hl.appendChild( document.createTextNode( 'Go Home' ) );
    para.appendChild( text );
    parent.appendChild( para );
    parent.appendChild( hl );
}

// onclick event to remove the favorite from the local storage
function removeFav( remId ) {
    let newIds = ids.split( ',' ).filter( id => {
        return id != remId;
    } )
    console.log( newIds );
    localStorage.setItem( 'ids', newIds );
    location.reload();
}