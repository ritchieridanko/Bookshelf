// main variables
const books = [];
const RENDER_EVENT = "render-book";
const SAVED_EVENT = "saved-book";
const STORAGE_KEY = "BOOKSHELF_IO";

// form elements
const bookTitleInput = document.getElementById("title");
const authorsNameInput = document.getElementById("author");
const publicationYearInput = document.getElementById("year");
const finishedReadingInput = document.getElementById("isComplete");
const formData = document.getElementById("form");

// finished bookshelf elements
const finishedBookshelf = document.getElementById("finished-bookshelf");
const emptyFinishedBookshelf = document.getElementById(
  "empty-finished-bookshelf"
);
const finishedEditBtn = document.getElementById("finished-bookshelf-edit-btn");
const finishedMoveBtn = document.getElementById("finished-bookshelf-move-btn");
const finishedClearBtn = document.getElementById(
  "finished-bookshelf-clear-btn"
);
const finishedDeleteBtn = document.getElementById(
  "finished-bookshelf-delete-btn"
);
const finishedBookID = document.getElementById("finished-book-info-id");
const finishedBookTitle = document.getElementById("finished-book-info-title");
const finishedBookAuthor = document.getElementById("finished-book-info-author");
const finishedBookYear = document.getElementById("finished-book-info-year");

// unfinished bookshelf elements
const unfinishedBookshelf = document.getElementById("unfinished-bookshelf");
const emptyUnfinishedBookshelf = document.getElementById(
  "empty-unfinished-bookshelf"
);
const unfinishedEditBtn = document.getElementById(
  "unfinished-bookshelf-edit-btn"
);
const unfinishedMoveBtn = document.getElementById(
  "unfinished-bookshelf-move-btn"
);
const unfinishedClearBtn = document.getElementById(
  "unfinished-bookshelf-clear-btn"
);
const unfinishedDeleteBtn = document.getElementById(
  "unfinished-bookshelf-delete-btn"
);
const unfinishedBookID = document.getElementById("unfinished-book-info-id");
const unfinishedBookTitle = document.getElementById(
  "unfinished-book-info-title"
);
const unfinishedBookAuthor = document.getElementById(
  "unfinished-book-info-author"
);
const unfinishedBookYear = document.getElementById("unfinished-book-info-year");

// search bookshelf elements
const searchBar = document.getElementById("search-bar");
const clearSearchBarBtn = document.getElementById("clear-search-bar-btn");
const searchBookshelf = document.getElementById("search-bookshelf");
const emptySearchBookshelf = document.getElementById("empty-search-bookshelf");
const notFoundBookshelf = document.getElementById("not-found-bookshelf");
const searchEditBtn = document.getElementById("search-bookshelf-edit-btn");
const searchMoveBtn = document.getElementById("search-bookshelf-move-btn");
const searchClearBtn = document.getElementById("search-bookshelf-clear-btn");
const searchDeleteBtn = document.getElementById("search-bookshelf-delete-btn");
const searchBookID = document.getElementById("search-book-info-id");
const searchBookTitle = document.getElementById("search-book-info-title");
const searchBookAuthor = document.getElementById("search-book-info-author");
const searchBookYear = document.getElementById("search-book-info-year");
const searchBookBookshelf = document.getElementById(
  "search-book-info-bookshelf"
);

// modal box with nothing selected
const nothingSelectedModalBox = document.getElementById("nothing-selected");
const nothingSelectedGreenBtnTxt = document.getElementById(
  "nothing-selected-edit-txt"
);
const nothingSelectedPurpleBtnTxt = document.getElementById(
  "nothing-selected-move-txt"
);
const nothingSelectedRedBtnTxt = document.getElementById(
  "nothing-selected-delete-txt"
);
const nothingSelectedCloseBtn = document.getElementById(
  "nothing-selected-close-btn"
);

