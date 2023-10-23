import { AppContextProps } from '@/types/app-type';
import { createContext, useContext } from 'react';


export const AppContext = createContext<AppContextProps>({
    id: null,
    setId: () => null,
    data: null,
    setData: () => null
});

export const useAppContext = () => useContext(AppContext);