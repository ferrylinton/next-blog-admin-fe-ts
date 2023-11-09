import { object, string, TypeOf, z } from 'zod';

export const AuthenticateSchema = object({
    username: string().min(3).max(30),
    password: string().min(6).max(30),
    locale: string().min(2).max(10).optional(),
});

export type AuthenticateType = TypeOf<typeof AuthenticateSchema>;