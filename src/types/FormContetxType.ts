import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { AddPriceFormFields } from './addPriceFormFields';

export type FormContextType = {
  register: UseFormRegister<AddPriceFormFields> | null;
  errors: FieldErrors<AddPriceFormFields> | null;
};
