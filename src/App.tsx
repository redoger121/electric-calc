import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import {
  CreateEstimate,
  EstimatesHistory,
  MainPage,
} from './pages';
import { Layout } from './components';
import { useAppDispatch } from './store/hooks';
import { useEffect } from 'react';
import { getAllPrices } from './store/Prices/pricesSlice';
function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllPrices());
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path={ROUTES.HOME} Component={MainPage} />
        <Route path={ROUTES.CREATE_ESTIMATE} Component={CreateEstimate} />
        <Route path={ROUTES.ESTIMATES_HISTORY} Component={EstimatesHistory} />
      </Routes>
    </Layout>
  );
}

export default App;
