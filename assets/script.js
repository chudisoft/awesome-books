let counter = 0;
let bookList = [];
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}
const form = document.querySelector('form');
const bookListElement = document.querySelector('#book-list');
const bookStorageName = 'books';
// add book function
function addBook(title, author) {
  counter += 1;
  const book = new Book(title, author);
  const divBook = document.createElement('div');
  if (counter % 2 === 1) { divBook.className = 'book'; } else { divBook.className = 'book bg-white'; }
  const titleHeader = document.createElement('label');
  titleHeader.className = 'title';
  titleHeader.textContent = `"${book.title}" by ${book.author}`;
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.className = 'btn btn-remove';
  removeBtn.book = book; //  store the book object as a property of the remove button
  removeBtn.addEventListener('click', () => {
    bookList = bookList.filter(
      (_book) => _book.title !== book.title || _book.author !== book.author,
    );
    localStorage.setItem(bookStorageName, JSON.stringify(bookList));
    bookListElement.removeChild(divBook);
    // Recolor
    counter = 0;
    bookListElement.childNodes.forEach((element) => {
      counter += 1;
      if (counter % 2 === 1) { element.className = 'book'; } else { element.className = 'book bg-white'; }
    });
  });
  divBook.appendChild(titleHeader);
  divBook.appendChild(removeBtn);
  bookListElement.appendChild(divBook);
}
//  refuctor booklist
function renderBookList() {
  const storedvalue = localStorage.getItem(bookStorageName);
  bookListElement.textContent = '';
  bookList = [];
  if (storedvalue !== null) {
    bookList = JSON.parse(storedvalue);
  }
  bookList.forEach((book) => {
    addBook(book.title, book.author);
  });
}
renderBookList();
//  add an event listener to the form submit button
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.querySelector('#title').value.trim();
  const author = document.querySelector('#author').value.trim();
  if (title !== '' && author !== '') {
    const book = new Book(title, author);
    addBook(title, author);
    bookList.push(book);
    localStorage.setItem(bookStorageName, JSON.stringify(bookList));
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
});