// modal box with a book selected to edit
const selectedToEditModalBox = document.getElementById("selected-to-edit");
const selectedToEditTxt = document.getElementById("edit-modal-box-title");
const editTitleInput = document.getElementById("edit-title");
const editAuthorInput = document.getElementById("edit-author");
const editYearInput = document.getElementById("edit-year");
const editFinishedBookBtn = document.getElementById("edit-finished-book-btn");
const editUnfinishedBookBtn = document.getElementById(
  "edit-unfinished-book-btn"
);
const editSearchBookBtn = document.getElementById("edit-search-book-btn");
const editCancelBtn = document.getElementById("edit-cancel-btn");

// modal box with a book selected to move
const selectedToMoveModalBox = document.getElementById("selected-to-move");
const selectedToMoveTxt = document.getElementById("selected-to-move-txt");
const moveToFinishedConfirmBtn = document.getElementById(
  "move-to-finished-confirm-btn"
);
const moveToUnfinishedConfirmBtn = document.getElementById(
  "move-to-unfinished-confirm-btn"
);
const moveToOppositeConfirmBtn = document.getElementById(
  "move-to-opposite-confirm-btn"
);
const moveCancelBtn = document.getElementById("move-cancel-btn");

// modal box with a book selected to delete
const selectedToDeleteModalBox = document.getElementById("selected-to-delete");
const selectedToDeleteTxt = document.getElementById("selected-to-delete-txt");
const deleteFromFinishedBtn = document.getElementById(
  "delete-from-finished-btn"
);
const deleteFromUnfinishedBtn = document.getElementById(
  "delete-from-unfinished-btn"
);
const deleteFromSearchBtn = document.getElementById("delete-from-search-btn");
const deleteCancelBtn = document.getElementById("delete-cancel-btn");

// check if browser supports localStorage
const doesStorageExist = () => {
  if (typeof Storage === undefined) {
    alert("Sorry. Your browser does not support localStorage.");
    return false;
  }
  return true;
};

// save updated informations about the books to the localStorage
const saveDataToLocalStorage = () => {
  if (doesStorageExist()) {
    const parsedData = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsedData);

    document.dispatchEvent(new Event(SAVED_EVENT));
  }
};

// load the books data from the localStorage
const loadDataFromLocalStorage = () => {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const book of data) {
      books.push(book);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
};

// generate id for the new book
const generateID = () => {
  return +new Date();
};

// generate book object for the new book
const generateBookObject = (id, title, author, year, isComplete) => {
  return {
    id,
    title,
    author,
    year,
    isComplete,
  };
};

// add a book to the books data
const addBook = () => {
  const generatedBookID = generateID();
  const bookObject = generateBookObject(
    generatedBookID,
    bookTitleInput.value,
    authorsNameInput.value,
    publicationYearInput.value,
    finishedReadingInput.checked
  );
  books.push(bookObject);

  clearForm();
  saveDataToLocalStorage();
  document.dispatchEvent(new Event(RENDER_EVENT));
};

// clear the form input fields
const clearForm = () => {
  bookTitleInput.value = "";
  authorsNameInput.value = "";
  publicationYearInput.value = "";
  finishedReadingInput.checked = false;
};

// update a book's information
const editBook = (id, title, author, year) => {
  const indexToEdit = books.findIndex((book) => book.id == id);
  if (indexToEdit !== -1) {
    books[indexToEdit].title = title;
    books[indexToEdit].author = author;
    books[indexToEdit].year = year;
  }

  saveDataToLocalStorage();
};

// move a book to the other bookshelf
const moveBook = (id) => {
  for (const book of books) {
    if (book.id == id) {
      book.isComplete = !book.isComplete;
    }
  }

  saveDataToLocalStorage();
};

// delete a book from the books data
const deleteBook = (id) => {
  const indexToDelete = books.findIndex((book) => book.id == id);
  if (indexToDelete !== -1) {
    books.splice(indexToDelete, 1);
  }

  saveDataToLocalStorage();
};

// create a book element
const createBook = (book, forSearchSection = false) => {
  const newBook = document.createElement("div");
  newBook.classList.add("book");

  const bookImage = document.createElement("div");
  bookImage.classList.add("book-image");

  const imageSource = document.createElement("img");
  imageSource.setAttribute("src", "./assets/book-img.png");
  imageSource.setAttribute("alt", "Book Icon");

  bookImage.appendChild(imageSource);

  const bookTitle = document.createElement("div");
  bookTitle.classList.add("book-title");

  const bookTitleText = document.createElement("p");
  bookTitleText.innerHTML = book.title;

  bookTitle.appendChild(bookTitleText);

  newBook.appendChild(bookImage);
  newBook.appendChild(bookTitle);
  newBook.setAttribute("id", book.id);

  newBook.addEventListener("click", () => {
    displayBook(book, forSearchSection);
  });

  return newBook;
};

