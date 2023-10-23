import { PropsWithChildren, useState } from 'react';
import { AppContext } from './app-context';
import { Authority } from '@/types/authority-type';




export const AppProvider = ({ children }: PropsWithChildren) => {

    const [id, setId] = useState<string | null>(null);

    const [data, setData] = useState<Authority | null>(null);

    const defaultValue = {
        id, setId, data, setData
    }

    return (
        <AppContext.Provider value={defaultValue}>
            {children}
        </AppContext.Provider>
    )
}