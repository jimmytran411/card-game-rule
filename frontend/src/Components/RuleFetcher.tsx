import React, { useState } from "react";
import { Button, CircularProgress, Typography } from "@material-ui/core";
import { FieldValues } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { getRule } from "../api/rule";
import { DynamicForm } from "./Generic/Form";
import { useRuleBook } from "../Contexts/RuleBookContext";

export const RuleFetcher: React.FC = () => {
  const [error, setError] = useState('');
  const [disableBtn, setDisableBtn] = useState(false)
  const { setRuleBook } = useRuleBook();
  const history = useHistory();

  const onSubmit = async (fields: FieldValues) => {
    setDisableBtn(true)
    const isUrl = fields.url.match(/^(ftp|http|https):\/\/[^ "]+$/g);
    if (isUrl) {
      try {
        const { data } = await getRule(fields.url);
        if (data.rules.length) {
          setRuleBook(data);
          history.push("/rules");
        } else {
          setError('The given url does not have correct response format to convert into a Rule Book')
          setDisableBtn(false)
        }
      } catch (error) {
        setError(`Error: ${error}`);
      }
    } else {
      setError('Invalid Url. Please use url starting with fpt, http, or https')
      setDisableBtn(false)
    }

  };

  const searchButton = () => (
    <Button variant="outlined" type="submit">
      {disableBtn ? <CircularProgress /> : 'Get Rule'}
    </Button>
  );

  return (
    <>
      {error.length && <Typography variant='subtitle1' color='secondary' align="center">
        {error}
      </Typography>}
      <DynamicForm
        onSubmit={onSubmit}
        inputFields={[
          {
            name: "url",
            label: "rule url",
            type: "text",
            isRequired: false,
            fullWidth: true,
          },
        ]}
        submitButton={searchButton}
      />
    </>
  );
};
