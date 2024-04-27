import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, updateNoteAction } from "../../actions/notesAction";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";
import { useParams, useNavigate } from "react-router-dom";

function SingleNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading: loadingUpdate, error: errorUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  useEffect(() => {
    const fetching = async () => {
      try {
        const { data } = await axios.get(`/api/notes/${id}`);

        setTitle(data.title);
        setContent(data.content);
        setCategory(data.category);
        setDate(data.updatedAt);
      } catch (error) {
        // Handle error here
      }
    };

    fetching();
  }, [id]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateNoteAction(id, title, content, category));
      if (!title || !content || !category) return;

      resetHandler();
      navigate("/mynotes");
    } catch (error) {
      // Handle error here
    }
  };

  const deleteHandler = async () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await dispatch(deleteNoteAction(id));
        navigate("/mynotes");
      } catch (error) {
        // Handle error here
      }
    }
  };

  return (
    <MainScreen title="Edit Note">
      <Card>
        <Card.Header>Edit your Note</Card.Header>
        <Card.Body>
          {(loadingUpdate || loadingDelete) && <Loading />}
          {errorUpdate && <ErrorMessage variant="danger">{errorUpdate}</ErrorMessage>}
          {errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}

          <Form onSubmit={updateHandler}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loadingUpdate && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Note
            </Button>
            <Button className="mx-2" variant="danger" onClick={deleteHandler}>
              Delete Note
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date && date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleNote;
