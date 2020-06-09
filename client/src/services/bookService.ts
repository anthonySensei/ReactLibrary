import axios from '../helper/axios';

import { BOOKS_URL } from '../constants/serverLinks';
import { BookFilters } from '../constants/BookFilters';
import BooksFilter from '../interfaces/BooksFilter';

export const getBooksService = (
    page: string | number,
    filterObj: any,
    departmentId: string
) => {
    return axios
        .get(BOOKS_URL, {
            params: {
                ...filterObj,
                departmentId,
                page
            }
        })
        .then(response => response);
};

export const addFilterToQueryParamsService = (
    filterObj: BooksFilter,
    history: any
) => {
    let authorIdQuery: string = '';
    let departmentIdQuery: string = '';
    let filterQuery: string = '';
    let fYearQuery: string = '';
    let tYearQuery: string = '';
    let valueQuery: string = '';
    if (filterObj.authorId) authorIdQuery = `authorId=${filterObj.authorId}&`;
    if (filterObj.departmentId)
        departmentIdQuery = `departmentId=${filterObj.departmentId}&`;
    if (filterObj.filter) filterQuery = `filter=${filterObj.filter}&`;
    if (filterObj.fYear) fYearQuery = `fYear=${filterObj.fYear}&`;
    if (filterObj.tYear) tYearQuery = `tYear=${filterObj.tYear}&`;
    if (filterObj.value) valueQuery = `value=${filterObj.value}&`;
    history.push(
        `/?${authorIdQuery}${departmentIdQuery}${filterQuery}${fYearQuery}${tYearQuery}${valueQuery}`
    );
};

export const getFilterObjService = (
    authorId: string | null,
    departmentId: string | null,
    filter: string | null,
    fYear: string | null,
    tYear: string | null,
    value: string | null
) => {
    let authorIdField = {};
    let departmentIdField = {};
    let filterField = {};
    let fYearField = {};
    let tYearField = {};
    let valueField = {};
    if (authorId) authorIdField = { authorId };
    if (departmentId) departmentIdField = { departmentId };
    if (filter) filterField = { filter };
    if (fYear) fYearField = { fYear };
    if (tYear) tYearField = { tYear };
    if (value) valueField = { value };
    return {
        ...authorIdField,
        ...departmentIdField,
        ...filterField,
        ...tYearField,
        ...fYearField,
        ...valueField
    };
};
