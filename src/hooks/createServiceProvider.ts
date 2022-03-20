import React, { useContext } from 'react';

export function createServiceProvider<T>(): [React.Provider<T>, () => T] {
  const context = React.createContext<T>({} as any);
  return [context.Provider, () => useContext(context)];
}
