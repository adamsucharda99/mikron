import { defaultLocale } from '@/i18n';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Input,
  Stack,
  Tooltip,
} from '@chakra-ui/react';
import { groq } from 'next-sanity';
import React from 'react';
import { MdAdd, MdClose } from 'react-icons/md';
import { useClient } from 'sanity';
import { v4 as uuid } from 'uuid';
import { apiVersion } from '../../env';
import Parameter from './Parameter';
import { SeriesParameterGroup } from './types';

const query = groq`
  *[_type == 'machine' && $key in machineParameters[].seriesParameterGroupKey][0] {
    _id
  }
`;

interface Props {
  lang: string;
  group: SeriesParameterGroup;
  parameterGroups: SeriesParameterGroup[];
  setParameterGroups: React.Dispatch<
    React.SetStateAction<SeriesParameterGroup[]>
  >;
}

export default function ParameterGroup({
  lang,
  group,
  parameterGroups,
  setParameterGroups,
}: Props) {
  const client = useClient({ apiVersion });

  const handleLabelChange = (
    newValue: string,
    groupKey: string,
    lang: string
  ): void => {
    setParameterGroups((current) =>
      current.map((group) =>
        group._key === groupKey
          ? { ...group, label: { ...group.label, [lang]: newValue } }
          : group
      )
    );
  };

  const handleNewParameter = (groupKey: string): void => {
    setParameterGroups((current) =>
      current.map((group) =>
        group._key === groupKey
          ? {
              ...group,
              seriesParameters: [
                ...group.seriesParameters,
                {
                  id: uuid(),
                  label: {},
                  _type: 'seriesParameter',
                },
              ],
            }
          : group
      )
    );
  };

  const handleDelete = async (groupKey: string) => {
    const machine: { _id: string } = await client.fetch(query, {
      key: groupKey,
    });

    if (machine) {
      const patchDocs = async (id: string): Promise<void> => {
        await client
          .patch(id, {
            unset: [
              `machineParameters[seriesParameterGroupKey == "${groupKey}"]`,
            ],
          })
          .commit();
      };

      await patchDocs(machine._id);
      await patchDocs(`drafts.${machine._id}`);
    }

    setParameterGroups((current) =>
      current.filter((group) => group._key !== groupKey)
    );
  };

  return (
    <Box borderLeft='2px' borderColor='gray.300' pl={4}>
      <Flex gap={2}>
        <FormControl flex={1}>
          <FormLabel>Parameter group</FormLabel>
          <Input
            onChange={(e) =>
              handleLabelChange(e.target.value, group._key, lang)
            }
            value={group.label[lang]}
            placeholder={
              group.label[defaultLocale] ||
              Object.values(group.label).find((item) => item) ||
              ''
            }
          />
        </FormControl>
        <Tooltip label='Delete group'>
          <IconButton
            aria-label='delete'
            colorScheme='red'
            alignSelf='end'
            variant='ghost'
            icon={
              <Icon fontSize={24}>
                <MdClose />
              </Icon>
            }
            onClick={() => handleDelete(group._key)}
          />
        </Tooltip>
      </Flex>
      <Stack spacing={2} mt={4}>
        {group.seriesParameters.map((parameter) => (
          <Parameter
            key={parameter.id}
            parameter={parameter}
            parameterGroups={parameterGroups}
            setParameterGroups={setParameterGroups}
            lang={lang}
          />
        ))}
        <Button
          mt={1}
          leftIcon={<MdAdd />}
          onClick={() => handleNewParameter(group._key)}
          variant='ghost'
          alignSelf='start'
        >
          Add parameter
        </Button>
      </Stack>
    </Box>
  );
}
