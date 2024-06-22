import { FC } from 'react';
import {
  EstimateItemForm,
  EstimateItemsList,
  EstimateTitleForm,
} from '../../components';

export const CreateEstimate: FC = () => {
  return (
    <div className="mx-auto max-w-[600px]">
      <EstimateTitleForm />
      <EstimateItemForm />
      <EstimateItemsList />
    </div>
  );
};
