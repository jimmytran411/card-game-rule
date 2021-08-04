import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import HistoryIcon from "@material-ui/icons/History";
import WbIncandescentIcon from "@material-ui/icons/WbIncandescent";
import {
  Grid,
  makeStyles,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { v4 } from "uuid";
import { useComponentVisible } from "../../customHooks/useComponentVisible";

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

  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const { option, list, root } = useStyles();

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
      setSearchOptions(
        options.filter(({ url }) => url && url.includes(event.target.value))
      );
    }, 500);
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
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item xs={2}>
                      {recent && <HistoryIcon />}
                      {suggestion && <WbIncandescentIcon />}
                    </Grid>
                    <Grid item xs={10}>
                      {url}
                    </Grid>
                  </Grid>
                </ListItem>
              )}
            </React.Fragment>
          ))}
          {!searchOptions.length && (
            <ListItem>
              <ListItemText primary="No Item found" />
            </ListItem>
          )}
        </List>
      )}
    </div>
  );
}
