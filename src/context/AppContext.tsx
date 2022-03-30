import React, { ReactNode } from 'react';

interface IAppProvider {
  children: JSX.Element | JSX.Element[] | ReactNode;
}

export interface IAppContext {
  progress?: number;
  setProgressValue?: (value: number) => void;
  setFormData?: (formData: any) => void;
  userData?: any;
  resetFormData?: () => void;
}

export const AppContext = React.createContext<IAppContext>({});

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
  // const [userData, setUserData] = React.useState<any>({});
  const [progress, setProgress] = React.useState<number>(30);
  const [userData, setUserData] = React.useState<any>(
    JSON.parse(sessionStorage.user_data),
  );

  const resetFormData = () => {
    setUserData({});
  };

  const setProgressValue = (value: number) => {
    setProgress(value);
  };

  const setFormData = (value: any) => {
    setUserData((prev: any) => ({
      ...prev,
      ...value,
    }));
  };

  sessionStorage.setItem('user_data', JSON.stringify(userData));

  const value = { progress, setProgressValue, userData, setFormData, resetFormData };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
