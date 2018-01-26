/* global bookmark, api */

'use strict';

$(document).ready(function() {
  bookmark.eventListeners();
  bookmark.render();

  api.getItems((items) => {
    items.forEach((item) => bookmark.add(item));
    bookmark.render();
  });
});