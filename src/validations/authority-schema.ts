import { object, string, z } from 'zod';

export const CreateAuthoritySchema = object({
    code: string()
        .min(3)
        .max(5),

    description: string()
        .min(10)
        .max(100)
});

export type CreateAuthority = z.infer<typeof CreateAuthoritySchema>;

export const UpdateAuthoritySchema = CreateAuthoritySchema.partial();
