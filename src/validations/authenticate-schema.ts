import { object, string, TypeOf, z } from 'zod';

export const AuthenticateSchema = object({
    username: string().min(4).max(100),
    password: string().min(4).max(100),
    locale: string().min(2).max(10).optional(),
});

export type AuthenticateType = TypeOf<typeof AuthenticateSchema>;