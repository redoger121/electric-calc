import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
export const Header:FC=()=>{
 const navigate=useNavigate()



    return <div className="text-center pb-4">
        <a className="pr-4 text-2xl cursor-pointer" onClick={()=>{navigate(ROUTES.ESTIMATES_HISTORY)}}>История расчетов</a>
        <a className="text-2xl pr-4 cursor-pointer" onClick={()=>{navigate(ROUTES.HOME)}}>Расценки</a>
        <a className="text-2xl cursor-pointer" onClick={()=>{navigate(ROUTES.CREATE_ESTIMATE)}}>Создание сметы</a>
       
    </div>
}