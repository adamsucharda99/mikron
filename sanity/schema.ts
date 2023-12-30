import { type SchemaTypeDefinition } from 'sanity';
import { category } from './schema/documents/category';
import { machine } from './schema/documents/machine';
import { manufacturer } from './schema/documents/manufacturer';
import { series } from './schema/documents/series';
import { localeBlock } from './schema/types/localization/localeBlock';
import { localeString } from './schema/types/localization/localeString';
import { machineParameter } from './schema/types/parameters/machineParameter';
import { seriesParameter } from './schema/types/parameters/seriesParameter';
import { seriesParameterGroup } from './schema/types/parameters/seriesParameterGroup';
import { contactDepartments } from './schema/types/pageBuilder/contactDepartments';
import { page } from './schema/documents/page';

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
    page,
    contactDepartments,
  ],
};
