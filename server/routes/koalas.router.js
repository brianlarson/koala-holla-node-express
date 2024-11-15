const express = require('express')
const router = express.Router()
const pool = require('../modules/pool')

router.get ( '/', (req, res) => {
    let queryText = `SELECT * FROM "koalas" ORDER BY "name" ASC;`
    pool.query (queryText)
    .then(( results ) =>{
    //Return rows of result:
    res.send ( results.rows )
    })
    .catch( (error) => {
        // Handle any errors:
        console.log("there was an error in recieving koalas: ", error)
        res.sendStatus( 400 )
    })
})

router.post( '/', ( req, res )=>{
    console.log( 'in /koalas POST:', req.body );
        // assemble query
        const queryText = `INSERT into "koalas" ( name, gender, age, ready_to_transfer, notes ) VALUES ( $1, $2, $3, $4, $5);`;
        const values = [ req.body.name, req.body.gender, req.body.age, req.body.readyToTransfer, req.body.notes ];
        // run pool.query
        pool.query( queryText, values ).then( ( results )=>{
            // return results.rows
            res.sendStatus( 201 ); // "CREATED"
        }).catch( ( err )=>{
            // handle any errors
            console.log( err );
            res.sendStatus( 400 );
        })
})

router.delete( '/', ( req, res )=>{
  console.log( 'in /koalas DELETE:', req.body );
  // assemble query
  const queryText = `DELETE FROM koalas WHERE id=$1;`;
  const values = [ req.body.id ];
  // run pool.query
  pool.query( queryText, values ).then( ( results )=>{
      res.sendStatus( 200 ); // "OK"
  }).catch( ( err )=>{
      // handle any errors
      console.log( err );
      res.sendStatus( 400 );
  });
})

router.put( '/', ( req, res )=>{
    console.log( '/koalas PUT:', req.body );
    const queryText = `UPDATE koalas SET ready_to_transfer=$1 WHERE id=$2;`;
    const values = [ req.body.ready_to_transfer, req.body.id ];
    // run pool.query
    pool.query( queryText, values ).then( ( results )=>{
        res.sendStatus( 200 ); // "OK"
    }).catch( ( err )=>{
        // handle any errors
        console.log( err );
        res.sendStatus( 400 );
    })
})

module.exports = router;