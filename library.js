console.log("app is loading");
const fs = require("fs");
const command = process.argv[2];
let books;
const fileName = "books.json";

function saveBooks() {
  const jsonBooks = JSON.stringify(books);
  fs.writeFileSync(fileName, jsonBooks);
}

function readBooks() {
  if (fs.existsSync(fileName)) {
    const jsonBooks = fs.readFileSync(fileName, "utf8");
    books = JSON.parse(jsonBooks);
  } else {
    books = [];
  }
}

readBooks();

let name, result, author, pages;

switch (command) {
  case "add":
    // name , author , pages
    // todo check if book exist
    // assume input is valid
    name = process.argv[3];
    author = process.argv[4];
    pages = Number(process.argv[5]);

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

    break;

  case "getAll":
    console.log(books);
    break;

  case "search":
    name = process.argv[3];
    result = books.find((book) => {
      return book.name === name;
    });
    if (result == undefined) {
      console.log("book not found");
    } else {
      console.log("book found");
    }
    break;

  case "delete":
    name = process.argv[3];
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
    break;

  case "update":
    // name , author , pages
    // assume input is valid
    name = process.argv[3];
    author = process.argv[4];
    pages = Number(process.argv[5]);
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

    break;

  default:
    console.error(`command is not supported : ${command}`);
    break;
}
