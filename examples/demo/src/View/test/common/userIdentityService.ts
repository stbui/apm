import lodash from 'lodash';
import { utils } from './utils';

function formatCustomFields(c) {
    if (c) {
        return lodash.map(c, c => {
            var d = lodash.lowerCase(c.key);
            return {
                label: lodash.upperFirst(d),
                value: c.value,
                isLink: utils.isAbsoluteUrl(c.value),
            };
        });
    }

    return [];
}

export const userIdentityService = {
    formatCustomFields: formatCustomFields,
};
