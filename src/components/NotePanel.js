import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreOutlined from "@material-ui/icons/ExpandMoreOutlined";
import marked from "marked";
import PropTypes from "prop-types";
import React from "react";

const NotePanel = ({ noteArray, deleteHandler, editNote }) => {
  const handleDelete = id => {
    deleteHandler(id);
  };

  const handleEdit = id => {
    editNote(id);
  };

  const markdownText = text => {
    let rawMarkup = marked(text, { sanitize: true });
    return { __html: rawMarkup };
  };

  return (
    <div style={{ padding: 30, width: "50vw", margin: "0 auto" }}>
      {noteArray
        ? noteArray.map((n, i) => {
            return (
              <ExpansionPanel key={i} id={n.noteTitle}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreOutlined />}>
                  <Typography variant="title">
                    {i + 1 + ". " + n.noteTitle}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography
                    dangerouslySetInnerHTML={markdownText(n.noteBody)}
                  />
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={() => handleEdit(n.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    onClick={() => handleDelete(n.id)}
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
};

NotePanel.propTypes = {
  noteArray: PropTypes.array.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  editNote: PropTypes.func.isRequired
};

export default NotePanel;
