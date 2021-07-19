import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { FieldValues } from 'react-hook-form';
import { getRule } from '../api/rule';
import { useHistory } from 'react-router-dom';

import { DynamicForm } from './Form';
import { useRule } from '../Contexts/RuleContext';

export const RuleSearch: React.FC = () => {
  const [error, setError] = useState();
  const { setRuleBook } = useRule();
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

  const SearchButton = () => (
    <Button variant="outlined" type="submit">
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
        submitButton={SearchButton}
      />
    </>
  );
};
