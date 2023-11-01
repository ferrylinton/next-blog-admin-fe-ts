import { boolean, coerce, number, object, string, z } from 'zod';

export const CreateUserSchema = object({

    username: string()
        .min(3)
        .max(100),

    email: string()
        .max(50)
        .email(),

    password: string()
        .min(6)
        .max(30),

    passwordConfirm: string().min(1),

    authorities: string().array().nonempty()

})
    .refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'password.notMatch',
    });

export const UpdateUserSchema = object({

    username: string()
        .min(3)
        .max(100),

    email: string()
        .max(50)
        .email(),

    password: string()
        .min(6)
        .max(30),

    passwordConfirm: string().min(1),

    authorities: string().array().nonempty(),

    activated: boolean(),

    locked: boolean(),

    loginAttempt: coerce.number().min(0).max(3)

}).partial();
