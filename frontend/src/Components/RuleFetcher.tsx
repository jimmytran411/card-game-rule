import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Typography,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { FieldValues } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { getRule } from "../api/rule";
import { DynamicForm } from "./Generic/Form";
import { useRuleBook } from "../Contexts/RuleBookContext";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 26,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  inputField: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.between("sm", "xl")]: {
      width: "50%",
    },
    marginBottom: 20,
    boxShadow: "0 3px 6px #d8d8d8",
  },

  button: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 4,
    padding: "0 48px",
    lineHeight: 3,
    fontSize: 16,
    color: theme.palette.common.white,
    fontWeight: 600,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
}));

export const RuleFetcher: React.FC = () => {
  const history = useHistory();

  const [error, setError] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  const { setRuleBook } = useRuleBook();
  const { root, form, inputField, button } = useStyles();

  const onSubmit = async (fields: FieldValues) => {
    setDisableBtn(true);
    const isUrl = fields.url.match(/^(ftp|http|https):\/\/[^ "]+$/g);
    if (isUrl) {
      try {
        const { data } = await getRule(fields.url);
        if (data.rules.length) {
          setRuleBook(data);
          history.push("/rules");
        } else {
          setError(
            "The given url does not have correct response format to convert into a Rule Book"
          );
          setDisableBtn(false);
        }
      } catch (error) {
        setError(error.toString());
        setDisableBtn(false);
      }
    } else {
      setError("Invalid Url. Please use url starting with fpt, http, or https");
      setDisableBtn(false);
    }
  };

  const searchButton = () => (
    <Button variant="text" type="submit" className={button}>
      {disableBtn ? <CircularProgress /> : "Get Rule"}
    </Button>
  );

  return (
    <div className={root}>
      {error && (
        <Typography variant="subtitle1" color="secondary" align="center">
          {error}
        </Typography>
      )}
      <DynamicForm
        onSubmit={onSubmit}
        inputFields={[
          {
            name: "url",
            label: "rule url",
            type: "text",
            isRequired: false,
            fullWidth: true,
            inputFieldClassName: inputField,
          },
        ]}
        submitButton={searchButton}
        formClassName={form}
      />
    </div>
  );
};
