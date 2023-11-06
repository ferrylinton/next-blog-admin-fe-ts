import { Dispatch, SetStateAction } from "react"

export type AppContextProps = {

    loading: boolean

    setLoading: Dispatch<SetStateAction<boolean>>

}
