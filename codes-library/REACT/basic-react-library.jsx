// App.js or UtilitiesSheet.js

import React, { useState, useEffect, useRef, useContext, createContext, useCallback, useMemo } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import styled from 'styled-components';

// 1. Basic Component
const MyComponent = () => {
  return <div>Hello, World!</div>;
};

// 2. Functional Component with Props
const Greeting = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

// 3. Class Component
class MyClassComponent extends React.Component {
  render() {
    return <div>Class component here!</div>;
  }
}

// 4. State in Functional Component (useState)
const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

// 5. useEffect Hook (Effect on Mount/Unmount)
const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return <p>{seconds} seconds have passed</p>;
};

// 6. useEffect with Dependencies
const FetchData = ({ userId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.example.com/user/${userId}`);
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, [userId]);

  return <div>{data ? <p>{data.name}</p> : <p>Loading...</p>}</div>;
};

// 7. Conditional Rendering
const DisplayMessage = ({ isLoggedIn }) => {
  return isLoggedIn ? <p>Welcome Back!</p> : <p>Please Log In</p>;
};

// 8. Event Handling (onClick, onChange)
const ButtonClick = () => {
  const [message, setMessage] = useState('');

  const handleClick = () => {
    setMessage('Button was clicked!');
  };

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
      <p>{message}</p>
    </div>
  );
};

// 9. Form Handling (useState for Inputs)
const Form = () => {
  const [formData, setFormData] = useState({ username: '', email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

// 10. Handling Arrays (Mapping & List Rendering)
const TodoList = ({ todos }) => {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </ul>
  );
};

// 11. useRef Hook (Access DOM Elements)
const FocusInput = () => {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Focus me" />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
};

// 12. useContext Hook (Context API)
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const ThemedComponent = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
      <p>The current theme is {theme}</p>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Toggle Theme</button>
    </div>
  );
};

// 13. useMemo and useCallback (Optimization)
const ExpensiveComponent = ({ number }) => {
  const computeExpensiveValue = (num) => {
    console.log('Computing...');
    return num * 2;
  };

  const memoizedValue = useMemo(() => computeExpensiveValue(number), [number]);

  return <div>Memoized Value: {memoizedValue}</div>;
};

const CounterOptimized = () => {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(1);

  const increment = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <button onClick={increment}>Increment</button>
      <p>Count: {count}</p>
      <input type="number" value={number} onChange={(e) => setNumber(Number(e.target.value))} />
      <ExpensiveComponent number={number} />
    </div>
  );
};

// 14. Error Boundary (Class Component)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

// 15. React Router (Simple Routing Example)
const Home = () => <h2>Home Page</h2>;
const About = () => <h2>About Page</h2>;

const App = () => (
  <Router>
    <nav>
      <Link to="/">Home</Link> | <Link to="/about">About</Link>
    </nav>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
    </Switch>
  </Router>
);

// 16. Styled Components
const Button = styled.button`
  background-color: #008cba;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: #005f73;
  }
`;

const StyledApp = () => (
  <div>
    <Button>Styled Button</Button>
  </div>
);

export default function UtilitiesSheet() {
  return (
    <div>
      <MyComponent />
      <Greeting name="John" />
      <MyClassComponent />
      <Counter />
      <Timer />
      <FetchData userId="123" />
      <DisplayMessage isLoggedIn={true} />
      <ButtonClick />
      <Form />
      <TodoList todos={['Learn React', 'Build App', 'Deploy']} />
      <FocusInput />
      <ThemeProvider>
        <ThemedComponent />
      </ThemeProvider>
      <CounterOptimized />
      <ErrorBoundary>
        <div>Something that might error</div>
      </ErrorBoundary>
      <App />
      <StyledApp />
    </div>
  );
}
