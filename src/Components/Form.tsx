import React from 'react';
import { Controller, ControllerRenderProps, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Grid, TextField } from '@material-ui/core';
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
  onSubmit: SubmitHandler<InputField>;
  submitButton: 'default' | (() => JSX.Element);
}

export const DynamicForm: React.FC<DynamicFormInputProps> = ({ inputFields, onSubmit, submitButton }) => {
  const { control, handleSubmit, setValue } = useForm();

  React.useEffect(() => {
    inputFields.forEach(({ name, initialValue }) => {
      initialValue && setValue(name, initialValue);
    });
  }, [inputFields, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          {/* todo: add disable after clicking */}
          {submitButton === 'default' && (
            <Button variant="outlined" color="primary" type="submit">
              Submit
            </Button>
          )}
          {submitButton !== 'default' && submitButton()}
        </Grid>
      </Grid>
    </form>
  );
};
