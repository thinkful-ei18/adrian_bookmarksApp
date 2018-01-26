'use strict';

const storage =  (function(){
// Houses local item list and methods that affect them.

  /* Finding ID, Delete, and Updating
  -----------------------------------*/

  const findId = function (id) {
    return this.items.find(item => item.id === id);
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  const findAndUpdate = function (id, updatedItem) {
    const foundItem = this.findById(id);
    Object.assign(foundItem, updatedItem);
  };


  return {
    findId,
    findAndDelete,
    findAndUpdate,

    items: [],
    showForm: false,
    minimumRating: null

    // exposed methods will go below:

  };

}());