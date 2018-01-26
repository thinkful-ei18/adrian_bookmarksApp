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

  /* Event Listeners
  -----------------------------------*/

  const eventListeners = function () {
    newBookmark();
  };

  const newBookmark = function () {
    $('.js-new-bookmark-form').submit(function (event) {
      event.preventDefault();
      console.log('`newBookmark` ran');
      const newTitle = $('.title-bookmark-input').val();
      const newURL = $('.url-bookmark-input').val();
      const newDesc = $('.desc-bookmark-input').val();
      $('.title-bookmark-input').val('');
      $('.url-bookmark-input').val('');
      $('.desc-bookmark-input').val('');
      api.createItem(newTitle, newURL, (newBookmark) => {
        console.log('New item created');
        bookmark.add(newBookmark);
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

// const testItem = bookmark.create('123', 'google', 'google.com', 'fav seach engine');
// console.log(testItem);
// bookmark.add(testItem);
// console.log(bookmark.items);
// const generatedBookmarks = bookmark.generateString(bookmark.items);
// console.log(generatedBookmarks);
// bookmark.render();
