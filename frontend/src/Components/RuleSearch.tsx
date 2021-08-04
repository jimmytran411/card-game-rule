import React from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import qs from "qs";
import { InputAdornment, makeStyles, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import { useRuleSearch } from "../Contexts/RuleSearchContext";
import { scrollToTop } from "../utils/scroll";

const useStyles = makeStyles({
  searchField: {},
  form: {
    display: "flex",
    padding: "10px 0px",
  },
});

export const RuleSearch: React.FC = () => {
  const { push: historyPush } = useHistory();
  const { control, handleSubmit } = useForm();

  const { handleSearch } = useRuleSearch();
  const { searchField, form } = useStyles();

  const onSubmit = ({ rule }: FieldValues) => {
    const qsString = qs.stringify({ rule });
    historyPush(`/rules/search?${qsString}`);
    handleSearch(rule);
    scrollToTop();
  };

  return (
    <>
      <form className={form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="rule"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <>
              <TextField
                label="Rule Search"
                className={searchField}
                variant="outlined"
                type="text"
                fullWidth
                autoComplete={undefined}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                {...field}
              />
            </>
          )}
        />
      </form>
    </>
  );
};
