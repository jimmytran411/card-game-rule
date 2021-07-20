import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { v4 as uuidV4 } from 'uuid';

interface RuleListProps {
  ruleList: string[];
}
export const RuleList: React.FC<RuleListProps> = ({ ruleList }) => {
  return (
    <List>
      {ruleList.map((rule) => (
        <ListItem key={uuidV4()}>
          <ListItemText primary={rule} />
        </ListItem>
      ))}
    </List>
  );
};
