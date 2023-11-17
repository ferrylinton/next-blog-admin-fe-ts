import { ClientInfo } from "./common-type"

export type ImageMetadata = {
    createdBy: string,
    contentType: string,
    originalName: string,
    width: number,
    height: number
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
    clientInfo: ClientInfo,
    image?: Image
}

export type ImageForm = {
    file?: any
}