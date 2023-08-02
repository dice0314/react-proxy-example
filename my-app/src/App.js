import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import BookTable from './components/BookTable';
import DisplayBoard from './components/DisplayBoard';
import CreateBook from './components/CreateBook';
import { getAllBooks, createBook, getAllTodos, createTodo } from './services/BookService';
import Footer from './components/Footer';
import TodoTable from './components/TodoTable';
import DisplayTodoBoard from './components/DisplayTodoBoard';
import CreateTodo from './components/CreateTodo';

function App () {

  const [bookShelf, setBookShelf] = useState({});
  const [books, setBooks] = useState([]);
  const [numberOfBooks, setNumberBooks] = useState(0);

  const [todoShelf, setTodoShelf] = useState({});
  const [todos, setTodos] = useState([]);
  const [numberOfTodos, setNumberTodos] = useState(0);

  const handleSubmit = () => {
      createBook(bookShelf)
        .then(() => {
          setNumberBooks(numberOfBooks+1);
      });
  }

  const getAllBook = () => {
    getAllBooks()
      .then(data => {
        setBooks(data);
        setNumberBooks(data.length);
      });
  }

  const handleOnChangeForm = (e) => {
      let inputData = bookShelf;
      if (e.target.name === 'book') {
        bookShelf.book = e.target.value;
      } else if (e.target.name === 'category') {
        bookShelf.category = e.target.value;
      } else if (e.target.name === 'author') {
        bookShelf.author = e.target.value;
      }
      setBookShelf(inputData);
  }

  const handleTodoSubmit = () => {
    createTodo(todoShelf)
      .then(() => {
        setNumberTodos(numberOfTodos+1);
    });
}

const getAllTodo = () => {
  getAllTodos()
    .then(data => {
      setTodos(data);
      setNumberTodos(data.length);
      console.log(data)
    });
    
}

const handleOnChangeTodoForm = (e) => {
    let inputData = todoShelf;
    if (e.target.name === 'todo') {
      todoShelf.todo = e.target.value;
    } else if (e.target.name === 'category') {
      todoShelf.category = e.target.value;
    } else if (e.target.name === 'isComplete') {
      todoShelf.isComplete = e.target.value;
    }
    setTodoShelf(inputData);
}

  
  return (
    <div className="main-wrapper">
      <div className="main">
        <Header />
        <div className="wrapper">
          <CreateBook 
            bookShelf={bookShelf}
            onChangeForm={handleOnChangeForm}
            handleSubmit={handleSubmit}
          />
          <CreateTodo
            todoShelf={todoShelf}
            onChangeForm={handleOnChangeTodoForm}
            handleSubmit={handleTodoSubmit}
          />
        </div>
        <div className="wrapper">
          <DisplayBoard 
            numberOfBooks={numberOfBooks} 
            getAllBook={getAllBook} 
          />
          <DisplayTodoBoard
            numberOfTodos={numberOfTodos} 
            getAllTodo={getAllTodo} 
          />
        </div>
        <div className="wrapper">
          <BookTable books={books} />
          <TodoTable todos={todos} />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
