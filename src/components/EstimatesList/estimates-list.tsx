import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getEstimates } from '../../store/Estimate/thunks/getEstimates';
import { stateAllEstimates } from '../../store/selectors';
import { EstimateShortInfo } from '../EstimateShortInfo';

export const EstimatesList: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEstimates());
  }, [dispatch]);
  const estimates = useAppSelector(stateAllEstimates);
  if (!estimates) {
    return <div>Вы еще не создали ни одной сметы</div>;
  }
  return (
    <div className="text-center">
      {Object.entries(estimates).map(([key, estimate]) => {
        return <EstimateShortInfo key={key} estimate={estimate} />;
      })}
    </div>
  );
};
