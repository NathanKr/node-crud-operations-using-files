console.log("app is loading");
const {readBooks,addBook,getAllBooks,searchBook,deleteBook,updateBook}= require('./books_utils');
const command = process.argv[2];
readBooks();

let name, author, pages;
switch (command) {
  case "add":
    // name , author , pages
    // todo check if book exist
    // assume input is valid
    name = process.argv[3];
    author = process.argv[4];
    pages = Number(process.argv[5]);
    addBook(name,author,pages)
    break;

  case "getAll":
    getAllBooks();
    break;

  case "search":
    name = process.argv[3];
    searchBook(name);
    break;

  case "delete":
    name = process.argv[3];
    deleteBook(name);
    break;

  case "update":
    // name , author , pages
    // assume input is valid
    name = process.argv[3];
    author = process.argv[4];
    pages = Number(process.argv[5]);
    updateBook(name, author, pages);
    break;

  default:
    console.error(`command is not supported : ${command}`);
    break;
}

console.log('app finish');