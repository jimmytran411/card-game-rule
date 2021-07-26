import React, { useState } from "react";
import { Button, CircularProgress, Grid, makeStyles, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useHistory, useRouteMatch } from "react-router-dom";
import qs from "qs";

import { useRuleSearch } from "../Contexts/RuleSearchContext";

const useStyles = makeStyles({
  searchField: {},
  searchButton: {
    marginTop: "0.5rem",
  },
});

export const RuleSearch: React.FC = () => {
  const { url } = useRouteMatch();
  const { push: historyPush } = useHistory();
  const { control, handleSubmit } = useForm();
  const [disableOnSubmit, setDisable] = useState(false);

  const { handleSearch } = useRuleSearch();
  const { searchField, searchButton } = useStyles();

  const onSubmit = ({ rule }: FieldValues) => {
    setDisable(true);
    const qsString = qs.stringify({ rule });
    historyPush(`${url}/search?${qsString}`);
    handleSearch(rule);
    setDisable(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container justifyContent="center" alignContent="center" spacing={1}>
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
    </>
  );
};
