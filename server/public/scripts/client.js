console.log( 'js' );
getKoalas();

function getKoalas(){
  console.log( 'in getKoalas' );
  // axios call to server to get koalas
  axios({
    method: 'GET',
    url: '/koalas'
  })
  .then((response) => {
    console.log('GET koalas!!!')
    // ! render function goes here
    renderKoalas(response.data)
  })
  .catch((error) => {
    console.log('ERROR in GET koalas', error)
    app.sendStatus(500)
  })
} // end getKoalas

function saveKoala(){
  console.log( 'in saveKoala' );
  // axios call to server to get koalas
 
}

function renderKoalas(listOfKoalas) {
  console.log('in renderKoalas')
}

