import React, { useState } from 'react';
import { Controller, ControllerRenderProps, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Button, CircularProgress, Grid, TextField } from '@material-ui/core';
import { v4 as uuidV4 } from 'uuid';
import _ from 'lodash';

interface InputField {
  label: string;
  isRequired: boolean;
  error?: boolean;
  errorText?: string;
  helperText?: string;
  type: string;
  name: string;
  renderField?: (field: ControllerRenderProps<FieldValues, string>) => JSX.Element;
  initialValue?: string;
}

interface DynamicFormInputProps {
  inputFields: InputField[];
  onSubmit: SubmitHandler<FieldValues>;
  submitButton: 'default' | ((disableOnSubmit: boolean) => JSX.Element);
}

export const DynamicForm: React.FC<DynamicFormInputProps> = ({ inputFields, onSubmit, submitButton }) => {
  const { control, handleSubmit, setValue } = useForm();
  const [disableOnSubmit, setDisable] = useState(false);

  const submit = (fields: FieldValues) => {
    setDisable(true);
    onSubmit(fields);
  };

  React.useEffect(() => {
    inputFields.forEach(({ name, initialValue }) => {
      initialValue && setValue(name, initialValue);
    });
  }, [inputFields, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Grid container direction="column" justifyContent="center" alignContent="center" spacing={3}>
        {inputFields.map(({ name, label, isRequired, error, errorText, helperText, type, renderField }) => {
          return (
            <Grid key={uuidV4()} item xs>
              {renderField ? (
                <Controller name={name} control={control} defaultValue="" render={({ field }) => renderField(field)} />
              ) : (
                <Controller
                  name={name}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      label={_.capitalize(label)}
                      variant="outlined"
                      type={type}
                      required={isRequired}
                      helperText={error ? errorText : helperText}
                      {...field}
                    />
                  )}
                />
              )}
            </Grid>
          );
        })}
        <Grid item xs>
          {submitButton === 'default' && (
            <Button disabled={disableOnSubmit} variant="outlined" color="primary" type="submit">
              {disableOnSubmit ? <CircularProgress /> : 'Submit'}
            </Button>
          )}
          {submitButton !== 'default' && submitButton(disableOnSubmit)}
        </Grid>
      </Grid>
    </form>
  );
};
