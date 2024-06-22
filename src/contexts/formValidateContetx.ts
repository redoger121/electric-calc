import { createContext } from 'react';
import { FormContextType } from '../types/FormContetxType';

export const FormValidateContext = createContext<FormContextType>({
  register: null,
  errors: null,
});
