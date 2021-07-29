import {
  makeStyles,
  createStyles,
  Grid,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  Hidden
} from "@material-ui/core";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@material-ui/icons";
import LastPageIcon from "@material-ui/icons/LastPage";
import FirstPageIcon from "@material-ui/icons/FirstPage";

import { UsePagination } from "../../customHooks/usePagination";
import { scrollToTop } from "../../utils/scroll";

const useStyles1 = makeStyles(() =>
  createStyles({
    root: {
      flexShrink: 1,
      marginLeft: "1rem",
    },
    select: {
      border: "1px solid #dedede",
      padding: "4px 5px",
      borderRadius: 8,
    }

  })
);


interface PaginationProps extends UsePagination {
  count: number;
}

export const Pagination = ({
  count,
  page,
  itemsPerPage,
  handleChangePage,
  handleChangeItemsPerPage,
}: PaginationProps): JSX.Element => {
  const { root, select } = useStyles1();
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    scrollToTop()
    handleChangePage(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    scrollToTop()
    handleChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    scrollToTop()
    handleChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    scrollToTop()
    handleChangePage(event, Math.max(0, Math.ceil(count / itemsPerPage) - 1));
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" className={root}>
      <Grid item xs container alignItems="center" justifyContent="center" spacing={4}>
        <Grid item>
          <Typography variant="subtitle1">Rows per Page: </Typography>
        </Grid>
        <Grid item>
          <select className={select} onChange={(event) => handleChangeItemsPerPage(event)}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
          </select>
        </Grid>
      </Grid>

      <Grid item xs={largeScreen && 8} container alignItems="center" justifyContent="center">
        <Hidden xsUp>
          <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="first page"
          >
            {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
        </Hidden>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        {`${itemsPerPage * (page + 1) > count ? count : itemsPerPage * (page + 1)
          } of ${count}`}
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / itemsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <Hidden xsUp>
          <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / itemsPerPage) - 1}
            aria-label="last page"
          >
            {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>
        </Hidden>
      </Grid>
    </Grid >
  );
};
