'use strict';

const bookmark =  (function(){

  const create = function (id, title, url, desc) {

    return {
      id,
      title,
      url,
      desc,
      rating: null,
      detailedView: false,
    };
  };

  const add = function (bookmark) {
    this.items.push(bookmark);

  };

  const generate = function (item) {

  };

  return {
    create,
    add,

    items: [],
  };

}());

const testItem = bookmark.create('123', 'google', 'google.com', 'fav seach engine');
bookmark.add(testItem);
console.log(bookmark.items);

