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
  handleDelete = i => {
    this.props.deleteHandler(i);
  };

  handleEdit = i => {
    this.props.editNote(i);
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
                <ExpansionPanel key={i} id={n.title}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreOutlined />}>
                    <Typography variant="title">
                      {i + 1 + ". " + n.title}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography
                      dangerouslySetInnerHTML={this.markdownText(n.body)}
                    />
                  </ExpansionPanelDetails>
                  <Divider />
                  <ExpansionPanelActions>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      onClick={() => this.handleEdit(i)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      onClick={() => this.handleDelete(i)}
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
