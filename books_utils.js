const fs = require("fs");
let books;
const fileName = "books.json";

function saveBooks() {
  const jsonBooks = JSON.stringify(books);
  fs.writeFileSync(fileName, jsonBooks);
}

function readBooks() {
  if (fs.existsSync(fileName)) {
    const jsonBooks = fs.readFileSync(fileName, "utf8");
    try {
      books = JSON.parse(jsonBooks);
    } catch (err) {
      books = [];
      console.error(err);
    }
  } else {
    books = [];
  }
}

function addBook(name, author, pages) {
  result = books.find((book) => {
    return book.name === name;
  });
  if (result == undefined) {
    // -- this book is not exist so add it
    const book = { name, author, pages };
    books.push(book);
    saveBooks();
    console.log("book was added");
  } else {
    // -- this book is allready exist
    console.error("book allready exist , no book is added");
  }
}

function getAllBooks() {
  console.log(books);
}

function searchBook(name) {
  result = books.find((book) => {
    return book.name === name;
  });
  if (result == undefined) {
    console.log("book not found");
  } else {
    console.log("book found");
  }
}

function deleteBook(name) {
  const index = books.findIndex((book) => {
    return book.name === name;
  });
  if (index == -1) {
    console.error("book not found");
  } else {
    books.splice(index, 1);
    saveBooks();
    console.log("book deleted");
  }
}

const updateBook = (name, author, pages) => {
  let bookFound = books.find((book) => {
    return book.name === name;
  });
  if (bookFound == undefined) {
    console.error("book not found");
  } else {
    bookFound.author = author;
    bookFound.pages = pages;
    saveBooks();
    console.log("book updated");
  }
};

module.exports = {
  updateBook,
  deleteBook,
  searchBook,
  getAllBooks,
  addBook,
  readBooks,
};
