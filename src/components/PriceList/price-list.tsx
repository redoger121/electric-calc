import { FC, useState } from 'react';
import { PriceItem } from '../PriceItem';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { statePrices } from '../../store/selectors';
import { AddPrice, AddPriceBtn } from '../../components';

import { addPrice } from '../../store/thunks/AddDeletePriceItem';

export const PriceList: FC = () => {
  const [add, setAdd] = useState<boolean>(false);

  const { prices, loading } = useAppSelector(statePrices);

  const [priceOnEdit, setPriceOnEdit] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const handleDeleteBtnClick = (id: string) => {
    dispatch(
      addPrice(
        prices.filter((el) => {
          return el.id !== id;
        })
      )
    );
  };
  const onEditPriceTitleValidate = (value: string, title: string) => {
    const priceAlreadyExist = prices.some((el) => {
      return el.title === value;
    });
    if (priceAlreadyExist && value !== title) {
      return 'уже есть';
    }
  };

  return (
    <div className="mx-auto w-[600px] ">
      {loading && !prices ? (
        <p>Загрузка</p>
      ) : (
        <div className="w-full">
          <div className="flex justify-end">
            <AddPriceBtn add={add} setAdd={setAdd} />
          </div>
          {add && <AddPrice setAdd={setAdd} />}
          <table className="table-auto border-2 rounded-md border-slate-600 w-full pb-1  border-separate border-spacing-x-5">
            <thead>
              <tr>
                <th className=" text-lg text-left border-b-2 border-slate-600">
                  Нименование работ
                </th>
                <th className="text-lg text-left border-b-2 border-slate-600 ">
                  Цена
                </th>
                <th className="border-b-2 border-slate-600"></th>
              </tr>
            </thead>
            <tbody>
              {prices &&
                prices.map((el) => {
                  return (
                    <PriceItem
                      key={el.id}
                      priceItem={el}
                      handleDeletBtnClick={handleDeleteBtnClick}
                      setPriceOnEdit={setPriceOnEdit}
                      priceOnEdit={priceOnEdit}
                      onEditPriceTitleValidate={onEditPriceTitleValidate}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
