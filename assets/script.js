let counter = 0;
let bookList = [];
const form = document.querySelector("form");
const bookListElement = document.querySelector("#book-list");
const bookStorageName = "booklist";
const currentDate = document.querySelector(".date");
setInterval(() => {
  currentDate.innerHTML = new Date();
}, 1000);

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.newBookList = [];
  }

  saveData() {
    this.newBookList = [];
    bookList.forEach((book) => {
      this.newBookList.push({ title: book.title, author: book.author });
    });
    localStorage.setItem(bookStorageName, JSON.stringify(this.newBookList));
  }

  addBook() {
    counter += 1;
    const divBook = document.createElement("div");
    if (counter % 2 === 1) {
      divBook.className = "book";
    } else {
      divBook.className = "book bg-white";
    }
    const titleHeader = document.createElement("label");
    titleHeader.className = "title";
    titleHeader.textContent = `"${this.title}" by ${this.author}`;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "btn btn-remove";
    removeBtn.book = this; //  store the book object as a property of the remove button
    removeBtn.addEventListener("click", () => {
      this.removeBook();
    });
    divBook.appendChild(titleHeader);
    divBook.appendChild(removeBtn);
    bookListElement.appendChild(divBook);
  }

  removeBook() {
    const index = bookList.indexOf(this);
    bookList = bookList.filter((_book) => _book !== this);
    this.saveData();
    bookListElement.removeChild(bookListElement.childNodes[index]);
    // Recolor
    counter = 0;
    bookListElement.childNodes.forEach((element) => {
      counter += 1;
      if (counter % 2 === 1) {
        element.className = "book";
      } else {
        element.className = "book bg-white";
      }
    });
  }

  renderBookList() {
    const storedvalue = localStorage.getItem(bookStorageName);
    bookListElement.textContent = "";
    bookList = [];
    if (storedvalue !== null) {
      this.newBookList = JSON.parse(storedvalue);
      this.newBookList.forEach((book) => {
        bookList.push(new Book(book.title, book.author));
      });
    }
    bookList.forEach((book) => {
      book.addBook();
    });
  }
}

new Book("", "").renderBookList();

//  add an event listener to the form submit button
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.querySelector("#title").value.trim();
  const author = document.querySelector("#author").value.trim();
  if (title !== "" && author !== "") {
    const book = new Book(title, author);
    book.addBook();
    bookList.push(book);
    book.saveData();
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
  }
});
