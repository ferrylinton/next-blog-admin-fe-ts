import { ClientInfo } from "./common-type"

export type ImageMetadata = {
    createdBy: string,
    contentType: string,
    originalName: string
}

export type Image = {
    id: string,
    filename: string,
    uploadDate: string,
    length: number,
    metadata: ImageMetadata,
    urls: string[]
}

export type ImageProps = {
    clientInfo: ClientInfo
}

export type ImageForm = {
    file?: any
}