const activationPageUrl = require('./links').AUTH_CLIENT_ACTIVATION_PAGE_URL;

exports.subjects = {
    ACCOUNT_ACTIVATION: 'Account activation'
};

const messages = {
    BEST_REGARDS: `<br>
                    With best regards, <br>
                    Library`
};
exports.messages = messages;

exports.generateActivationMessage = registrationToken => {
    return `'Hello. Please follow the link below to activate your account.
                <br />
                <a href="${process.env.REACT}${activationPageUrl}?token=${registrationToken}">
                    http://localhost:4200/activation-page?rtoken=${registrationToken}
                </a>
                ${messages.BEST_REGARDS}
            `;
};
