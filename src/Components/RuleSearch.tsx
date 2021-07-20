import React from 'react';
import { Button } from '@material-ui/core';
import { FieldValues } from 'react-hook-form';
import { useHistory, useRouteMatch } from 'react-router-dom';
import qs from 'qs';

import { DynamicForm } from './Generic/Form';
import { useRuleSearch } from '../Contexts/RuleSearchContext';

export const RuleSearch: React.FC = () => {
  const { handleSearch } = useRuleSearch();
  const { url } = useRouteMatch();
  const history = useHistory();

  const onSubmit = ({ rule }: FieldValues) => {
    const qsString = qs.stringify({ rule });
    history.push(`${url}/search?${qsString}`);
    handleSearch(rule);
  };

  const searchButton = () => (
    <Button variant="outlined" type="submit">
      Search
    </Button>
  );

  return (
    <>
      <DynamicForm
        onSubmit={onSubmit}
        inputFields={[
          {
            name: 'rule',
            label: 'rule search',
            type: 'text',
            isRequired: false,
          },
        ]}
        submitButton={searchButton}
      />
    </>
  );
};
