export type EstimateType = {
  name: string;
  items: EstimateItem[];
  totalPrice: number;
};

export type EstimateItem = {
  id: string;
  count: number;
};
