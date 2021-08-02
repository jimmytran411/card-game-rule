import React, { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import qs from "qs";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  makeStyles,
  TextField,
} from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SearchIcon from "@material-ui/icons/Search";

import { useRuleSearch } from "../Contexts/RuleSearchContext";
import { scrollToTop } from "../utils/scroll";

const useStyles = makeStyles({
  searchField: {},
  searchButton: {
    marginTop: "0.5rem",
  },
  form: {
    display: "flex",
    padding: "10px 0px",
    width: "64vw",
  },
});

export const RuleSearch: React.FC = () => {
  const { push: historyPush } = useHistory();
  const { control, handleSubmit } = useForm();

  const [disableOnSubmit, setDisable] = useState(false);
  const [open, setOpen] = useState(false);

  const { handleSearch } = useRuleSearch();
  const { searchField, searchButton, form } = useStyles();

  const onSubmit = ({ rule }: FieldValues) => {
    setDisable(true);
    const qsString = qs.stringify({ rule });
    historyPush(`/rules/search?${qsString}`);
    handleSearch(rule);
    setDisable(false);
    setOpen(false);
    scrollToTop();
  };

  const handleCloseSearch = () => {
    setOpen(false);
  };

  const handleOpenSearch = () => {
    setOpen(true);
  };

  return (
    <>
      {!open ? (
        <IconButton onClick={handleOpenSearch}>
          <SearchIcon />
        </IconButton>
      ) : (
        <form className={form} onSubmit={handleSubmit(onSubmit)}>
          <IconButton onClick={handleCloseSearch}>
            <ChevronRightIcon />
          </IconButton>
          <Grid
            container
            justifyContent="center"
            alignContent="center"
            spacing={1}
          >
            <Grid item xs={8}>
              <Controller
                name="rule"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    className={searchField}
                    label="Search for a rule"
                    variant="outlined"
                    type="text"
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={1}>
              <Button
                disabled={disableOnSubmit}
                variant="text"
                color="primary"
                type="submit"
                className={searchButton}
              >
                {disableOnSubmit ? <CircularProgress /> : <SearchIcon />}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </>
  );
};
