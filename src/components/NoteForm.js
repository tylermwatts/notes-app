import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import NotePanel from "./NotePanel";

const styles = {
  paper: {
    width: "50vw",
    margin: "0 auto"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  saveButton: {
    width: "100px",
    margin: "5px auto"
  },
  saveEditButton: {
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
    editingIndex: null
  };

  componentDidMount() {
    this.getLocalStorage();
    window.addEventListener("beforeunload", this.saveToStorage.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.saveToStorage.bind(this));
    this.saveToStorage();
  }

  getLocalStorage = () => {
    let notes = localStorage.getItem("notes") || [];
    notes = JSON.parse(notes);
    this.setState({ notes });
  };

  saveToStorage = () => {
    localStorage.setItem("notes", JSON.stringify(this.state.notes));
  };

  editNote = index => {
    this.setState({ editing: true, editingIndex: index });
    const { notes } = this.state;
    this.setState({
      noteTitle: notes[index].title,
      noteBody: notes[index].body
    });
  };

  handleChange = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  handleSave = (e, title, body) => {
    e.preventDefault();
    if (title === "" || body === "") {
      alert("Your note is missing a title or body!");
    } else {
      let notesArr =
        this.state.notes.length === 0
          ? [{ title, body }]
          : [...this.state.notes, { title, body }];
      this.setState({ notes: notesArr, noteTitle: "", noteBody: "" });
      document.getElementById("note-form").reset();
    }
  };

  handleEditSave = (e, title, body) => {
    e.preventDefault();
    let { notes, editingIndex } = this.state;
    if (title !== "" && body !== "") {
      notes[editingIndex] = { title, body };
      this.setState({
        notes: notes,
        noteTitle: "",
        noteBody: "",
        editing: false,
        editingIndex: null
      });
      document.getElementById("note-form").reset();
    }
  };

  handleDelete = i => {
    if (this.state.editing) {
      if (i === this.state.editingIndex) {
        this.setState({ noteBody: "", noteTitle: "", editing: false });
      }
    }
    const newNoteArr = this.state.notes.filter((ele, index, arr) => {
      return index !== i;
    });
    this.setState({ notes: newNoteArr });
  };

  render() {
    const { notes, noteTitle, noteBody } = this.state;
    const { classes } = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "5% auto",
          alignItems: "center"
        }}
      >
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
          <form className={classes.container} id="note-form">
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
                className={classes.saveButton}
                onClick={e => this.handleSave(e, noteTitle, noteBody)}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                className={classes.saveEditButton}
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

export default withStyles(styles)(NoteForm);
