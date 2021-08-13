import React, { useState } from 'react';
import { Button, CircularProgress, Typography, makeStyles, Theme } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { getRule } from '../../api/rule';
import { useRuleBook } from '../../Contexts/RuleBookContext';
import AutoComplete from './AutoComplete';
import { Controller, FieldValues, useForm } from 'react-hook-form';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 26,
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputField: {
    width: '100%',
    boxShadow: '0 3px 6px #d8d8d8',
  },

  button: {
    backgroundColor: theme.palette.success.main,
    borderRadius: 4,
    padding: '0 48px',
    lineHeight: 3,
    fontSize: 16,
    color: theme.palette.common.white,
    fontWeight: 600,
    '&:hover': {
      backgroundColor: theme.palette.success.light,
    },
    marginTop: 20,
  },
}));

export const RuleFetcher: React.FC = () => {
  const history = useHistory();
  const { control, handleSubmit, setValue } = useForm();

  const [error, setError] = useState('');
  const [disableBtn, setDisableBtn] = useState(false);

  const { setRuleBook } = useRuleBook();
  const { root, form, inputField, button } = useStyles();

  const onSubmit = async (fields: FieldValues) => {
    const { url } = fields;
    setDisableBtn(true);
    const isUrl = url.match(/^(ftp|http|https):\/\/[^ "]+$/g);
    if (isUrl) {
      try {
        const { data } = await getRule(url);
        if (data.rules.length && data.chapters.length) {
          const recent = localStorage.getItem('ruleFetch');
          const urlFromStorage = recent ? recent.split(' -/ ') : [];
          !urlFromStorage.includes(url) &&
            localStorage.setItem('ruleFetch', urlFromStorage.join(' -/ ') + url + ' -/ ');

          setRuleBook(data);
          history.push(`/rules/${data.chapters[0].chapterId}-${data.chapters[0].chapterTitle.replace(/\s|\./g, '-')}`);
        } else {
          setError('The given url does not have correct response format to convert into a Rule Book');
          setDisableBtn(false);
        }
      } catch (error) {
        setError('Invalid Url');
        setDisableBtn(false);
      }
    } else {
      setError('Invalid Url. Please use url starting with fpt, http, or https');
      setDisableBtn(false);
    }
  };

  const searchButton = () => (
    <Button variant="text" type="submit" className={button}>
      {disableBtn ? <CircularProgress /> : 'Get Rule'}
    </Button>
  );

  return (
    <div className={root}>
      {error && (
        <Typography variant="subtitle1" color="secondary" align="center">
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className={form}>
        <Controller
          render={({ ...props }) => (
            <AutoComplete
              inputClassName={inputField}
              value={props.field.value}
              changeValue={(url: string) => setValue('url', url)}
              {...props}
            />
          )}
          defaultValue=""
          name="url"
          control={control}
        />
        {searchButton()}
      </form>
    </div>
  );
};
