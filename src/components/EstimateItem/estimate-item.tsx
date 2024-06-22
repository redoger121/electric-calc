import { FC } from 'react';
import { EstimateItem } from '../../types/estimate';
import { useAppSelector } from '../../store/hooks';
import { itemInEstimate } from '../../store/selectors';

type Prop = {
  item: EstimateItem;
};

export const EstimateItemComponent: FC<Prop> = ({ item }) => {
  const estimateItem = useAppSelector((state) =>
    itemInEstimate(state, item.id)
  );

  if (!estimateItem) {
    return null;
  }

  return (
    <tr>
      <td>{estimateItem.title}</td>
      <td>{estimateItem.price} Руб</td>
      <td>{item.count} шт</td>
      <td>{item.count * estimateItem.price} Руб</td>
    </tr>
  );
};