// display the full information of the book
const displayBook = (book, forSearchSection) => {
  if (forSearchSection) {
    const whichBookshelf = book.isComplete
      ? "Finished Bookshelf"
      : "Unfinished Bookshelf";

    searchBookID.innerHTML = book.id;
    searchBookID.style.textAlign = "left";
    searchBookTitle.innerHTML = book.title;
    searchBookTitle.style.textAlign = "left";
    searchBookAuthor.innerHTML = book.author;
    searchBookAuthor.style.textAlign = "left";
    searchBookYear.innerHTML = book.year;
    searchBookYear.style.textAlign = "left";
    searchBookBookshelf.innerHTML = whichBookshelf;
    searchBookBookshelf.style.textAlign = "left";
  } else if (book.isComplete) {
    finishedBookID.innerHTML = book.id;
    finishedBookID.style.textAlign = "left";
    finishedBookTitle.innerHTML = book.title;
    finishedBookTitle.style.textAlign = "left";
    finishedBookAuthor.innerHTML = book.author;
    finishedBookAuthor.style.textAlign = "left";
    finishedBookYear.innerHTML = book.year;
    finishedBookYear.style.textAlign = "left";
  } else {
    unfinishedBookID.innerHTML = book.id;
    unfinishedBookID.style.textAlign = "left";
    unfinishedBookTitle.innerHTML = book.title;
    unfinishedBookTitle.style.textAlign = "left";
    unfinishedBookAuthor.innerHTML = book.author;
    unfinishedBookAuthor.style.textAlign = "left";
    unfinishedBookYear.innerHTML = book.year;
    unfinishedBookYear.style.textAlign = "left";
  }
};

// stop displaying the information of the book
const undisplayBook = (finished, forSearchSection = false) => {
  if (forSearchSection) {
    searchBookID.innerHTML = "<i>(select a book)</i>";
    searchBookID.style.textAlign = "center";
    searchBookTitle.innerHTML = "<i>(select a book)</i>";
    searchBookTitle.style.textAlign = "center";
    searchBookAuthor.innerHTML = "<i>(select a book)</i>";
    searchBookAuthor.style.textAlign = "center";
    searchBookYear.innerHTML = "<i>(select a book)</i>";
    searchBookYear.style.textAlign = "center";
    searchBookBookshelf.innerHTML = "<i>(select a book)</i>";
    searchBookBookshelf.style.textAlign = "center";
  } else if (finished) {
    finishedBookID.innerHTML = "<i>(select a book)</i>";
    finishedBookID.style.textAlign = "center";
    finishedBookTitle.innerHTML = "<i>(select a book)</i>";
    finishedBookTitle.style.textAlign = "center";
    finishedBookAuthor.innerHTML = "<i>(select a book)</i>";
    finishedBookAuthor.style.textAlign = "center";
    finishedBookYear.innerHTML = "<i>(select a book)</i>";
    finishedBookYear.style.textAlign = "center";
  } else {
    unfinishedBookID.innerHTML = "<i>(select a book)</i>";
    unfinishedBookID.style.textAlign = "center";
    unfinishedBookTitle.innerHTML = "<i>(select a book)</i>";
    unfinishedBookTitle.style.textAlign = "center";
    unfinishedBookAuthor.innerHTML = "<i>(select a book)</i>";
    unfinishedBookAuthor.style.textAlign = "center";
    unfinishedBookYear.innerHTML = "<i>(select a book)</i>";
    unfinishedBookYear.style.textAlign = "center";
  }
};

