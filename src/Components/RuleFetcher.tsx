import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { FieldValues } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { getRule } from '../api/rule';
import { DynamicForm } from './Generic/Form';
import { useRuleBook } from '../Contexts/RuleBookContext';

export const RuleFetcher: React.FC = () => {
  const [error, setError] = useState();
  const { setRuleBook } = useRuleBook();
  const history = useHistory();

  const onSubmit = async (fields: FieldValues) => {
    try {
      const { data } = await getRule(fields.url);
      setRuleBook(data);
      history.push('/rules');
    } catch (error) {
      setError(error);
    }
  };

  const searchButton = (disableOnSubmit: boolean) => (
    <Button disabled={disableOnSubmit} variant="outlined" type="submit">
      Search
    </Button>
  );

  return (
    <>
      {error && error}
      <DynamicForm
        onSubmit={onSubmit}
        inputFields={[
          {
            name: 'url',
            label: 'rule url',
            type: 'text',
            isRequired: false,
          },
        ]}
        submitButton={searchButton}
      />
    </>
  );
};
