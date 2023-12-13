import { type SchemaTypeDefinition } from 'sanity';
import { category } from './schema/documents/category';
import { machine } from './schema/documents/machine';
import { manufacturer } from './schema/documents/manufacturer';
import { series } from './schema/documents/series';
import { contact } from './schema/pages/contact';
import { contactDepartment } from './schema/types/contactDepartment';
import { contactPerson } from './schema/types/contactPerson';
import { localeBlock } from './schema/types/localization/localeBlock';
import { localeString } from './schema/types/localization/localeString';
import { machineParameter } from './schema/types/machineParameter';
import { seriesParameter } from './schema/types/seriesParameter';
import { seriesParameterGroup } from './schema/types/seriesParameterGroup';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    localeString,
    localeBlock,
    category,
    manufacturer,
    series,
    machine,
    seriesParameterGroup,
    seriesParameter,
    machineParameter,
    contact,
    contactDepartment,
    contactPerson,
  ],
};
