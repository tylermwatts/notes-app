import { Button, TextField } from "@material-ui/core";
import React, { Component } from "react";
import NotePanel from "./NotePanel";

class NoteForm extends Component {
  state = {
    notes: [],
    noteTitle: "",
    noteBody: ""
  };

  handleChange = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  handleSave = (e, title, body) => {
    e.preventDefault();
    if (title === "" || body === "") {
      alert("Your note is missing a title or body!");
    } else {
      const notesArr = [...this.state.notes, { title, body }];
      this.setState({ notes: notesArr });
      this.setState({ noteTitle: "", noteBody: "" });
      document.getElementById("note-form").reset();
    }
  };

  handleDelete = i => {
    const newNoteArr = this.state.notes.filter((ele, index, arr) => {
      return index !== i;
    });
    this.setState({ notes: newNoteArr });
  };

  render() {
    const { notes, noteTitle, noteBody } = this.state;
    return (
      <div>
        <form id="note-form">
          <TextField
            id="note-title"
            margin="normal"
            label="Note Title"
            onChange={e => this.handleChange(e, "noteTitle")}
          />
          <br />
          <TextField
            id="note-body"
            margin="none"
            multiline
            rows="4"
            label="Note Body"
            onChange={e => this.handleChange(e, "noteBody")}
          />
          <br />
          <Button
            color="primary"
            onClick={e => this.handleSave(e, noteTitle, noteBody)}
          >
            Save
          </Button>
        </form>
        <NotePanel noteArray={notes} deleteHandler={this.handleDelete} />
      </div>
    );
  }
}

export default NoteForm;
