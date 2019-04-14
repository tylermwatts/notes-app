import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography
} from "@material-ui/core";
import { ExpandMoreOutlined } from "@material-ui/icons";
import React from "react";

const NotePanel = props => {
  return (
    <div>
      {props.noteArray
        ? props.noteArray.map((n, i) => {
            return (
              <ExpansionPanel key={i} id={n.title}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreOutlined />}>
                  <Typography variant="title">
                    {i + 1 + ". " + n.title}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>{n.body}</Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })
        : null}
    </div>
  );
};

export default NotePanel;
