import axios from '../helper/axios';
import { REGISTRATION_CHECK_URL } from '../constants/serverLinks';
import RegistrationFormData from '../interfaces/RegistrationFormData';

export const asyncStudentIdValidate = (values: RegistrationFormData) => {
    return axios
        .post(REGISTRATION_CHECK_URL, {
            studentId: values.studentId,
            email: values.email
        })
        .then(response => {
            if (response.data.isNotUniqueId && response.data.isNotUniqueEmail)
                throw {
                    studentId: 'Student ID is taken',
                    email: 'Email is taken'
                };
            else if (response.data.isNotUniqueId)
                throw { studentId: 'Student ID is taken' };
            else if (response.data.isNotUniqueEmail)
                throw { email: 'Email is taken' };
        });
};
