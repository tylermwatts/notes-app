import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React, { Component } from "react";
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

class NoteForm extends Component {
  state = {
    notes: [],
    noteTitle: "",
    noteBody: "",
    editing: false,
    editingId: null
  };

  componentDidMount() {
    try {
      this.getLocalStorage();
    } catch (err) {
      console.log({ error: err });
    }
    window.addEventListener("beforeunload", this.saveToStorage.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.saveToStorage.bind(this));
    this.saveToStorage();
  }

  getLocalStorage = () => {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    this.setState({ notes });
  };

  saveToStorage = () => {
    localStorage.setItem("notes", JSON.stringify(this.state.notes));
  };

  handleChange = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  handleSave = (e, title, body) => {
    e.preventDefault();
    if (title === "" || body === "") {
      alert("Your note is missing a title or body!");
    } else {
      let newNote = { id: uuidv1(), noteTitle: title, noteBody: body };
      let notesArr =
        this.state.notes.length === 0
          ? [newNote]
          : [...this.state.notes, newNote];
      this.setState({ notes: notesArr, noteTitle: "", noteBody: "" });
    }
  };

  editNote = id => {
    this.setState({ editing: true, editingId: id });
    const { notes } = this.state;
    let note = notes.filter(n => n.id === id);
    this.setState({
      noteTitle: note[0].noteTitle,
      noteBody: note[0].noteBody
    });
  };

  handleEditSave = (e, title, body) => {
    e.preventDefault();
    const { notes, editingId } = this.state;
    if (title !== "" && body !== "") {
      let newNotes = notes.map(n => {
        if (n.id === editingId) {
          n.noteTitle = title;
          n.noteBody = body;
        }
        return n;
      });
      this.setState({
        notes: newNotes,
        noteTitle: "",
        noteBody: "",
        editing: false,
        editingId: null
      });
    }
  };

  handleDelete = id => {
    const { editingId, notes } = this.state;
    if (this.state.editing) {
      if (id === editingId) {
        this.setState({ noteBody: "", noteTitle: "", editing: false });
      }
    }
    const newNoteArr = notes.filter(n => {
      return n.id !== id;
    });
    this.setState({ notes: newNoteArr });
  };

  render() {
    const { notes, noteTitle, noteBody } = this.state;
    const { classes } = this.props;
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
              onChange={e => this.handleChange(e, "noteTitle")}
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
              onChange={e => this.handleChange(e, "noteBody")}
              value={noteBody}
            />
            <br />
            {!this.state.editing ? (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={e => this.handleSave(e, noteTitle, noteBody)}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={e => this.handleEditSave(e, noteTitle, noteBody)}
              >
                Finish Editing
              </Button>
            )}
          </form>
        </Paper>
        <NotePanel
          noteArray={notes}
          deleteHandler={this.handleDelete}
          editNote={this.editNote}
        />
      </div>
    );
  }
}

NoteForm.propTypes = {
  classes: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
  noteTitle: PropTypes.string,
  noteBody: PropTypes.string
};

export default withStyles(styles)(NoteForm);
