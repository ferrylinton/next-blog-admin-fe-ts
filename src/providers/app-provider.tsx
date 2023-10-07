import { PropsWithChildren, useState } from 'react';
import { AppContext } from './app-context';




export const AppProvider = ({ children }: PropsWithChildren) => {

    const [loading, setLoading] = useState(false);

    const [hideScrollBar, setHideScrollBar] = useState(false);


    return (
        <AppContext.Provider value={{ loading, setLoading, hideScrollBar, setHideScrollBar }}>
            {children}
        </AppContext.Provider>
    )
}