/* global bookmark, storage, api */

'use strict';

const bookmark =  (function(){

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

    if (!item.detailedView) {
      return `
      <div class='.bookmark-item .js-bookmark-item'>
        <li>
          <h2>${item.title}</h2>
          <a href='http://${item.url}' target="_blank">
            <p>${item.url}</p>
          </a>
          <div class='rating js-rating'>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <p>${item.desc}</p>
            <button class='js-new-bookmark button' type="submit">Delete Bookmark</button>
            <button class='js-new-bookmark button' type="submit">Simple View</button>
          </div>
        </li>
      </div>
      `;
    } else {
      return `
      <div class='.bookmark-item .js-bookmark-item'>
        <li>
          <h2>${item.title}</h2>
          <div class='rating js-rating'>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
          </div>
        </li>
      </div>
      `;
    }

  };

  const generateString = function (bookmarks) {
    const list = bookmarks.map((item) => generateElement(item));
    return list.join('');
  };

  const render = function () {
    const bookmarks = bookmark.items;

    console.log('`render` ran!');
    // const stringOfBookmarks = generateElement(bookmarks);
    $('.js-bookmark-list').html(bookmarks);
  };

  /* Event Listeners
  -----------------------------------*/

  const eventListeners = function () {
    newBookmark();
  };

  const newBookmark = function () {
    $('.js-new-bookmark button').submit(function (event) {
      event.preventDefault();
      console.log('New bookmark created');
      const newTitle = $('.title-bookmark-input').val();
      const newURL = $('.url-bookmark-input').val();
      const newDesc = $('.desc-bookmark-input').val();
      $('.title-bookmark-input').val('');
      $('.url-bookmark-input').val('');
      $('.desc-bookmark-input').val('');
      api.createItem(newTitle, newURL, (newBookmark) => {
        console.log('New item created');
        this.add(newBookmark);
        render();
      });
    });
  };

  return {
    create,
    add,
    generateElement,
    generateString,

    render,
    eventListeners,

    items: [],
    showForm: false,
    minimumRating: null,
  };

}());

// Tests below, need to delete those soon.

const testItem = bookmark.create('123', 'google', 'google.com', 'fav seach engine');
console.log(testItem);
bookmark.add(testItem);
console.log(bookmark.items);
const generatedBookmarks = bookmark.generateString(bookmark.items);
console.log(generatedBookmarks);
bookmark.render();
