import { validation } from '../constants/validation';

export const required = (value: string) =>
    value ? undefined : 'Field is required';

export const email = (value: string) =>
    value && !validation.EMAIL.test(value) ? 'Email is not valid' : undefined;

export const password = (value: string) =>
    value && !validation.PASSWORD.test(value)
        ? 'Password is not valid'
        : undefined;

export const lessThanZero = (value: string) =>
    value && +value > 1
        ? undefined
        : 'Year must be bigger than 0';