// handle search event during element focus
const handleChange = (event) => {
  const searchTerm = event.target.value.toLowerCase();
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm)
  );

  if (event.target.value === "") {
    emptySearchBookshelf.style.display = "flex";
    searchBookshelf.style.display = "none";
    notFoundBookshelf.style.display = "none";
  } else if (filteredBooks.length === 0) {
    emptySearchBookshelf.style.display = "none";
    searchBookshelf.style.display = "none";
    notFoundBookshelf.style.display = "flex";

    notFoundBookshelf.innerHTML = `No book titles contain the word <span class="not-found-search-term">${searchTerm}</span>`;
  } else {
    emptySearchBookshelf.style.display = "none";
    notFoundBookshelf.style.display = "none";
    searchBookshelf.style.display = "flex";
    searchBookshelf.innerHTML = "";

    for (const book of filteredBooks) {
      const newBook = createBook(book, true);
      searchBookshelf.appendChild(newBook);
    }
  }
};

// handle search event during element blur
const handleBlurChange = (event) => {
  handleChange(event);
};

// edit a book from the finished bookshelf
finishedEditBtn.addEventListener("click", () => {
  const clickedBookTitle = finishedBookTitle.innerHTML;
  const clickedBookAuthor = finishedBookAuthor.innerHTML;
  const clickedBookYear = finishedBookYear.innerHTML;

  if (clickedBookTitle === "<i>(select a book)</i>") {
    nothingSelectedModalBox.style.display = "flex";
    nothingSelectedGreenBtnTxt.style.display = "flex";
    nothingSelectedPurpleBtnTxt.style.display = "none";
    nothingSelectedRedBtnTxt.style.display = "none";
  } else {
    selectedToEditModalBox.style.display = "flex";
    selectedToEditTxt.innerHTML = `Edit The Book: <i>${clickedBookTitle}</i>`;
    editTitleInput.value = clickedBookTitle;
    editAuthorInput.value = clickedBookAuthor;
    editYearInput.value = clickedBookYear;
    editFinishedBookBtn.style.display = "flex";
    editUnfinishedBookBtn.style.display = "none";
    editSearchBookBtn.style.display = "none";
  }
});

// move a book from the finished bookshelf to the unfinished bookshelf
finishedMoveBtn.addEventListener("click", () => {
  const clickedBook = finishedBookTitle.innerHTML;

  if (clickedBook === "<i>(select a book)</i>") {
    nothingSelectedModalBox.style.display = "flex";
    nothingSelectedGreenBtnTxt.style.display = "none";
    nothingSelectedPurpleBtnTxt.style.display = "flex";
    nothingSelectedRedBtnTxt.style.display = "none";
  } else {
    selectedToMoveModalBox.style.display = "flex";
    moveToUnfinishedConfirmBtn.style.display = "flex";
    moveToFinishedConfirmBtn.style.display = "none";
    moveToOppositeConfirmBtn.style.display = "none";

    selectedToMoveTxt.innerHTML = `Are you sure you want to move <b>${clickedBook}</b> to the unfinished bookshelf?`;
  }
});

// clear a book's information from the finished bookshelf's infopage
finishedClearBtn.addEventListener("click", () => {
  undisplayBook(true);
});

// delete a book from the finished bookshelf
finishedDeleteBtn.addEventListener("click", () => {
  const clickedBook = finishedBookTitle.innerHTML;

  if (clickedBook === "<i>(select a book)</i>") {
    nothingSelectedModalBox.style.display = "flex";
    nothingSelectedGreenBtnTxt.style.display = "none";
    nothingSelectedPurpleBtnTxt.style.display = "none";
    nothingSelectedRedBtnTxt.style.display = "flex";
  } else {
    selectedToDeleteModalBox.style.display = "flex";
    deleteFromFinishedBtn.style.display = "flex";
    deleteFromUnfinishedBtn.style.display = "none";
    deleteFromSearchBtn.style.display = "none";

    selectedToDeleteTxt.innerHTML = `Are you sure you want to delete <b>${clickedBook}</b>?`;
  }
});

