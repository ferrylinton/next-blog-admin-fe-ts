import { ErrorValidation } from "@/types/validation-type";
import { DefaultNamespace, FlatNamespace, TFunction } from "i18next";
import { ZodIssue, ZodTooBigIssue, ZodTooSmallIssue } from "zod";

export const translate = (issues: ZodIssue[], t: TFunction<[DefaultNamespace, ...Exclude<FlatNamespace, DefaultNamespace>[]]>) => {
    const errors: ErrorValidation = {};

    if (issues) {
        issues.forEach(issue => {
            const field = issue.path.join('.');
            console.log(field);
            

            if (issue.code === 'invalid_type') {
                errors[field] = t('invalid_type');

            } else if (issue.code === 'too_big' && issue.type === "string") {
                errors[field] = t('too_big_string', { maximum: (issue as ZodTooBigIssue).maximum });

            } else if (issue.code === 'too_small' && issue.type === "string") {
                errors[field] = t('too_small_string', { minimum: (issue as ZodTooSmallIssue).minimum });

            } else if (issue.code === 'too_small' && issue.type === "array") {
                errors[field] = t('too_small_array');

            } else if (issue.code === 'custom') {
                    errors[field] = t(issue.message);

            } else {
                errors[field] = issue.message
            }
        });

        
    }
    console.log(errors);
    return errors;
}