import { useContext, useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import { useNavigate } from "react-router-dom";

export default function TodoCard({ todo }) {
    const completed = todo.completed;
    const border = completed ? "success" : "danger";
    const [timer, setTimer] = useState(0);
    const [initialTime, setInitialTime] = useState(0);
    const [timerInterval, setTimerInterval] = useState(null);
    const setTodos = useContext(TodoContext).setTodos;
    const navigate = useNavigate();

    const startTimer = () => {
        if (timerInterval === null && initialTime > 0) {
            setTimer(initialTime);
            const intervalID = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer <= 1) {
                        clearInterval(intervalID);
                        setTimerInterval(null);
                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
            setTimerInterval(intervalID);
        }
    };

    const pauseTimer = () => {
        clearInterval(timerInterval);
        setTimerInterval(null);
    };

    const resetTimer = () => {
        clearInterval(timerInterval);
        setTimerInterval(null);
        setTimer(0);
    };

    const deleteTodo = () => {
        setTodos((prevTodos) =>
            prevTodos.filter((prevTodo) => prevTodo.id !== todo.id)
        );
    };

    const navigateToEdit = () => {
        navigate(`/todo/${todo.id}`);
    };

    useEffect(() => {
        return () => {
            clearInterval(timerInterval);
        };
    }, [timerInterval]);

    return (
        <>
            <Card border={border} className="my-3">
                <Card.Header>{!completed && "Not"} Completed</Card.Header>
                <Card.Body>
                    <Card.Title>{todo.title}</Card.Title>
                    <Card.Text>{todo.description}</Card.Text>
                    <Form.Group className="mb-3">
                        <Form.Label>Set Timer (seconds)</Form.Label>
                        <Form.Control
                            type="number"
                            value={initialTime}
                            onChange={(e) => setInitialTime(Math.max(0, parseInt(e.target.value)))}
                            min="0"
                        />
                    </Form.Group>
                    <p>Timer: {timer} seconds</p>
                    <Button onClick={startTimer} disabled={timerInterval !== null || initialTime <= 0}>
                        <i className="bi bi-play"></i>
                    </Button>
                    <Button onClick={pauseTimer} className="ms-2" disabled={timerInterval === null}>
                        <i className="bi bi-pause-fill"></i>
                    </Button>
                    <Button onClick={resetTimer} className="ms-2">
                        <i className="bi bi-arrow-clockwise"></i>
                    </Button>
                    <Button variant="secondary" onClick={navigateToEdit} className="ms-2">
                        <i className="bi bi-pencil"></i>
                    </Button>
                    <Button variant="danger" onClick={deleteTodo} className="ms-2">
                        <i className="bi bi-trash3"></i>
                    </Button>
                </Card.Body>
            </Card>
        </>
    );
}