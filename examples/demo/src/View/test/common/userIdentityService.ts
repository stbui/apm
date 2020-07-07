import lodash from 'lodash';
import { utils } from './utils';

function formatCustomFields(c) {
    return c
        ? lodash.map(c, function (c) {
              var d = lodash.lowerCase(c.key);
              return {
                  label: lodash.upperFirst(d),
                  value: c.value,
                  isLink: utils.isAbsoluteUrl(c.value),
              };
          })
        : [];
}

export const userIdentityService = {
    formatCustomFields: formatCustomFields,
};
