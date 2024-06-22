import { FC, useContext } from 'react';
import { AddPriceFormFields } from '../../types/addPriceFormFields';
import { FormValidateContext } from '../../contexts/formValidateContetx';

type Props = {
  name: keyof AddPriceFormFields;
  type: string;

  valiadateFunc: (value: string | number) => string | undefined;
};

export const Input: FC<Props> = ({ name, type, valiadateFunc }) => {
  const { register, errors } = useContext(FormValidateContext);

  if (!register) return null;
 
  return (
    <div className="w-full">
      <input
        className={
          (errors && errors[name]?.type === 'required') ||
          (errors && errors[name]?.type === 'validate')
            ? 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 mr-2 p-1'
            : 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6 mr-2 p-1'
        }
        type={type}
        {...register(name, {
          required: true,
          validate: {
            validate: (value) => {
              if (type === 'number') {
                return valiadateFunc(+value);
              }
              return valiadateFunc(value);
            },
          },
        })}
      />
      {/* {errors && errors[name]?.type === 'required' && (
        <p className="text-red-600 ">Поле обязательное</p>
      )}
      {errors && errors[name]?.type === 'validate' && (
        <p className="text-red-600">{errors[name]?.message}</p>
      )} */}
    </div>
  );
};
