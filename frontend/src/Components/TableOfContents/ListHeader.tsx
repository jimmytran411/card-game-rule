import React from "react";
import {
  Grid,
  TableSortLabel,
  makeStyles,
  GridSize,
  Theme,
} from "@material-ui/core";
import { v4 as uuidV4 } from "uuid";
import _ from "lodash";

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    fontWeight: 700,
    backgroundColor: theme.palette.background.paper,
    borderBottom: "1px solid #0000003d",
    padding: 16,
  },
  headerCell: {
    "& span": {
      display: "flex",
      [theme.breakpoints.between("xs", "sm")]: {
        display: "block",
      },
      "& span": {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      },
    },
  },
}));

export type ListHeaderProps = {
  keys: { key: string; gridSize: GridSize; cellClassName?: string }[];
  onRequestSort: (sortParam: string) => void;
  orderBy: string;
  order: "desc" | "asc";
};

export const ListHeader: React.FC<ListHeaderProps> = ({
  keys,
  onRequestSort,
  orderBy,
  order,
}) => {
  const { header, headerCell } = useStyles();

  const createSortHandler = (sortParam: string) => () => {
    onRequestSort(sortParam);
  };

  return (
    <Grid
      className={header}
      container
      alignItems="center"
      justifyContent="center"
    >
      {keys.map(({ key, gridSize, cellClassName }) => (
        <React.Fragment key={uuidV4()}>
          <Grid
            className={
              cellClassName ? `${headerCell} ${cellClassName}` : headerCell
            }
            item
            xs={gridSize}
          >
            <TableSortLabel
              active={orderBy === key}
              direction={orderBy === key ? order : "asc"}
              onClick={createSortHandler(key)}
            >
              <span>{_.capitalize(key)}</span>
            </TableSortLabel>
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
};
