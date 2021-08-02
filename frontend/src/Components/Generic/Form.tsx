import React, { useState } from "react";
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormStateReturn,
} from "react-hook-form";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import { v4 as uuidV4 } from "uuid";
import _ from "lodash";

interface InputField {
  label: string;
  isRequired: boolean;
  helperText?: string;
  type: string;
  name: string;
  renderField?: ({
    field,
    fieldState,
    formState,
  }: {
    field: ControllerRenderProps<FieldValues, string>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<FieldValues>;
  }) => JSX.Element;
  initialValue?: string;
  inputFieldClassName?: string;
  fullWidth?: boolean;
}

interface DynamicFormInputProps {
  inputFields: InputField[];
  onSubmit: SubmitHandler<FieldValues>;
  submitButton: "default" | ((disableOnSubmit: boolean) => JSX.Element);
  formClassName?: string;
}

export const DynamicForm: React.FC<DynamicFormInputProps> = ({
  inputFields,
  onSubmit,
  submitButton,
  formClassName,
}) => {
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
    <form onSubmit={handleSubmit(submit)} className={formClassName}>
      {inputFields.map(
        ({
          name,
          label,
          isRequired,
          helperText,
          type,
          renderField,
          inputFieldClassName,
          fullWidth,
        }) => {
          return (
            <React.Fragment key={uuidV4()}>
              {renderField ? (
                <Controller
                  name={name}
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState, formState }) =>
                    renderField({ field, fieldState, formState })
                  }
                />
              ) : (
                <Controller
                  name={name}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      className={inputFieldClassName}
                      label={_.capitalize(label)}
                      variant="outlined"
                      type={type}
                      required={isRequired}
                      helperText={helperText}
                      fullWidth={fullWidth}
                      {...field}
                    />
                  )}
                />
              )}
            </React.Fragment>
          );
        }
      )}
      {submitButton === "default" && (
        <Button
          disabled={disableOnSubmit}
          variant="outlined"
          color="primary"
          type="submit"
        >
          {disableOnSubmit ? <CircularProgress /> : "Submit"}
        </Button>
      )}
      {submitButton !== "default" && submitButton(disableOnSubmit)}
    </form>
  );
};
