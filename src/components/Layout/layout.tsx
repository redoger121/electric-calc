import { FC } from 'react';
import { Header } from '../Header';

type Props = {
  children: React.ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="container mx-auto">
      <Header />
      {children}
    </div>
  );
};
