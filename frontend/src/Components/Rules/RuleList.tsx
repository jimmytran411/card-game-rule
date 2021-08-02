import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Paper,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { v4 as uuidV4 } from "uuid";

import { usePagination } from "../../customHooks/usePagination";
import { Pagination } from "../Generic/Pagination";
import { RuleFilter } from "./RuleFilter";

interface RuleListProps {
  ruleList: string[];
  ruleChapter?: string;
  chapters: string[];
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",
      height: "80vh",
      overflow: "auto",
    },
    ruleTitle: {
      alignSelf: "center",
    },
  })
);

export const RuleList: React.FC<RuleListProps> = ({
  ruleList,
  ruleChapter,
  chapters,
}) => {
  const { root, ruleTitle } = useStyles();
  const { page, itemsPerPage, handleChangeItemsPerPage, handleChangePage } =
    usePagination();

  return (
    <Card className={root} component={Paper}>
      <CardHeader className={ruleTitle} title={ruleChapter} />
      <CardContent>
        <List>
          {!ruleList.length && "No rule found"}
          {(itemsPerPage > 0
            ? ruleList.slice(
                page * itemsPerPage,
                page * itemsPerPage + itemsPerPage
              )
            : ruleList
          ).map((rule) => (
            <ListItem key={uuidV4()}>
              <ListItemText>
                <RuleFilter rule={rule} chapters={chapters} />
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions disableSpacing>
        <Pagination
          count={ruleList.length}
          page={page}
          itemsPerPage={itemsPerPage}
          handleChangePage={handleChangePage}
          handleChangeItemsPerPage={handleChangeItemsPerPage}
        />
      </CardActions>
    </Card>
  );
};
