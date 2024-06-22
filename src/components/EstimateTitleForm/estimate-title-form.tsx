import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addNameToEstimateOnCreation } from '../../store/Estimate/estimateSlice';
import { stateEstimates } from '../../store/selectors';

type formInputs = {
  name: string;
};

export const EstimateTitleForm: FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<formInputs>();

  const [titleOnEdit, setTitleOnEdit] = useState<boolean>(false);

  const estimateOnCreation = useAppSelector(stateEstimates);

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<formInputs> = (data) => {
    console.log(data);

    dispatch(addNameToEstimateOnCreation(data.name));
    reset();
    setTitleOnEdit(false);
  };

  const onEditBtnClick = () => {
    if (estimateOnCreation.name) {
      setValue('name', estimateOnCreation.name);
      setTitleOnEdit(true);
    }
  };

  return (
    <div className="pb-2">
      {!estimateOnCreation.name ||
      (estimateOnCreation.name && titleOnEdit) ||
      (!estimateOnCreation.name && titleOnEdit) ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative overflow-hidden rounded-md" >
            <input
              className={
                (errors && errors.name?.type === 'required') ||
                (errors && errors.name?.type === 'validate')
                  ? 'block w-full rounded-md border-0 py-1.5 pr-28 text-gray-900 shadow-sm ring-1 ring-inset ring-red-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 mr-2 p-1'
                  : 'block w-full rounded-md border-0 py-1.5 pr-28 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6 mr-2 p-1'
              }
              type="text"
              placeholder="Название сметы"
              {...register('name', { required: 'Укажите название сметы' })}
            />

            <button className="absolute top-[2px] right-[2px]  rounded-md px-1 bg-green-300 h-[calc(100%-4px)] ">
              Подтвердить
            </button>
          </div>
          {errors && errors.name && (
            <p className="text-red-600">{errors.name.message}</p>
          )}
        </form>
      ) : null}

      {estimateOnCreation.name && !titleOnEdit && (
        <div className='flex'>
          <p className='text-lg mr-2'>{estimateOnCreation.name}</p>
          <button className=' rounded-md px-1 bg-green-300' onClick={onEditBtnClick}> Изменить</button>
        </div>
      )}
    </div>
  );
};
