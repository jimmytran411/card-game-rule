import React from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
  InputAdornment,
  makeStyles,
  TextField,
  withStyles,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import qs from "qs";

import { useRuleSearch } from "../Contexts/RuleSearchContext";
import { scrollToTop } from "../utils/scroll";

const CssTextField = withStyles({
  root: {
    "& label": {
      color: "white",
    },
    "& label.Mui-focused": {
      color: "#6ae7fd",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#6ae7fd",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#6ae7fd",
      },
      color: "white",
    },
  },
})(TextField);

const useStyles = makeStyles({
  searchField: {},
  form: {
    display: "flex",
    padding: "10px 0px",
  },
  searchIcon: {
    color: "white",
  },
});

export const RuleSearch: React.FC = () => {
  const { push: historyPush } = useHistory();
  const { control, handleSubmit } = useForm();

  const { handleSearch } = useRuleSearch();
  const { searchField, form, searchIcon } = useStyles();

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
              <CssTextField
                label="Rule Search"
                className={searchField}
                variant="outlined"
                type="text"
                fullWidth
                autoComplete={undefined}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon className={searchIcon} />
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