// edit a book from the unfinished bookshelf
unfinishedEditBtn.addEventListener("click", () => {
  const clickedBookTitle = unfinishedBookTitle.innerHTML;
  const clickedBookAuthor = unfinishedBookAuthor.innerHTML;
  const clickedBookYear = unfinishedBookYear.innerHTML;

  if (clickedBookTitle === "<i>(select a book)</i>") {
    nothingSelectedModalBox.style.display = "flex";
    nothingSelectedGreenBtnTxt.style.display = "flex";
    nothingSelectedPurpleBtnTxt.style.display = "none";
    nothingSelectedRedBtnTxt.style.display = "none";
  } else {
    selectedToEditModalBox.style.display = "flex";
    selectedToEditTxt.innerHTML = `Edit The Book: <i>${clickedBookTitle}</i>`;
    editTitleInput.value = clickedBookTitle;
    editAuthorInput.value = clickedBookAuthor;
    editYearInput.value = clickedBookYear;
    editFinishedBookBtn.style.display = "none";
    editUnfinishedBookBtn.style.display = "flex";
    editSearchBookBtn.style.display = "none";
  }
});

// move a book from the unfinished bookshelf to the finished bookshelf
unfinishedMoveBtn.addEventListener("click", () => {
  const clickedBook = unfinishedBookTitle.innerHTML;

  if (clickedBook === "<i>(select a book)</i>") {
    nothingSelectedModalBox.style.display = "flex";
    nothingSelectedGreenBtnTxt.style.display = "none";
    nothingSelectedPurpleBtnTxt.style.display = "flex";
    nothingSelectedRedBtnTxt.style.display = "none";
  } else {
    selectedToMoveModalBox.style.display = "flex";
    moveToUnfinishedConfirmBtn.style.display = "none";
    moveToFinishedConfirmBtn.style.display = "flex";
    moveToOppositeConfirmBtn.style.display = "none";

    selectedToMoveTxt.innerHTML = `Are you sure you want to move <b>${clickedBook}</b> to the finished bookshelf?`;
  }
});

// clear a book's information from the unfinished bookshelf's infopage
unfinishedClearBtn.addEventListener("click", () => {
  undisplayBook(false);
});

// delete a book from the unfinished bookshelf
unfinishedDeleteBtn.addEventListener("click", () => {
  const clickedBook = unfinishedBookTitle.innerHTML;

  if (clickedBook === "<i>(select a book)</i>") {
    nothingSelectedModalBox.style.display = "flex";
    nothingSelectedGreenBtnTxt.style.display = "none";
    nothingSelectedPurpleBtnTxt.style.display = "none";
    nothingSelectedRedBtnTxt.style.display = "flex";
  } else {
    selectedToDeleteModalBox.style.display = "flex";
    deleteFromFinishedBtn.style.display = "none";
    deleteFromUnfinishedBtn.style.display = "flex";
    deleteFromSearchBtn.style.display = "none";

    selectedToDeleteTxt.innerHTML = `Are you sure you want to delete <b>${clickedBook}</b>?`;
  }
});

// search for books from the books data
searchBar.addEventListener("input", handleChange);
searchBar.addEventListener("blur", handleBlurChange);

// clear the search bar
clearSearchBarBtn.addEventListener("click", () => {
  searchBar.value = "";
  emptySearchBookshelf.style.display = "flex";
  searchBookshelf.style.display = "none";
  notFoundBookshelf.style.display = "none";

  searchClearBtn.click();
});

// edit a book from the search bookshelf
searchEditBtn.addEventListener("click", () => {
  const clickedBookTitle = searchBookTitle.innerHTML;
  const clickedBookAuthor = searchBookAuthor.innerHTML;
  const clickedBookYear = searchBookYear.innerHTML;

  if (clickedBookTitle === "<i>(select a book)</i>") {
    nothingSelectedModalBox.style.display = "flex";
    nothingSelectedGreenBtnTxt.style.display = "flex";
    nothingSelectedPurpleBtnTxt.style.display = "none";
    nothingSelectedRedBtnTxt.style.display = "none";
  } else {
    selectedToEditModalBox.style.display = "flex";
    selectedToEditTxt.innerHTML = `Edit The Book: <i>${clickedBookTitle}</i>`;
    editTitleInput.value = clickedBookTitle;
    editAuthorInput.value = clickedBookAuthor;
    editYearInput.value = clickedBookYear;
    editFinishedBookBtn.style.display = "none";
    editUnfinishedBookBtn.style.display = "none";
    editSearchBookBtn.style.display = "flex";
  }
});

