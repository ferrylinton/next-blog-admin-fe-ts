import { AppContextProps } from '@/types/app-type';
import { createContext, useContext } from 'react';


export const AppContext = createContext<AppContextProps>({
    loading: false,
    setLoading: () => null
});

export const useAppContext = () => useContext(AppContext);