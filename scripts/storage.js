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

  return {
    findId,
    findAndDelete

  };

}());