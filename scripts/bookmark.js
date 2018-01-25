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
    $('.js-bookmark-list').html(generatedBookmarks);
  };

  return {
    create,
    add,
    generateElement,
    generateString,
    render,

    items: []
  };

}());

const testItem = bookmark.create('123', 'google', 'google.com', 'fav seach engine');
console.log(testItem);
bookmark.add(testItem);
console.log(bookmark.items);
const generatedBookmarks = bookmark.generateString(bookmark.items);
console.log(generatedBookmarks);
bookmark.render();

// const fakeCreator = function (item, callback) {};
// let newItemName = 'test-url!';
// fakeCreator(newItemName, ());


