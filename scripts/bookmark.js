'use strict';

const bookmark = (function () {

  /* Create, Add, Generate Items
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
            <p>Visit This Website</p>
          </a>
          <div class='rating js-rating'>
          <p>Rating: ${item.rating}</p>
          </div>
            <p class='bookmark-desc'>${item.desc}</p>
            <button class='js-collapse-bookmark' type="submit">See Less</button>
            <button class='js-delete-bookmark' type="submit">Delete</button>


        </li>
      </div>
      `;
    } else {
      return `
      <div>
        <li class='js-bookmark-item' data-bookmark-id='${item.id}'>
          <h2>${item.title}</h2>
          <p>Rating: ${item.rating}</p>
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

  /* Finding Bookmarks by ID, Deleting, and Updating
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

  return {
    create,
    add,
    generateElement,
    generateString,
    findId,
    findAndDelete,
    getId,

    items: [],
    showForm: false,
    minimumRating: null,
  };

}());