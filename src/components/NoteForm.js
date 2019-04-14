import { Button, TextField } from "@material-ui/core";
import React, { Component } from "react";

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
    if (title === "" || body === "") {
      alert("Your note is missing a title or body!");
    } else {
      const notesArr = [...this.state.notes, { title, body }];
      this.setState({ notes: notesArr });
      this.setState({ noteTitle: "", noteBody: "" });
      document.getElementById("note-form").reset();
    }
  };

  render() {
    const { noteTitle, noteBody } = this.state;
    return (
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
          multiline={true}
          label="Note"
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
    );
  }
}

export default NoteForm;
