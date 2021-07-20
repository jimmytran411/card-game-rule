import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { v4 as uuidV4 } from 'uuid';

import { usePagination } from '../customHooks/usePagination';
import { Pagination } from './Generic/Pagination';

interface RuleListProps {
  ruleList: string[];
}
export const RuleList: React.FC<RuleListProps> = ({ ruleList }) => {
  const { page, itemsPerPage, handleChangeItemsPerPage, handleChangePage } = usePagination();

  return (
    <List>
      {!ruleList.length && 'No rule found'}
      {(itemsPerPage > 0 ? ruleList.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage) : ruleList).map(
        (rule) => (
          <ListItem key={uuidV4()}>
            <ListItemText primary={rule} />
          </ListItem>
        )
      )}
      <Pagination
        count={ruleList.length}
        page={page}
        itemsPerPage={itemsPerPage}
        handleChangePage={handleChangePage}
        handleChangeItemsPerPage={handleChangeItemsPerPage}
      />
    </List>
  );
};
