const router = require("express").Router();

const Items = require("./items-model.js");





const { allItemFields } = require("../users/users-service.js");




router.get("/", (req, res) => {
    Items.getItems()
      .then(items => {
        res.status(200).json({ items, jwt: req.jwt });
      })
      .catch(err => res.send(err));
  });

  router.get('/:id', validateItemId, (req, res) => {
   Items.getById(req.params.id)
      .then(item => {
       
           res.status(200).json({item, jwt: req.jwt});
        }
      )
      .catch(error => {
        res.status(500).json({
          error:"The item could not be retrieved."
        });
      });
  });
  
  
  router.post('/', (req, res) => {
    const itemData = req.body;

   
    if(allItemFields(itemData)) {
    Items.addItem(itemData)
    .then(item => {
     
      res.status(201).json({item, jwt: req.jwt});
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to post new item' });
    });
  } else {
    res.status(400).json({
      message: "Missing one or more from location, name, description, price"
    })
  }
  });


  

  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    if(!allItemFields(changes)) {
      res.status(400).json({
        message: "Missing one or more from location, name, description, price"
      })
    } else {
    Items.getById(id)
    .then(item => {
      if (item) {
        Items.editItem(changes, id)
        .then(updatedItem => {
          res.json({updatedItem, jwt: req.jwt });
        });
      } else {
        res.status(404).json({ message: 'Could not find item with given id' });
      }
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to update item' });
    });
  }
  });
  
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    Items.removeItem(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted, jwt: req.jwt });
      } else {
        res.status(404).json({ message: 'Could not find item with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete item' });
    });
  });



  function validateItemId(req, res, next) {
  
  
   Items.getById(req.params.id)
    .then(item => {
      if (item) {
        req.item = item;
        next();
       
    
      } else {
        res.status(404).json({ message:"invalid item id"});
      }
    })
  }


  
 

  
module.exports = router;