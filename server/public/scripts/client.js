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

function addKoala(){
  console.log('lets add a koala')


  const newKoala = {
    name: document.getElementById('nameIn').value, 
    gender: document.getElementById('colorIn').value, 
    age: document.getElementById('ageIn').value,
    readyToTransfer: document.getElementById('readyForTransferIn').value, 
    notes: document.getElementById('notesIn').value
  }
  console.log('Lets welcome the new guy: ', newKoala)

}

function renderKoalas(listOfKoalas) {
  console.log('in renderKoalas')
  const koalasTableBody = document.getElementById('viewKoalas')

  for(let koala of listOfKoalas){
    koalasTableBody.innerHTML += `
      <tr>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td>${koala.ready_to_transfer}</td>
        <td>${koala.notes}</td>  
      </tr>  
    `
  }

}

