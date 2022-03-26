import React from 'react';
import { IChildren } from '../../types/childrenType';

export const Container: React.FC<IChildren> = ({ children }) => {
  return <div className="container">{children}</div>;
};
