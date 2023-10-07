import { Dispatch, SetStateAction } from "react"

export type AppContextProps = {
    loading: boolean,
    hideScrollBar: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>
    setHideScrollBar: Dispatch<SetStateAction<boolean>>
}
