const express = require('express');
const app = express();
const PORT = 5001;
const koalaRouter = require('./routes/koalas.router');

app.use(express.json());
app.use(express.static('server/public'));

koalaList = [
  {
    name: 'Scotty', 
    gender: 'M', 
    age: 4,
    readyToTransfer: true, 
    notes: 'Born in Guatemala'
  },
  {
    name: 'Jean', 
    gender: 'F', 
    age: 5,
    readyToTransfer: true, 
    notes: 'Allergic to lots of lava'
  }

]

// ROUTES
app.use('/koalas', koalaRouter);

app.get('/koalas', (req, res) => {
  console.log(`In /koalas GET`);
  res.send(koalaList);
});

app.post('/koalas', (req, res) => {
  console.log('in /koalas POST')
  koalaList.push(req.body)
  res.sendStatus(201)
})
// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
