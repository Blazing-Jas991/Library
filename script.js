const listing = document.querySelector("ul");
const body = document.querySelector('body');

const addButton = document.createElement('button');
addButton.textContent = "Click To Add A Book";
document.body.appendChild(addButton);

const bookForm = document.createElement('form');
bookForm.setAttribute('method', 'post');

const titleLabel = document.createElement('label');
titleLabel.htmlFor = 'title';
titleLabel.textContent = "Title";

const titleInput = document.createElement('input');
titleInput.type = "text";
titleInput.id = 'title';
titleInput.name = 'book_title';

const authorLabel = document.createElement('label');
authorLabel.htmlFor = 'author';
authorLabel.textContent = "Author";

const authorInput = document.createElement('input');
authorInput.type = "text";
authorInput.id = 'author';
authorInput.name = 'author';

const descriptionLabel = document.createElement('label');
descriptionLabel.htmlFor = 'description';
descriptionLabel.textContent = "Description";

const descriptionInput = document.createElement('input');
descriptionInput.type = "text";
descriptionInput.id = 'description';
descriptionInput.name = 'description';

const pagesLabel = document.createElement('label');
pagesLabel.htmlFor = 'pages';
pagesLabel.textContent = "Number of Pages";

const pagesInput = document.createElement('input');
pagesInput.type = "number";
pagesInput.id = 'pages';
pagesInput.name = 'number_of_pages';

const submitBtn = document.createElement('button');
submitBtn.textContent = "Add Book";

const myLibrary = [];

// Book constructor responsible for the book object creation
// function Book(title, author, description, pages) {
//     this.title = title;
//     this.id = crypto.randomUUID();
//     this.author = author;
//     this.description = description;
//     this.pages = pages;
// };

class Book {
    constructor(title, author, description, pages) {
        this.title = title;
        this.id = crypto.randomUUID();
        this.author = author;
        this.description = description;
        this.pages = pages;
    }
}

// This function calls the book constructor, creates a new book with the details/arguments given, and add the book to the array(myLibrary)
function addBookToLibrary(title, author, description, pages) {
    let newBook = new Book(title, author, description, pages); // create new book with the arguments given
    newBook.read = false; // add read status to the book object
    myLibrary.push(newBook); // add book to myLibrary
    console.log(myLibrary);
};

// This function checks the array(myLibrary), identifies each item and prints each item as a new list.
function displayBooks(library) {
    listing.textContent = ''; // clear the list each time, so that whatever is printed is the updated list
    for(const book of library) {
        let bookList = document.createElement('li');
        bookList.dataset.id = book.id; // link DOM element to book object with a data-attribute
        bookList.textContent = `Book title: ${book.title}, Written by: ${book.author}, Talks about: ${book.description}, and has about ${book.pages} pages.`;

        // Read/Unread toggle button
        // if button is showing 'read' when clicked, change to 'unread' and vice versa.
        const readBtn = document.createElement('button');
        readBtn.textContent = book.read ? 'Read' : 'Unread'; 
        readBtn.addEventListener('click', () => {
            book.read = !book.read;
            readBtn.textContent = book.read ? 'Read' : 'Unread';
        });

        // Remove button
        // when the remove button is clicked, delete the book from the list, and delete the book object.
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => {
            const index = myLibrary.findIndex(b => b.id === book.id);
            myLibrary.splice(index, 1);
            bookList.remove();
        });

        bookList.appendChild(readBtn);
        bookList.appendChild(removeBtn);
        listing.appendChild(bookList);
    };
};

// when the 'click to add a book' button is pressed, bring out the form to fill in the details of the new book that you wish to add.
addButton.addEventListener('click', () => {
    bookForm.appendChild(titleLabel);
    bookForm.appendChild(titleInput);
    bookForm.appendChild(authorLabel);
    bookForm.appendChild(authorInput);
    bookForm.appendChild(descriptionLabel);
    bookForm.appendChild(descriptionInput);
    bookForm.appendChild(pagesLabel);
    bookForm.appendChild(pagesInput);
    body.appendChild(bookForm);
    body.appendChild(submitBtn);

    bookForm.style.display = 'block';
    submitBtn.style.display = 'block';
});

// when the 'add book' button' is pressed, create a new book object with the details given, add it to 'myLibrary' and display it in an updated list.
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let title1 = titleInput.value;
    let author1 = authorInput.value;
    let description1 = descriptionInput.value;
    let page1 = pagesInput.value;
    addBookToLibrary(title1, author1, description1, page1);
    displayBooks(myLibrary);
    bookForm.reset();
    bookForm.style.display = 'none';
    submitBtn.style.display = 'none';
});