import { FC } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';
import { FaEdit, FaRegCheckCircle } from 'react-icons/fa';
import { Price } from '../../types/price';
import { AddPriceFormFields } from '../../types/addPriceFormFields';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormValidateContext } from '../../contexts/formValidateContetx';
import { Input } from '../../components';
import { useAppDispatch } from '../../store/hooks';
import { editPrice } from '../../store/thunks/EditPriceItem';
import { onValidateNumberInput } from '../../validators/validatePriceNumberInput';

type Props = {
  priceItem: Price;
  handleDeletBtnClick: (id: string) => void;
  priceOnEdit: string | null;
  setPriceOnEdit: React.Dispatch<React.SetStateAction<string | null>>;
  onEditPriceTitleValidate: (
    value: string,
    title: string
  ) => string | undefined;
};

export const PriceItem: FC<Props> = ({
  priceItem,
  handleDeletBtnClick,
  setPriceOnEdit,
  priceOnEdit,
  onEditPriceTitleValidate,
}) => {
  const { price, title, id } = priceItem;

  const dispatch = useAppDispatch();

  const onHandleEditBtnClick = () => {
    setPriceOnEdit(id);
    setValue('name', title);
    setValue('price', price);
  };

  const onHandleCancelEditBtnClick = () => {
    if (priceOnEdit === id) {
      setPriceOnEdit(null);
      clearErrors();
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<AddPriceFormFields>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<AddPriceFormFields> = (data) => {
    setPriceOnEdit(null);
    if (data.name !== title || data.price !== price) {
      dispatch(
        editPrice({
          index: 0,
          priceItem: { price: data.price, title: data.name, id },
        })
      );
    }
  };

  const validateFuncWrapper = (value: string | number): string | undefined => {
    if (typeof value === 'string') {
      return onEditPriceTitleValidate(value, title);
    }
    if (typeof value === 'number') {
      return onValidateNumberInput(value, 'Введите коректуню цену');
    }
    return undefined;
  };

  return (
    <tr className="">
      <FormValidateContext.Provider value={{ register, errors }}>
        <td className="text-lg">
          {priceOnEdit === id ? (
            <Input
              name="name"
              type="text"
              valiadateFunc={validateFuncWrapper}
            />
          ) : (
            <p className="capitalize">{title}</p>
          )}
        </td>

        <td className="text-lg  max-w-10">
          {priceOnEdit === id ? (
            <Input
              name="price"
              type="number"
              valiadateFunc={validateFuncWrapper}
            />
          ) : (
            <p>{price}</p>
          )}
        </td>
      </FormValidateContext.Provider>
      <td>
        <div className="flex items-center">
          {priceOnEdit !== id ? (
            <FaEdit
              className="w-5 h-5 fill-yellow-600 cursor-pointer "
              onClick={onHandleEditBtnClick}
            />
          ) : (
            <FaRegCheckCircle
              className="w-5 h-5 fill-green-600 "
              onClick={handleSubmit(onSubmit)}
            />
          )}

          <TiDeleteOutline
            className="w-6 h-6  fill-red-600 cursor-pointer"
            onClick={() => {
              priceOnEdit !== id
                ? handleDeletBtnClick(id)
                : onHandleCancelEditBtnClick();
            }}
          />
        </div>
      </td>
    </tr>
  );
};
