function setFavorite( id ) {
    if ( localStorage.getItem( 'ids' ) === null ) {
        let ids = '';
        ids += id;
        localStorage.setItem( 'ids', ids );
    } else {
        let ids = localStorage.getItem( 'ids' );
        if ( !ids.includes( id ) ) {
            ids += ',' + id;
            localStorage.setItem( 'ids', ids );
        }
    }
}