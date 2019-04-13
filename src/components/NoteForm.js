import { Button, TextField } from "@material-ui/core";
import React, { Component } from "react";

class NoteForm extends Component {
  state = {
    noteTitle: "",
    noteBody: ""
  };

  handleChange = (e, field) => {
    e.preventDefault();
    this.setState({ [field]: e.target.value });
  };

  handleSave = (e, title, body) => {
    e.preventDefault();
    console.log({ title, body });
  };

  render() {
    const { noteTitle, noteBody } = this.state;
    return (
      <form>
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
