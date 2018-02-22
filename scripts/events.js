/* global bookmark, api */

'use strict';

const events = (function () {

/* Render bookmarks to the page
      -----------------------------------*/

  const render = function (items) {
    console.log('`render` ran!');
    // If we pass items, use those items, if not, use bookmark.items
    let allBookmarks = !items ? bookmark.items : items;
    const stringOfBookmarks = bookmark.generateString(allBookmarks);
    $('.js-bookmark-list').html(stringOfBookmarks);
  };

  /* Event Listeners
      -----------------------------------*/

  const newBookmark = function () {
    $('.js-new-bookmark-form').submit(function (event) {
      event.preventDefault();
      console.log('`newBookmark` ran');
      const newTitle = $('.title-bookmark-input').val();
      const newURL = $('.url-bookmark-input').val();
      const newDesc = $('.desc-bookmark-input').val();
      const newRating = $('input[name=rating]:checked').val();
      console.log(newRating);
      $('.title-bookmark-input').val('');
      $('.url-bookmark-input').val('');
      $('.desc-bookmark-input').val('');

      if (!newTitle && !newURL && !newDesc && !newRating) {
        const error = 'A new bookmark must have a: title, URL, description and rating';
        $('.js-error').html(error);

      } else{
        api.createItem(newTitle, newURL, newDesc, newRating, (newBookmark) => {
          console.log('New item created');
          bookmark.add(newBookmark);
          render();
        });
      }
    });
  };

  const deleteBookmark = function () {
    $('.js-bookmark-list').on('click', '.js-delete-bookmark', event => {
      console.log(event.currentTarget);
      const id = bookmark.getId(event.currentTarget);
      console.log('id is: ' + id);
      api.deleteItem(id, () => {
        bookmark.findAndDelete(id);
        render();
      });
    });
  };

  const seeMoreButton = function () {
    $('.js-bookmark-list').on('click', '.js-expand-bookmark', event => {
      console.log(event.currentTarget);
      const id = bookmark.getId(event.currentTarget);
      console.log('id is: ' + id);
      const foundItem = bookmark.findId(id);
      console.log('foundItem is', foundItem);
      foundItem.detailedView = true;
      render();
    });
  };

  const seeLessButton = function () {
    $('.js-bookmark-list').on('click', '.js-collapse-bookmark', event => {
      console.log(event.currentTarget);
      const id = bookmark.getId(event.currentTarget);
      console.log('id is: ' + id);
      const foundItem = bookmark.findId(id);
      console.log('foundItem is', foundItem);
      foundItem.detailedView = false;
      render();
    });
  };

  const filterBy = function () {
    $('select.rating-choice').change(function () {
      var selectedRating = $('.rating-choice option:selected').val();
      console.log(selectedRating);
      const items = bookmark.items;
      let filteredItems = items.filter(item => item.rating >= selectedRating);
      console.log(filteredItems);
      render(filteredItems);
    });
  };

  const eventListeners = function () {
    newBookmark();
    deleteBookmark();
    seeMoreButton();
    seeLessButton();
    filterBy();
  };

  return {
    eventListeners,
    render,
  };

}());