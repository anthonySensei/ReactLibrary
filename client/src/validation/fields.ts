import { validation } from '../constants/validation';
import { store } from '../index';
import { BookFilters } from '../constants/BookFilters';

export const required = (value: string) =>
    value ? undefined : 'Field is required';

export const email = (value: string) =>
    value && !validation.EMAIL.test(value) ? 'Email is not valid' : undefined;

export const id = (value: string) =>
    value && !validation.ID.test(value) ? 'ID is not valid' : undefined;

export const password = (value: string) =>
    value && !validation.PASSWORD.test(value)
        ? 'Password is not valid'
        : undefined;

export const lessThanZero = (value: string) =>
    !value || +value > 1 ? undefined : 'Year must be bigger than 0';

export const higherThanToYear = (value: string): string | undefined => {
    const tYearValue = store.getState()?.form?.filterForm?.values?.tYear;
    if (tYearValue)
        return tYearValue >= value
            ? undefined
            : 'From year must be less than to year';
    else return undefined;
};

export const notEmptyFilterValue = (value: string): string | undefined => {
    const filter = store.getState()?.form?.filterForm?.values?.filter;
    if (filter === BookFilters.NOTHING) return undefined;
    if (filter && !value) return 'Field are required';
};
