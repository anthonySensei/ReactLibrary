import { AUTH_CLIENT_ACTIVATION_PAGE_URL } from './links';

export const subjects = {
    ACCOUNT_ACTIVATION: 'Account activation'
};

export const messages = {
    BEST_REGARDS: `<br>
                    With best regards, <br>
                    Library`
};

export const generateActivationMessage = (registrationToken: string) => {
    return `'Hello. Please follow the link below to activate your account.
                <br />
                <a href="${process.env.REACT}${AUTH_CLIENT_ACTIVATION_PAGE_URL}?token=${registrationToken}">
                    http://localhost:4200/activation-page?rtoken=${registrationToken}
                </a>
                ${messages.BEST_REGARDS}
            `;
};
