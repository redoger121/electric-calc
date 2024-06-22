import { FC } from 'react';

type Props = {
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
  add: boolean;
};

export const AddPriceBtn: FC<Props> = ({ setAdd, add }) => {
  const handleBtnClick = () => {
    setAdd(!add);
  };

  return (
    <div className="">
      {add ? (
        <button
          className="px-3 py-2 text-lg rounded-md bg-red-800 text-white mb-4 hover:bg-red-700 transition ease-in-out delay-150"
          onClick={handleBtnClick}>
          Отменить
        </button>
      ) : (
        <button
          className="px-3 py-2 text-lg rounded-md bg-green-800 text-white mb-4 hover:bg-green-700 transition ease-in-out delay-150"
          onClick={handleBtnClick}>
          Добавить
        </button>
      )}
    </div>
  );
};
