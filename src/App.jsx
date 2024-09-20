import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { BrowserRouter, Outlet, Route, Routes, Navigate, Link, useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { TodoContext } from "./contexts/TodoContext";
import AddTodo from "./pages/AddTodo";
import Home from "./pages/Home";
import EditTodo from "./pages/EditTodo";
import Login from "./LoginPage/Login";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';

function Layout() {
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  function logout() {
    setToken(null);
    navigate("/login");
  }

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand as={Link} to="/">Todos</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/add">Add Todo</Nav.Link>
          </Nav>
          <Button onClick={logout}>Logout</Button>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="add" element={<AddTodo />} />
            <Route path="todo/:id" element={<EditTodo />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </TodoContext.Provider>
  );
}
