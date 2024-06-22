import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { statePrices } from '../../store/selectors';
import {
  Controller,
  // FieldError,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import ReactSelect from 'react-select';
import { AddItemToEstimate, IOption } from '../../types/addItemToEstimate';
import { onValidateNumberInput } from '../../validators/validatePriceNumberInput';
import { addItemToEstimateOnCreation } from '../../store/Estimate/estimateSlice';

export const EstimateItemForm: FC = () => {
  const prices = useAppSelector(statePrices);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<AddItemToEstimate>({ mode: 'onChange' });

  const options: IOption[] = prices.prices.map((el) => {
    return { label: el.title, value: el.id };
  });


 
  const getValue = (value: string) =>
    value ? options.find((option) => option.value === value) : '';

  const onSubmit: SubmitHandler<AddItemToEstimate> = (data) => {
    console.log(data);
    const cost = prices.prices.find((el) => {
      return el.id === data.name;
    });
    console.log(cost);
    if (cost) {
      dispatch(
        addItemToEstimateOnCreation({
          estimateItem: { id: data.name, count: data.count },
          cost: cost.price,
        })
      );
      reset();
    }
  };

  return (
    <div className="mx-auto">
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center items-center">
            <Controller
              control={control}
              name="name"
              rules={{ required: 'Услуга не выбрана' }}
              render={({ field: { onChange, value } }) => {
                return (
                  <ReactSelect 
                  
                  className={
                    (errors && errors.count?.type === 'required') ||
                    (errors && errors.count?.type === 'validate')
                      ? ' w-full rounded-md   text-gray-900 shadow-sm ring-1 ring-inset ring-red-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-red-400 sm:text-sm sm:leading-6 '
                      : ' w-full rounded-md    text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:border-red-400   sm:text-sm sm:leading-6 '
                  }
                    placeholder={'Prices'}
                    options={options}
                    value={getValue(value)}
                    onChange={(newValue) =>
                      onChange((newValue as IOption).value)
                    }
                  />
                );
              }}
            />

            <input
              {...register('count', {
                required: 'Укажите кол-во',
                validate: {
                  validate: (value) =>
                    onValidateNumberInput(value, 'Недопустимое значение'),
                },
              })}
              type="number"
              className={
                (errors && errors.count?.type === 'required') ||
                (errors && errors.count?.type === 'validate')
                  ? 'block w-16 rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-red-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 mr-2 p-1'
                  : 'block w-16 rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6 mr-2 p-1'
              }
            />

            <button className=" rounded-md px-1 bg-green-300 h-full">
              Сохранить
            </button>
          </div>
          {errors && errors.name && (
            <p className="text-red-600">{errors.name?.message}</p>
          )}
          {errors && errors.count && (
            <p className="text-red-600">{errors.count?.message}</p>
          )}
        </form>
      </div>
    </div>
  );
};
