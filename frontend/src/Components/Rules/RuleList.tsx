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
import { Pagination } from "./Pagination";
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
      flexDirection: "column",
      height: "100vh",
      overflow: "auto",
    },
    ruleTitle: {
      paddingLeft: "2rem",
      borderBottom: "1px solid #0000003d",
      minHeight: "10%",
      "& div": {
        "& span": {
          fontSize: "2.125rem",
        },
      },
    },
    ruleContent: {
      flexGrow: 1,
    },
  })
);

export const RuleList: React.FC<RuleListProps> = ({
  ruleList,
  ruleChapter,
  chapters,
}) => {
  const { root, ruleTitle, ruleContent } = useStyles();
  const { page, itemsPerPage, handleChangeItemsPerPage, handleChangePage } =
    usePagination();

  return (
    <Card className={root} component={Paper}>
      <CardHeader className={ruleTitle} title={ruleChapter} />
      <CardContent className={ruleContent}>
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
