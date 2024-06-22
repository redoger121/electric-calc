import { FC } from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addPrice } from '../../store/thunks/AddDeletePriceItem';
import { statePrices } from '../../store/selectors';
import { v4 as uuidv4 } from 'uuid';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AddPriceFormFields } from '../../types/addPriceFormFields';
import { onTitleAlreadyExist } from '../../validators/validatePriceTitleInput';
import { onValidateNumberInput } from '../../validators/validatePriceNumberInput';

type Props = {
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddPrice: FC<Props> = ({ setAdd }) => {
  const { prices } = useAppSelector(statePrices);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddPriceFormFields>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<AddPriceFormFields> = (data) => {
    console.log(data);
    dispatch(
      addPrice([
        ...prices,
        { id: uuidv4(), title: data.name, price: data.price },
      ])
    );
    setAdd(false);
  };
  return (
    <form
      className="flex mb-2 items-start justify-around"
      onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full">
        <div className="flex items-center">
          <input
            {...register('name', {
              required: 'Введите название услуги',
              validate: {
                alreadyExist: (value) => onTitleAlreadyExist(value, prices),
              },
            })}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mr-2 p-1"
            placeholder="Название услуги"
          />

          <input
            {...register('price', {
              required: 'Укажите цену',
              validate: {
                alreadyExist: (value) =>
                  onValidateNumberInput(value, 'Введите коректуню цену'),
              },
            })}
            type="number"
            className="block w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1"
            placeholder="Цена"
          />

          <button type="submit">
            <FaRegCheckCircle className="w-7 h-7 fill-green-600 ml-2" />
          </button>
        </div>
        {errors?.name && (
          <div className="text-center" style={{ color: 'red' }}>
            {errors.name.message}
          </div>
        )}
        {errors?.price && (
          <div className="text-center" style={{ color: 'red' }}>
            {errors.price.message}
          </div>
        )}
      </div>
    </form>
  );
};
