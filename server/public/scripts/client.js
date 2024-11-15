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
}

function saveKoala(){
  console.log( 'in saveKoala' );
  // axios call to server to get koalas

}

function addKoala(){
  console.log('lets add a koala')

// ! create newKoala object to hold inputs
  const newKoala = {
    name: document.getElementById('nameIn').value,
    gender: document.getElementById('colorIn').value,
    age: document.getElementById('ageIn').value,
    readyToTransfer: document.getElementById('readyForTransferIn').value,
    notes: document.getElementById('notesIn').value
  }
  console.log('Lets welcome the new guy: ', newKoala)

// ! axios POST request to send data to server
  axios({
    method: 'POST',
    url: '/koalas',
    data: newKoala
  })
  .then((response) => {
    console.log('POST koalas!!')
    // ! call getKoalas() function to send new koala inputs to server
    getKoalas()
  })
  .catch((error) => {
    console.log('ERROR in addKoala() ', error)
    app.sendStatus(500)
  })
}

function renderKoalas(listOfKoalas) {
  console.log('in renderKoalas')
  const koalasTableBody = document.getElementById('viewKoalas')
  // ! clear table before sending new inputs
  koalasTableBody.innerHTML = ''

  // ! new inputs get sent into HTML
  for(let koala of listOfKoalas){
    let btnClass = "bg-gray";
    if (koala.ready_to_transfer == "Y") {
      btnClass = "bg-green";
    }
    koalasTableBody.innerHTML += `
      <tr>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td>
          <button class="${btnClass}" onClick="toggleTransferStatus(event, ${koala.id})">
            ${koala.ready_to_transfer}
          </button>
        </td>
        <td>${koala.notes}</td>
        <td>
          <button onClick="deleteKoala(${koala.id})">Delete</button>
        </td>
      </tr>
    `
  }

}

function deleteKoala(koalaId) {
  const confirmDelete = confirm(`‼️ How could you!?`);
  if (confirmDelete) {
    const koala = { id: koalaId };
    axios({
      method: "DELETE",
      url: "/koalas",
      data: koala
    })
      .then((response) => {
        console.log(`/koalas DELETE request received:`, response.data);
        getKoalas();
    })
      .catch((error) => {
        console.log('ERROR in deleteKoala() ', error);
        app.sendStatus(500);
    });
  }
}

function toggleTransferStatus(event, koalaId) {
  const button = event.target;
  let transferStatus;
  if (button.innerText == "N") {
    button.innerText = "Y";
    button.setAttribute("class", "bg-green");
    transferStatus = "Y";
  } else {
    button.innerText = "N";
    button.setAttribute("class", "bg-gray");
    transferStatus = "N";
  }
  const koalaToUpdate = { id: koalaId, ready_to_transfer: transferStatus };
  console.log("koalaToUpdate", koalaToUpdate);
  axios({
    method: "PUT",
    url: "/koalas",
    data: koalaToUpdate
  })
    .then((response) => {
      console.log(`/koalas PUT request received:`, response.data);
      getKoalas();
  })
    .catch((error) => {
      console.log('Error in koala PUT request:', error);
  });
}