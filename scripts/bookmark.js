/* global bookmark, storage, api */

'use strict';

const bookmark = (function () {

  /* Create, Add, Generate, and Render Items
      -----------------------------------*/

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

  const generateElement = function (item) {
    if (item.detailedView) {
      return `
      <div class=''>
        <li class='js-bookmark-item' data-bookmark-id='${item.id}'>
          <h2>${item.title}</h2>
          <a href='${item.url}' target="_blank">
            <p>Visit this website</p>
          </a>
          <div class='rating js-rating'>
          <h3>rating:</h3>${item.rating}
            <p>${item.desc}</p>
            <button class='js-delete-bookmark' type="submit">Delete Bookmark</button>
            <button class='js-collapse-bookmark' type="submit">See Less</button>
          </div>
        </li>
      </div>
      `;
    } else {
      return `
      <div>
        <li class='js-bookmark-item' data-bookmark-id='${item.id}'>
          <h2>${item.title}</h2>
          <h3>rating:</h3>${item.rating}
          <button class='js-expand-bookmark' type="submit">See More</button>
          </div>
        </li>
      </div>
      `;
    }

  };

  const generateString = function (bookmark) {
    const list = bookmark.map((item) => generateElement(item));
    return list.join('');
  };

  const render = function () {
    console.log('`render` ran!');
    let items = bookmark.items;
    const stringOfBookmarks = generateString(items);
    $('.js-bookmark-list').html(stringOfBookmarks);
  };

  /* Finding ID, Delete, and Updating
      -----------------------------------*/

  const findId = function (id) {
    const items = bookmark.items;
    return items.find(item => item.id === id);
  };

  const getId = function (item) {
    return $(item)
      .closest('.js-bookmark-item')
      .data('bookmark-id');
  };

  const findAndDelete = function (id) {
    bookmark.items = bookmark.items.filter(item => item.id !== id);
  };



  /* Event Listeners
      -----------------------------------*/

  const eventListeners = function () {
    newBookmark();
    deleteBookmark();
    seeMoreButton();
    seeLessButton();
    filterBy();
  };

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
      api.createItem(newTitle, newURL, newDesc, newRating, (newBookmark) => {
        console.log('New item created');
        bookmark.add(newBookmark);
        render();
      });
    });
  };

  const deleteBookmark = function () {
    $('.js-bookmark-list').on('click', '.js-delete-bookmark', event => {
      console.log(event.currentTarget);
      const id = bookmark.getId(event.currentTarget);
      console.log('id is: ' + id);
      api.deleteItem(id, () => {
        bookmark.findAndDelete(id);
        bookmark.render();
      });
    });
  };

  const seeMoreButton = function () {
    $('.js-bookmark-list').on('click', '.js-expand-bookmark', event => {
      console.log(event.currentTarget);
      const id = bookmark.getId(event.currentTarget);
      console.log('id is: ' + id);
      const foundItem = findId(id);
      console.log('foundItem is', foundItem);
      foundItem.detailedView = true;
      bookmark.render();
    });
  };

  const seeLessButton = function () {
    $('.js-bookmark-list').on('click', '.js-collapse-bookmark', event => {
      console.log(event.currentTarget);
      const id = bookmark.getId(event.currentTarget);
      console.log('id is: ' + id);
      const foundItem = findId(id);
      console.log('foundItem is', foundItem);
      foundItem.detailedView = false;
      bookmark.render();
    });
  };

  const filterBy = function () {
    $('select.rating-choice').change(function () {
      var selectedRating = $('.rating-choice option:selected').val();
      console.log(selectedRating);
    });
  };

  return {
    create,
    add,
    generateElement,
    generateString,
    findId,
    findAndDelete,
    getId,

    render,
    eventListeners,

    items: [],
    showForm: false,
    minimumRating: null,
  };

}());

// Tests below, need to delete those soon.

// const testItem = bookmark.create('123', 'google', 'google.com', 'fav seach engine');
// console.log(testItem);
// bookmark.add(testItem);
// console.log(bookmark.items);
// const generatedBookmarks = bookmark.generateString(bookmark.items);
// console.log(generatedBookmarks);
// bookmark.render();