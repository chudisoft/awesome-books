let bookList = [];
const form = document.querySelector('form');
const bookListElement = document.querySelector('#book-list');
const bookStorageName = 'books';
// add book function
function addBook(title, author) {
  const book = { title, author };
  const divBook = document.createElement('div');
  divBook.className = 'book';
  const titleHeader = document.createElement('h5');
  const authorHeader = document.createElement('h5');
  const hr = document.createElement('hr');
  title.className = 'title';
  author.className = 'author';
  titleHeader.textContent = book.title;
  authorHeader.textContent = book.author;
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.book = book; //  store the book object as a property of the remove button
  removeBtn.addEventListener('click', () => {
    bookList = bookList.filter(
      (_book) => _book.title !== book.title || _book.author !== book.author,
    );
    localStorage.setItem(bookStorageName, JSON.stringify(bookList));
    bookListElement.removeChild(divBook);
  });
  divBook.appendChild(titleHeader);
  divBook.appendChild(authorHeader);
  divBook.appendChild(hr);
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
    const book = { title, author };
    addBook(title, author);
    bookList.push(book);
    localStorage.setItem(bookStorageName, JSON.stringify(bookList));
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
});
