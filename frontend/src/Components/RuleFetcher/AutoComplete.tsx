import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import HistoryIcon from "@material-ui/icons/History";
import WbIncandescentIcon from "@material-ui/icons/WbIncandescent";
import { Grid, makeStyles, List, ListItem } from "@material-ui/core";
import { v4 } from "uuid";

import { useComponentVisible } from "../../customHooks/useComponentVisible";
import Highlighter from "react-highlight-words";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("xl")]: {
      width: "50%",
    },
    width: "70%",
  },
  option: {
    borderBottom: "1px solid #9494943d",
    "& div": {
      "& div": {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        maxWidth: 405,
        [theme.breakpoints.up("xl")]: {
          maxWidth: 750,
        },
      },
    },
  },
  list: {
    backgroundColor: theme.palette.action.hover,
    padding: 0,
  },
  highlight: {
    fontWeight: 700,
    color: "white",
    backgroundColor: theme.palette.text.disabled,
  },
}));

interface Option {
  url: string | undefined;
  recent: boolean;
  suggestion: boolean;
}

interface AutoCompleteProps {
  inputClassName?: string;
  value: any;
  changeValue: any;
}

export default function AutoComplete({
  inputClassName,
  value,
  changeValue,
}: AutoCompleteProps) {
  const [recentUrl, setRecentUrl] = useState<string[] | undefined[]>([""]);
  const [options, setOptions] = useState<Option[]>([]);
  const [searchOptions, setSearchOptions] = useState<Option[]>([]);
  const [ruleParam, setRuleParam] = useState("");

  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const { option, list, root, highlight } = useStyles();

  useEffect(() => {
    const recentInput = localStorage.getItem("ruleFetch");
    recentInput && setRecentUrl(recentInput.split(" -/ "));
  }, []);

  useEffect(() => {
    const suggestion: Option[] = [
      {
        url: process.env.REACT_APP_DEFAULT_RULE_BOOK_URL,
        recent: false,
        suggestion: true,
      },
    ];

    const options: Option[] = suggestion.concat(
      recentUrl.map((recent) => {
        const option: Option = {
          url: recent,
          recent: true,
          suggestion: false,
        };
        return option;
      })
    );
    setOptions(options);
  }, [recentUrl]);

  useEffect(() => {
    setSearchOptions(options);
  }, [options]);

  const onSelect = (url: string) => {
    setIsComponentVisible(false);
    changeValue(url);
  };

  const onChange = (event: any) => {
    changeValue(event.target.value);
    setTimeout(() => {
      setRuleParam(event.target.value);
      setSearchOptions(
        options.filter(
          ({ url }) =>
            url && url.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
    }, 250);
  };

  return (
    <div className={root}>
      <TextField
        variant="outlined"
        label="Rule Url"
        onClick={() => setIsComponentVisible(true)}
        value={value}
        ref={ref}
        className={inputClassName}
        fullWidth
        onChange={onChange}
        placeholder={process.env.REACT_APP_DEFAULT_RULE_BOOK_URL}
      />

      {isComponentVisible && (
        <List ref={ref} className={list}>
          {searchOptions.map(({ url, recent, suggestion }) => (
            <React.Fragment key={v4()}>
              {url && (
                <ListItem
                  className={option}
                  button
                  onClick={() => {
                    onSelect(url);
                  }}
                >
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item xs={1}>
                      {recent && <HistoryIcon />}
                      {suggestion && <WbIncandescentIcon />}
                    </Grid>
                    <Grid item xs={11}>
                      <Highlighter
                        searchWords={[ruleParam]}
                        textToHighlight={url}
                        highlightClassName={highlight}
                      />
                      {url}
                    </Grid>
                  </Grid>
                </ListItem>
              )}
            </React.Fragment>
          ))}
        </List>
      )}
    </div>
  );
}
