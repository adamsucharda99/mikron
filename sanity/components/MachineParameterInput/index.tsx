import { groq } from 'next-sanity';
import { useEffect, useState } from 'react';
import {
  ArrayOfObjectsInputProps,
  set,
  unset,
  useClient,
  useFormValue,
} from 'sanity';
import { apiVersion } from '../../env';
import { Series, SeriesParameterGroup } from '../SeriesParameterInput/types';
import { MachineParameter } from './types';
import { v4 as uuid } from 'uuid';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
  Text,
} from '@chakra-ui/react';
import { defaultLocale } from '@/i18n';

const query = groq`*[_type == "series" && _id == $id][0]`;

export default function MachineParameterInput({
  value,
  onChange,
  elementProps,
}: ArrayOfObjectsInputProps<MachineParameter>) {
  const [machineParameters, setMachineParameters] = useState<
    MachineParameter[]
  >(value ?? []);
  const [seriesParameterGroups, setSeriesParameterGroups] = useState<
    SeriesParameterGroup[]
  >([]);
  const [isInitialRender, setIsInitialRender] = useState(true);

  const client = useClient({ apiVersion });
  const seriesFormValue = useFormValue(['series']) as
    | { _ref: string }
    | undefined;

  useEffect(() => {
    if (!seriesFormValue) {
      setSeriesParameterGroups([]);
      return;
    }

    const getSeries = async () => {
      const data: Series = await client.fetch(query, {
        id: seriesFormValue._ref,
      });

      if (data) {
        setSeriesParameterGroups(data.seriesParameterGroups);
      }
    };
    getSeries();
  }, [seriesFormValue]);

  useEffect(() => {
    if (!isInitialRender) {
      onChange(machineParameters ? set(machineParameters) : unset());
    } else {
      setIsInitialRender(false);
    }
  }, [machineParameters]);

  const handleChange = (
    newValue: string,
    seriesParamId: string,
    seriesGroupKey: string
  ): void => {
    setMachineParameters((current) => {
      const exists = current.some(
        (parameter) => parameter.seriesParameterId === seriesParamId
      );

      if (exists) {
        return current.map((parameter) =>
          parameter.seriesParameterId === seriesParamId
            ? { ...parameter, value: newValue }
            : parameter
        );
      } else {
        return [
          ...current,
          {
            _key: uuid(),
            seriesParameterId: seriesParamId,
            seriesParameterGroupKey: seriesGroupKey,
            value: newValue,
            _type: 'machineParameter',
          },
        ];
      }
    });
  };

  if (!seriesParameterGroups?.length) {
    return null;
  }

  return (
    <Stack spacing={6} {...elementProps}>
      {seriesParameterGroups.map((group, index) => (
        <Box key={index} borderLeft='2px' pl={4} py={2} borderColor='gray.300'>
          <Box>
            <Text
              fontWeight='bold'
              textTransform='uppercase'
              fontSize='sm'
              color='gray.500'
            >
              {group.label[defaultLocale]}
            </Text>
          </Box>
          <Stack spacing={2} mt={2}>
            {group.seriesParameters.map((parameter) => (
              <FormControl key={parameter.id}>
                <FormLabel fontSize='sm' color='gray.700'>
                  {parameter.label[defaultLocale]}
                </FormLabel>
                <InputGroup size='sm'>
                  <Input
                    onChange={(e) =>
                      handleChange(e.target.value, parameter.id, group._key)
                    }
                    value={
                      machineParameters.find(
                        (param) => param.seriesParameterId === parameter.id
                      )?.value ?? ''
                    }
                  />
                  {parameter.unit && (
                    <InputRightAddon>{parameter.unit}</InputRightAddon>
                  )}
                </InputGroup>
              </FormControl>
            ))}
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}
