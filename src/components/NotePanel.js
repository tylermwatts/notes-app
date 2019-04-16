import {
  Button,
  Divider,
  ExpansionPanel,
  ExpansionPanelActions,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography
} from "@material-ui/core";
import { ExpandMoreOutlined } from "@material-ui/icons";
import marked from "marked";
import React from "react";

class NotePanel extends React.Component {
  handleDelete = id => {
    this.props.deleteHandler(id);
  };

  handleEdit = id => {
    this.props.editNote(id);
  };

  markdownText = text => {
    let rawMarkup = marked(text, { sanitize: true });
    return { __html: rawMarkup };
  };

  render() {
    return (
      <div style={{ padding: 30, width: "50vw", margin: "0 auto" }}>
        {this.props.noteArray
          ? this.props.noteArray.map((n, i) => {
              return (
                <ExpansionPanel key={i} id={n.noteTitle}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreOutlined />}>
                    <Typography variant="title">
                      {i + 1 + ". " + n.noteTitle}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography
                      dangerouslySetInnerHTML={this.markdownText(n.noteBody)}
                    />
                  </ExpansionPanelDetails>
                  <Divider />
                  <ExpansionPanelActions>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      onClick={() => this.handleEdit(n.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      onClick={() => this.handleDelete(n.id)}
                    >
                      Delete
                    </Button>
                  </ExpansionPanelActions>
                </ExpansionPanel>
              );
            })
          : null}
      </div>
    );
  }
}

export default NotePanel;
