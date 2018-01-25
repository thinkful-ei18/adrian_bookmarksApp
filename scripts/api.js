'use strict';

const api = (function() {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/adrianross';

  // GIMME MY BOOKMARKS!!!
  function getItems(callback){
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  }




  return {
    getItems
  };

}());
