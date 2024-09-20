import { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  function login(e) {
    e.preventDefault();

    const isCorrectUsername = username === 'jiahao@gmail.com';
    const isCorrectPassword = password === '1234';

    if (isCorrectUsername && isCorrectPassword) {
      authContext.setToken('1234');
      navigate('/');
    } else {
      setErrorMessage('Invalid email or password');
    }
  }

  return (
    <Container>
      <h1 className="my-3">Login to your account</h1>
      <Form onSubmit={login}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="email"
            placeholder="name@example.com"
          />
          <Form.Text id="passwordHelpBlock" muted>
            We never share email with anyone else
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
}
