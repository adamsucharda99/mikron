import { defaultLocale } from '@/i18n';
import { Flex, Icon, IconButton, Input, Tooltip } from '@chakra-ui/react';
import { groq } from 'next-sanity';
import React from 'react';
import { MdClose } from 'react-icons/md';
import { useClient } from 'sanity';
import { apiVersion } from '../../env';
import { SeriesParameter, SeriesParameterGroup } from './types';

const query = groq`*[_type == 'machine' && $id in machineParameters[].seriesParameterId][0] {
  _id
}`;

interface Props {
  lang: string;
  parameterGroups: SeriesParameterGroup[];
  setParameterGroups: React.Dispatch<
    React.SetStateAction<SeriesParameterGroup[]>
  >;
  parameter: SeriesParameter;
}

export default function Parameter({
  lang,
  parameter,
  setParameterGroups,
}: Props) {
  const client = useClient({ apiVersion });

  const handleLabelChange = (
    newValue: string,
    parameterId: string,
    lang: string
  ): void => {
    setParameterGroups((current) =>
      current.map((group) => ({
        ...group,
        seriesParameters: group.seriesParameters.map((parameter) =>
          parameter.id === parameterId
            ? { ...parameter, label: { ...parameter.label, [lang]: newValue } }
            : parameter
        ),
      }))
    );
  };

  const handleUnitChange = (newValue: string, parameterId: string): void => {
    setParameterGroups((current) =>
      current.map((group) => ({
        ...group,
        seriesParameters: group.seriesParameters.map((parameter) =>
          parameter.id === parameterId
            ? { ...parameter, unit: newValue }
            : parameter
        ),
      }))
    );
  };

  const handleDelete = async (parameterId: string): Promise<void> => {
    let machine: { _id: string } = await client.fetch(query, {
      id: parameterId,
    });

    if (machine) {
      const patchDocs = async (id: string): Promise<void> => {
        await client
          .patch(id, {
            unset: [`machineParameters[seriesParameterId == "${parameterId}"]`],
          })
          .commit();
      };

      await patchDocs(machine._id);
      await patchDocs(`drafts.${machine._id}`);
    }

    setParameterGroups((current) =>
      current.map((group) => ({
        ...group,
        seriesParameters: group.seriesParameters.filter(
          (param) => param.id !== parameterId
        ),
      }))
    );
  };

  return (
    <Flex gap={2}>
      <Input
        placeholder={
          parameter.label[defaultLocale] ||
          Object.values(parameter.label).find((item) => item) ||
          'Parameter'
        }
        flex={5}
        onChange={(e) => handleLabelChange(e.target.value, parameter.id, lang)}
        value={parameter.label[lang]}
      />
      <Input
        placeholder='Unit'
        flex={1}
        onChange={(e) => handleUnitChange(e.target.value, parameter.id)}
        value={parameter.unit ?? ''}
      />
      <Tooltip label='Delete parameter'>
        <IconButton
          aria-label='delete'
          variant='ghost'
          icon={
            <Icon fontSize={24} color='gray.600'>
              <MdClose />
            </Icon>
          }
          onClick={() => handleDelete(parameter.id)}
        />
      </Tooltip>
    </Flex>
  );
}
