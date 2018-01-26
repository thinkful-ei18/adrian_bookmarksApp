'use strict';

const api = (function() {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/adrianross';

  // GIMME MY BOOKMARKS!!!
  const getItems = function (callback){
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };

  // MAKE MY BOOKMARK!!!!
  const createItem = function (title, url, callback) {
    const newBookmark = JSON.stringify({title:title, url: url});
    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: newBookmark,
      success: callback
    });
  };

  // CHANGE MY BOOKMARK!!!
  const updateItem = function (id, value, callback) {
    $.ajax({
      url: `${BASE_URL}/bookmarks/:${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(value),
      success: callback
    });
  };

  //I NEVER WANT TO SEE THIS BOOKMARK AGAIN!
  const deleteItem = function (id, callback) {
    $.ajax({
      url: `${BASE_URL}/bookmarks/:${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      success: callback
    });
  };

  return {
    getItems,
    createItem,
    updateItem,
    deleteItem

  };

}());
