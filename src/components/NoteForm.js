import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import uuidv1 from "uuid";
import NotePanel from "./NotePanel";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "5% auto",
    alignItems: "center",
    textAlign: "center"
  },
  paper: {
    width: "50vw",
    margin: "0 auto"
  },
  form: {
    display: "flex",
    flexWrap: "wrap"
  },
  button: {
    background: "linear-gradient(45deg, #7B287D 30%, #7067CF 90%)",
    width: "100px",
    margin: "5px auto"
  }
};

const NoteForm = ({ classes }) => {
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [editing, setEditing] = useState(false);
  const [editingId, setId] = useState(null);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    setNotes(storedNotes);
    return () => {
      localStorage.setItem("notes", JSON.stringify(notes));
    };
  }, []);

  const handleSave = e => {
    e.preventDefault();
    if (noteTitle === "") {
      alert("Your note is missing a title!");
    } else if (noteBody === "") {
      alert("Your note is empty!");
    } else {
      let newNote = { id: uuidv1(), noteTitle, noteBody };
      let notesArr = notes.length === 0 ? [newNote] : [...notes, newNote];
      setNotes(notesArr);
      setNoteTitle("");
      setNoteBody("");
    }
  };

  const handleEditSave = e => {
    e.preventDefault();
    if (noteTitle !== "" && noteBody !== "") {
      let newNotes = notes.map(n => {
        if (n.id === editingId) {
          n.noteTitle = noteTitle;
          n.noteBody = noteBody;
        }
        return n;
      });
      setNotes(newNotes);
      setNoteTitle("");
      setNoteBody("");
      setEditing(false);
      setId(null);
    }
  };

  const editNote = id => {
    setEditing(true);
    setId(id);
    let note = notes.find(n => n.id === id);
    setNoteTitle(note.noteTitle);
    setNoteBody(note.noteBody);
  };

  const handleDelete = id => {
    if (editing) {
      if (id === editingId) {
        setNoteBody("");
        setNoteTitle("");
        setEditing(false);
      }
    }
    const newNoteArr = notes.filter(n => n.id !== id);
    setNotes(newNoteArr);
  };

  return (
    <div className={classes.container}>
      <Typography component="h1" variant="display3">
        Basic Notes App | by Warpfox
      </Typography>
      <br />
      <Typography component="h2" variant="subtitle1">
        The body of each note supports{" "}
        <a
          href="https://www.markdownguide.org/basic-syntax/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Markdown
        </a>
      </Typography>
      <br />
      <Paper className={classes.paper}>
        <form className={classes.form} id="note-form">
          <TextField
            style={{ margin: 8 }}
            fullWidth
            id="noteTitle"
            margin="normal"
            label="Note Title"
            placeholder="Type here to enter a title"
            InputLabelProps={{
              shrink: true
            }}
            onChange={e => setNoteTitle(e.target.value)}
            value={noteTitle}
          />
          <br />
          <TextField
            style={{ margin: 8 }}
            id="note-body"
            margin="none"
            multiline
            rows="4"
            fullWidth
            label="Note Body"
            placeholder="Enter your note here..."
            InputLabelProps={{
              shrink: true
            }}
            onChange={e => setNoteBody(e.target.value)}
            value={noteBody}
          />
          <br />
          {!editing ? (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={e => handleSave(e)}
            >
              Save
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={e => handleEditSave(e)}
            >
              Finish Editing
            </Button>
          )}
        </form>
      </Paper>
      <NotePanel
        noteArray={notes}
        deleteHandler={handleDelete}
        editNote={editNote}
      />
    </div>
  );
};

NoteForm.propTypes = {
  classes: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
  noteTitle: PropTypes.string,
  noteBody: PropTypes.string
};

export default withStyles(styles)(NoteForm);