// move a book to the other bookshelf
searchMoveBtn.addEventListener("click", () => {
  const clickedBookTitle = searchBookTitle.innerHTML;
  const clickedBookshelf = searchBookBookshelf.innerHTML;

  if (clickedBookTitle === "<i>(select a book)</i>") {
    nothingSelectedModalBox.style.display = "flex";
    nothingSelectedGreenBtnTxt.style.display = "none";
    nothingSelectedPurpleBtnTxt.style.display = "flex";
    nothingSelectedRedBtnTxt.style.display = "none";
  } else {
    selectedToMoveModalBox.style.display = "flex";

    if (clickedBookshelf === "Unfinished Bookshelf") {
      moveToUnfinishedConfirmBtn.style.display = "none";
      moveToFinishedConfirmBtn.style.display = "none";
      moveToOppositeConfirmBtn.style.display = "flex";
      selectedToMoveTxt.innerHTML = `Are you sure you want to move <b>${clickedBookTitle}</b> to the Finished Bookshelf?`;
    } else {
      moveToUnfinishedConfirmBtn.style.display = "none";
      moveToFinishedConfirmBtn.style.display = "none";
      moveToOppositeConfirmBtn.style.display = "flex";
      selectedToMoveTxt.innerHTML = `Are you sure you want to move <b>${clickedBookTitle}</b> to the Unfinished Bookshelf?`;
    }
  }
});

// clear a book's information from the search bookshelf's infopage
searchClearBtn.addEventListener("click", () => {
  undisplayBook(false, true);
});

// delete a book from the search bookshelf
searchDeleteBtn.addEventListener("click", () => {
  const clickedBook = searchBookTitle.innerHTML;

  if (clickedBook === "<i>(select a book)</i>") {
    nothingSelectedModalBox.style.display = "flex";
    nothingSelectedGreenBtnTxt.style.display = "none";
    nothingSelectedPurpleBtnTxt.style.display = "none";
    nothingSelectedRedBtnTxt.style.display = "flex";
  } else {
    selectedToDeleteModalBox.style.display = "flex";
    deleteFromFinishedBtn.style.display = "none";
    deleteFromUnfinishedBtn.style.display = "none";
    deleteFromSearchBtn.style.display = "flex";

    selectedToDeleteTxt.innerHTML = `Are you sure you want to delete <b>${clickedBook}</b>?`;
  }
});

// hide the nothing selected modal box
nothingSelectedCloseBtn.addEventListener("click", () => {
  nothingSelectedModalBox.style.display = "none";
});

// click to confirm editing a book from the finished bookshelf
editFinishedBookBtn.addEventListener("click", () => {
  const clickedBook = finishedBookID.innerHTML;
  editBook(
    clickedBook,
    editTitleInput.value,
    editAuthorInput.value,
    editYearInput.value
  );

  selectedToEditModalBox.style.display = "none";
  finishedClearBtn.click();
  document.dispatchEvent(new Event(RENDER_EVENT));
});

// click to confirm editing a book from the unfinished bookshelf
editUnfinishedBookBtn.addEventListener("click", () => {
  const clickedBook = unfinishedBookID.innerHTML;
  editBook(
    clickedBook,
    editTitleInput.value,
    editAuthorInput.value,
    editYearInput.value
  );

  selectedToEditModalBox.style.display = "none";
  unfinishedClearBtn.click();
  document.dispatchEvent(new Event(RENDER_EVENT));
});

// click to confirm editing a book from the search bookshelf
editSearchBookBtn.addEventListener("click", () => {
  const clickedBook = searchBookID.innerHTML;
  editBook(
    clickedBook,
    editTitleInput.value,
    editAuthorInput.value,
    editYearInput.value
  );

  selectedToEditModalBox.style.display = "none";
  searchClearBtn.click();
  document.dispatchEvent(new Event(RENDER_EVENT));
});

// hide the edit modal box
editCancelBtn.addEventListener("click", () => {
  selectedToEditModalBox.style.display = "none";
});

