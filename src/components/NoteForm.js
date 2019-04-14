import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import NotePanel from "./NotePanel";

const styles = theme => ({
  paper: {
    width: "50vw",
    margin: "0 auto"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  button: {
    width: "100px",
    margin: "5px auto"
  }
});

class NoteForm extends Component {
  state = {
    notes: [],
    noteTitle: "",
    noteBody: ""
  };

  getLocalStorage = () => {
    let notes = localStorage.getItem("notes");
    notes = JSON.parse(notes);
    this.setState({ notes });
  };

  componentDidMount() {
    this.getLocalStorage();
  }

  handleChange = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  saveToStorage = notes => {
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  handleSave = (e, title, body) => {
    e.preventDefault();
    if (title === "" || body === "") {
      alert("Your note is missing a title or body!");
    } else {
      const notesArr = [...this.state.notes, { title, body }];
      this.setState({ notes: notesArr });
      this.saveToStorage(notesArr);
      this.setState({ noteTitle: "", noteBody: "" });
      document.getElementById("note-form").reset();
    }
  };

  handleDelete = i => {
    const newNoteArr = this.state.notes.filter((ele, index, arr) => {
      return index !== i;
    });
    this.setState({ notes: newNoteArr });
    this.saveToStorage(newNoteArr);
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
        <Paper className={classes.paper}>
          <form className={classes.container} id="note-form">
            <TextField
              style={{ margin: 8 }}
              fullWidth
              id="note-title"
              margin="normal"
              label="Note Title"
              placeholder="Type here to enter a title"
              InputLabelProps={{
                shrink: true
              }}
              onChange={e => this.handleChange(e, "noteTitle")}
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
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={e => this.handleSave(e, noteTitle, noteBody)}
            >
              Save
            </Button>
          </form>
        </Paper>
        <NotePanel noteArray={notes} deleteHandler={this.handleDelete} />
      </div>
    );
  }
}

export default withStyles(styles)(NoteForm);
