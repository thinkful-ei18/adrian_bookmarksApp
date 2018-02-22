/* global events, bookmark, api */

'use strict';

$(document).ready(function() {
  events.eventListeners();
  events.render();

  api.getItems((items) => {
    items.forEach((item) => bookmark.add(item));
    events.render();
  });
});