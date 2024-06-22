import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { stateEstimates, statePrices } from '../../store/selectors';
import { EstimateItem } from '../../types/estimate';
import React from 'react';
import { addEstimate } from '../../store/Estimate/thunks/AddEstimate';
import { clearEstimateOnCreation } from '../../store/Estimate/estimateSlice';

export const EstimateItemsList: FC = () => {
  const estimateOnCreation = useAppSelector(stateEstimates);
  const prices = useAppSelector(statePrices);
  const dispatch = useAppDispatch();

  const renderEstimateItem = (item: EstimateItem) => {
    const priceItem = prices.prices.find((el) => {
      return el.id === item.id;
    });

    return (
      <React.Fragment key={item.id}>
        {priceItem && (
          <div>
            {priceItem.title}
            <br />
            {item.count}
            <br />
            {priceItem.price * item.count} Руб
          </div>
        )}
      </React.Fragment>
    );
  };

  const onSaveEstimate = () => {
    dispatch(addEstimate(estimateOnCreation));
    dispatch(clearEstimateOnCreation());
  };

  return (
    <>
      <div className="">
        {estimateOnCreation.items.map((el) => {
          return renderEstimateItem(el);
        })}
      </div>

      <button onClick={onSaveEstimate}>Сохранить</button>
    </>
  );
};
