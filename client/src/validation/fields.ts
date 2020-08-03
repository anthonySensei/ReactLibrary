import { validation } from '../constants/validation';
import { store } from '../index';
import { BookFilters } from '../constants/BookFilters';

export const required = (value: string) =>
    value ? undefined : 'Field is required';

export const email = (value: string) =>
    value && !validation.EMAIL.test(value) ? 'Email is not valid' : undefined;

export const id = (value: string) =>
    value && !validation.ID.test(value)
        ? 'ID is not valid. Student ID must start with 1-9 and contains 10 digits'
        : undefined;

export const isbn = (value: string) =>
    value && !validation.ISBN.test(value)
        ? 'ISBN is not valid. ISBN must contain 10 or 13 digits'
        : undefined;

export const departmentRequired = () => {
    const department = store.getState()?.form?.addBookForm?.values?.department;
    return department
        ? undefined
        : 'Department is not selected. Please choose department';
};

export const password = (value: string) =>
    value && !validation.PASSWORD.test(value)
        ? 'Password is not valid. Password must contain at least 1 lowercase and uppercase alphabetical character, 1 numeric character and one special character. Also it must be eight characters or longer'
        : undefined;

export const lessThanZero = (value: string) =>
    !value || +value > 0 ? undefined : 'Year must be bigger than 0';

export const retypePassword = (retypePassword: string) => {
    const password = store.getState()?.form?.registrationForm?.values?.password;
    return password && retypePassword && retypePassword !== password
        ? 'Retype right password'
        : undefined;
};

export const biggerThanToYear = (value: string): string | undefined => {
    const tYearValue = store.getState()?.form?.filterForm?.values?.tYear;
    if (tYearValue)
        return tYearValue >= value
            ? undefined
            : 'From year must be less than to year';
    else return undefined;
};

export const biggerThanCurrentYear = (value: string) =>
    +value <= new Date().getFullYear()
        ? undefined
        : 'Year cannot be bigger than current year';

export const notEmptyFilterValue = (value: string): string | undefined => {
    const filter = store.getState()?.form?.filterForm?.values?.filter;
    if (filter === BookFilters.NOTHING) return undefined;
    if (filter && !value) return 'Field are required';
};
