import displayActive from "./modules/navigate.js";
import BookShelf from "./modules/books.js";
import { DateTime } from "./modules/luxon.js";

const booksContainer = document.getElementById("books-dynamic-container");
const navMenuItem = document.querySelectorAll(".nav-menu-item");
const addBookForm = document.getElementById("form-add-book");
const titleInput = document.getElementById("title-input");
const author = document.getElementById("author-input");
const dateLocalBox = document.querySelector(".date-local");

const allAddedBooks = new BookShelf();

const insertBooks = () => {
  booksContainer.innerHTML = allAddedBooks.books
    .map(
      (bookItem, index) => `
  <div class="book-item"  ><p class='title-author'><strong>"${bookItem.titleInput}" by ${bookItem.author}.</strong></p>
        <button class='remove-btn' data-idremove="${index}">Remove</button>
        </div>
  `
    )
    .join("");
  if (allAddedBooks.books.length === 0) {
    booksContainer.style.cssText = "border: none;";
  } else {
    booksContainer.style.cssText = "border: 3px black solid;";
  }

  const removeBtns = document.querySelectorAll(".remove-btn");

  removeBtns.forEach((btn) => {
    btn.addEventListener("click", (box) => {
      allAddedBooks.removeBook(box.target.dataset.idremove);
      insertBooks();
    });
  });
};

insertBooks();

const dateFunction = () => {
  dateLocalBox.innerHTML = DateTime.now().toLocaleString(
    DateTime.DATETIME_MED_WITH_SECONDS
  );
};
setInterval(dateFunction, 1000);

addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newBooks = {
    titleInput: titleInput.value,
    author: author.value,
  };
  allAddedBooks.addBook(newBooks);
  titleInput.value = "";
  author.value = "";
  insertBooks();
  displayActive("books-list");
});

navMenuItem.forEach((item) => {
  item.addEventListener("click", () => {
    displayActive(item.dataset.nameitem);
  });
});
