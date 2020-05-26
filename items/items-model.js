const db = require("../data/dbConfig.js");

module.exports = {
  addItem,
  getItems,
  getById,
  removeItem,
  editItem
};

function getItems() {
  return db("items").select("id", "name");
}

function getById(id) {
    return db("items").where({ id }).first();
  }

  
function addItem(newItem) {
    return db("items").insert(newItem, "id").then((ids) => {
        return getById(ids[0]);
      })
  }

function removeItem(id) {
    return getById(id)
    .then(res => {
        return db("items").where({ id }).delete()
        .then(() => {
            return res;
        })
    })
  }

function editItem(changes, id) {
    return db("items").where({ id }).update(changes).then(() => getById(id));
  }
  