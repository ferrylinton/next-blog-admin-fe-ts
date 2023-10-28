import { any, object } from "zod";

export const MIN_FILE_SIZE = 1 * 1024;
export const MAX_FILE_SIZE = 3 * 1024 * 1024;

export const CreateImageSchema = object({
    file: any()
            .refine((file) => file?.size >= MIN_FILE_SIZE, `minImageSize1kb`)
            .refine((file) => file?.size <= MAX_FILE_SIZE, `maxImageSize3MB`)
});
