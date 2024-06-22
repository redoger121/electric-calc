import { Prices } from '../types/price';

export const onTitleAlreadyExist = (value: string, prices: Prices):string|undefined => {
  if (prices.length > 0) {
    const priceAlreadyExist = prices.some((el) => {
      return el.title === value;
    });
    if (priceAlreadyExist) {
      return 'Услуга уже добавлена';
    }
  }
};

export const onEditPriceTitleValidate = (
  value: string,
  title: string,
  prices: Prices
) => {
  const priceAlreadyExist = prices.some((el) => {
    return el.title === value;
  });
  if (priceAlreadyExist && value !== title) {
    return 'Услуга уже добавлена';
  }
};
