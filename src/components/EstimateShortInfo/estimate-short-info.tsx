import { FC, useRef, useState } from 'react';
import { EstimateType } from '../../types/estimate';
import { EstimateFullInfo } from '../../pages';
import { CSSTransition } from 'react-transition-group';
import { BsChevronDoubleDown, BsChevronDoubleUp } from 'react-icons/bs';
import './styles.css';
type Props = {
  estimate: EstimateType;
};

export const EstimateShortInfo: FC<Props> = ({ estimate }) => {
  const [showFullInfo, setShowFullInfo] = useState<boolean>(false);

  const handleEstimateClick = () => {
    setShowFullInfo(!showFullInfo);
  };
  const nodeRef = useRef(null);

  return (
    <div className="max-w-[600px] mx-auto border-2 rounded-lg overflow-hidden mb-1">
      <div className=" flex flex-row items-center   p-1 justify-between" >
        <div className="flex flex-col sm:flex-row items-start justify-center">
          <p>
            <span className="pr-1 font-bold">Название:</span>
            {estimate.name}
          </p>
          <p>
            <span className="pr-1 sm:pl-1 font-bold">Стоимость работ:</span>{' '}
            {estimate.totalPrice} Руб
          </p>
        </div>
        <div className="border-2 rounded-full relative w-6 h-6">
          {showFullInfo ? (
            <BsChevronDoubleUp
              className="absolute top-[1px] right-[2px] "
              onClick={handleEstimateClick}
            />
          ) : (
            <BsChevronDoubleDown
              className="absolute bottom-[1px] right-[2px] "
              onClick={handleEstimateClick}
            />
          )}
        </div>
      </div>

      <CSSTransition
        in={showFullInfo}
        nodeRef={nodeRef}
        timeout={500}
        unmountOnExit
        classNames="my">
        <EstimateFullInfo estItemes={estimate.items} ref={nodeRef} />
      </CSSTransition>
    </div>
  );
};
