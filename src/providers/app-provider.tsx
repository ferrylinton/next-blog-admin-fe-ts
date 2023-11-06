import { PropsWithChildren, useState } from 'react';
import { AppContext } from './app-context';


export const AppProvider = ({ children }: PropsWithChildren) => {

    const [loading, setLoading] = useState<boolean>(false);


    const defaultValue = {
        loading, setLoading
    }

    return (
        <AppContext.Provider value={defaultValue}>
            {children}
        </AppContext.Provider>
    )
}