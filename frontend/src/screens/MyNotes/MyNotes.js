import React, { useEffect, useState } from 'react';
import MainScreen from '../../components/MainScreen';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import { deleteNoteAction, listNotes, updateNoteCategoryAction } from '../../actions/notesAction';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const noteList = useSelector((state) => state.noteList);
   const navigate = useNavigate();
  const { loading, notes, error } = noteList || { loading: true, notes: [] };
const [forceUpdate, setForceUpdate] = useState(false);//..
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [openNoteIndex, setOpenNoteIndex] = useState(null);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);

  const toggleNote = (index) => {
    if (openNoteIndex === index) {
      setOpenNoteIndex(null);
    } else {
      setOpenNoteIndex(index);
    }
  };

  const selectNote = (index) => {
    setSelectedNoteIndex(index);
  };

  /*const changeCategory = (newCategory) => {
    if (selectedNoteIndex !== null) {
      const noteId = notes[selectedNoteIndex]._id;
      dispatch(updateNoteCategoryAction(noteId, newCategory)); // Dispatch an action to change the category
      setSelectedNoteIndex(null);
    }
  };*/

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
    setForceUpdate(false); //..
  }, [dispatch, userInfo,forceUpdate]);//..
  const [openItemId, setOpenItemId] = useState(null);
 
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
    setForceUpdate(true);//...
  };
 

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.email}..`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new Note
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      
      {loading && <Loading />}
      
      {notes &&
        notes
          .filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((note) => (
            <Card key={note._id} style={{ margin: "10px 0" }}>
              <Card.Header style={{ display: "flex" }}>
                <span
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 18,
                  }}
                  onClick={() =>
                    setOpenItemId(openItemId === note._id ? null : note._id)
                  }
                >
                  {note.title}
                </span>

                <div>
                  <Button href={`/note/${note._id}`}>Edit</Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteHandler(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>
              {openItemId === note._id && (
                <Card.Body>
                  <h4>
                    <Badge variant="success">Category - {note.category}</Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <ReactMarkdown>{note.content}</ReactMarkdown>
                    <footer className="blockquote-footer">
                      Created on{" "}
                      <cite title="Source Title">
                        {note.createdAt.substring(0, 10)}
                      </cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              )}
            </Card>
          ))}
    </MainScreen>
  );
};

export default MyNotes;
