export type FieldError<TField extends string> = {
  field: TField;
  message: string;
};
