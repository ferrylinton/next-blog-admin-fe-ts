import { Dispatch, SetStateAction } from "react"
import { Authority } from "./authority-type"

export type AppContextProps = {

    id: string | null

    setId: Dispatch<SetStateAction<string|null>>

    data: Authority | null

    setData: Dispatch<SetStateAction<Authority | null>>

}