// click to confirm moving a book to the finished bookshelf
moveToFinishedConfirmBtn.addEventListener("click", () => {
  const clickedBook = unfinishedBookID.innerHTML;
  moveBook(clickedBook);

  selectedToMoveModalBox.style.display = "none";
  unfinishedClearBtn.click();
  document.dispatchEvent(new Event(RENDER_EVENT));
});

// click to confirm moving a book to the unfinished bookshelf
moveToUnfinishedConfirmBtn.addEventListener("click", () => {
  const clickedBook = finishedBookID.innerHTML;
  moveBook(clickedBook);

  selectedToMoveModalBox.style.display = "none";
  finishedClearBtn.click();
  document.dispatchEvent(new Event(RENDER_EVENT));
});

// click to confirm moving a book from the other bookshelf
moveToOppositeConfirmBtn.addEventListener("click", () => {
  const clickedBook = searchBookID.innerHTML;
  moveBook(clickedBook);

  selectedToMoveModalBox.style.display = "none";
  searchClearBtn.click();
  document.dispatchEvent(new Event(RENDER_EVENT));
});

// hide the move modal box
moveCancelBtn.addEventListener("click", () => {
  selectedToMoveModalBox.style.display = "none";
});

// click to confirm deleting a book from the finished bookshelf
deleteFromFinishedBtn.addEventListener("click", () => {
  const clickedBook = finishedBookID.innerHTML;
  deleteBook(clickedBook);

  selectedToDeleteModalBox.style.display = "none";
  finishedClearBtn.click();
  document.dispatchEvent(new Event(RENDER_EVENT));
});

// click to confirm deleting a book from the unfinished bookshelf
deleteFromUnfinishedBtn.addEventListener("click", () => {
  const clickedBook = unfinishedBookID.innerHTML;
  deleteBook(clickedBook);

  selectedToDeleteModalBox.style.display = "none";
  unfinishedClearBtn.click();
  document.dispatchEvent(new Event(RENDER_EVENT));
});

// click to confirm deleting a book from the search bookshelf
deleteFromSearchBtn.addEventListener("click", () => {
  const clickedBook = searchBookID.innerHTML;
  deleteBook(clickedBook);

  selectedToDeleteModalBox.style.display = "none";
  searchClearBtn.click();
  document.dispatchEvent(new Event(RENDER_EVENT));
});

// hide the delete modal box
deleteCancelBtn.addEventListener("click", () => {
  selectedToDeleteModalBox.style.display = "none";
});

// default html page load
document.addEventListener("DOMContentLoaded", () => {
  formData.addEventListener("submit", (event) => {
    event.preventDefault();
    addBook();
  });

  if (doesStorageExist()) {
    loadDataFromLocalStorage();
  }
});

// notify through alert of changes made to books
document.addEventListener(SAVED_EVENT, () => {
  alert("Changes have been made to the books.");
});

// re-render the html page after an event triggered
document.addEventListener(RENDER_EVENT, () => {
  const finishedReadingBooks = books.filter((book) => book.isComplete);
  const unfinishedReadingBooks = books.filter((book) => !book.isComplete);

  if (finishedReadingBooks.length === 0) {
    finishedBookshelf.style.display = "none";
    emptyFinishedBookshelf.style.display = "flex";
  } else {
    emptyFinishedBookshelf.style.display = "none";
    finishedBookshelf.style.display = "flex";
    finishedBookshelf.innerHTML = "";

    for (const finishedReadingBook of finishedReadingBooks) {
      const newBook = createBook(finishedReadingBook);
      finishedBookshelf.appendChild(newBook);
    }
  }

  if (unfinishedReadingBooks.length === 0) {
    unfinishedBookshelf.style.display = "none";
    emptyUnfinishedBookshelf.style.display = "flex";
  } else {
    emptyUnfinishedBookshelf.style.display = "none";
    unfinishedBookshelf.style.display = "flex";
    unfinishedBookshelf.innerHTML = "";

    for (const unfinishedReadingBook of unfinishedReadingBooks) {
      const newBook = createBook(unfinishedReadingBook);
      unfinishedBookshelf.appendChild(newBook);
    }
  }
});
