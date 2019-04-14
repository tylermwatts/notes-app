import {
  Button,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography
} from "@material-ui/core";
import { ExpandMoreOutlined } from "@material-ui/icons";
import React from "react";

class NotePanel extends React.Component {
  handleDelete = i => {
    this.props.deleteHandler(i);
  };
  render() {
    return (
      <div>
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
                    <Typography>{n.body}</Typography>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => this.handleDelete(i)}
                    >
                      Delete
                    </Button>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              );
            })
          : null}
      </div>
    );
  }
}

export default NotePanel;
