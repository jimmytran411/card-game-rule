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
  },
  headerCell: {
    padding: "20px 0px 20px 20px",
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

export type HeaderProps = {
  keys: { key: string; gridSize: GridSize }[];
  onRequestSort: (sortParam: string) => void;
  orderBy: string;
  order: "desc" | "asc";
};

export const Header: React.FC<HeaderProps> = ({
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
      spacing={0}
      alignItems="center"
      justifyContent="center"
    >
      {keys.map(({ key, gridSize }) => (
        <React.Fragment key={uuidV4()}>
          <Grid className={headerCell} item xs={gridSize}>
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
