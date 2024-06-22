import { forwardRef } from 'react';
import { EstimateItem } from '../../types/estimate';
import { EstimateItemComponent } from '../../components';

export const EstimateFullInfo = forwardRef<
  HTMLDivElement,
  { estItemes: EstimateItem[] }
>(({ estItemes }, ref) => {
 



  return (
    <div ref={ref} className="border-1 w-full">
<table className="table-auto  border-separate border-spacing-2 w-full">
  <thead>
    <tr>
      <th>Название</th>
      <th>Цена за шт</th>
      <th>Количество шт</th>
      <th>Итоговая цена</th>
    </tr>
  </thead>
  <tbody>
   
      {estItemes.map((item) => {
        return <EstimateItemComponent key={item.id} item={item}></EstimateItemComponent>
      })}
   
  </tbody>
</table>

    </div>
  );
});
