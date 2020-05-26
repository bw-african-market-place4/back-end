const router = require("express").Router();

const Users = require("./users-model.js");

const Items = require("../items/items-model.js");

const { allItemFields } = require("../users/users-service.js");




   
router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json({ users, jwt: req.jwt });
    })
    .catch(err => res.send(err));
});

router.get("/:id", validateUserId, (req, res) => {
    Users.findById(req.params.id)
      .then(user => {
       
           res.status(200).json({user, jwt:req.jwt});
        }
      )
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          error:"The user information could not be retrieved."
        });
      });
  });
  


router.get("/:id/items", (req, res) => {
    Users.getItemsById(req.params.id)
       .then(items => {
         if (!items[0]) {
           res.status(404).json({ message: "The user with the specified ID does not exist." });
       
         } else {
             res.status(200).json({ data: items,  jwt: req.jwt });
         }
       })
       .catch(error => {
         res.status(500).json({
           error:"The item information could not be retrieved."
         });
       });
   });

   
router.post('/:id/items', (req, res) => {
   const itemData = req.body;
    const user = {...itemData, userId: req.params.id};
    if(allItemFields(itemData)) {
    Items.addItem(user)
    .then(item => {
       
            res.status(201).json({item,jwt:req.jwt});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error while saving the post to the database"})
        })
    } else {
        res.status(400).json({
          message: "Missing one or more from location, name, description, price"
        })
    }
  });

  router.put('/:id/items/:id', (req, res) => {
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
  
  router.delete('/:id/items/:id', (req, res) => {
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


  function validateUserId(req, res, next) {
 
  
    Users.findById(req.params.id)
      .then(user => {
        if (!user) {
          res.status(404).json({ message:"invalid user id"});
      
        } else {
           req.user = user;
           next();
        }
      })
  }
module.exports = router;
