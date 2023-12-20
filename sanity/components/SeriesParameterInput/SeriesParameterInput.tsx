import { defaultLocale, locales } from '@/i18n';
import {
  Box,
  Button,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { ArrayOfObjectsInputProps, set, unset } from 'sanity';
import { v4 as uuid } from 'uuid';
import ParameterGroup from './ParameterGroup';
import { SeriesParameterGroup } from './types';

export default function SeriesParameterInput({
  elementProps,
  value,
  onChange,
}: ArrayOfObjectsInputProps<SeriesParameterGroup>) {
  const [parameterGroups, setParameterGroups] = useState<
    SeriesParameterGroup[]
  >(value ?? []);
  const [isInitialMount, setIsInitialMount] = useState(true);

  useEffect(() => {
    if (isInitialMount) {
      setIsInitialMount(false);
      return;
    }

    onChange(parameterGroups ? set(parameterGroups) : unset());
  }, [parameterGroups]);

  return (
    <Box>
      <Tabs
        {...elementProps}
        mt={2}
        defaultIndex={locales.indexOf(defaultLocale)}
      >
        <TabList>
          {locales.map((lang) => (
            <Tab
              key={lang}
              textTransform='uppercase'
              fontSize='sm'
              fontWeight='bold'
            >
              {lang}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {locales.map((lang) => (
            <TabPanel key={lang}>
              <Stack spacing={8} mt={2}>
                {parameterGroups.map((group, index) => (
                  <ParameterGroup
                    key={index}
                    lang={lang}
                    group={group}
                    parameterGroups={parameterGroups}
                    setParameterGroups={setParameterGroups}
                  />
                ))}
              </Stack>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
      <Button
        variant='outline'
        mt={2}
        leftIcon={<MdAdd />}
        colorScheme='blue'
        w='full'
        onClick={() =>
          setParameterGroups([
            ...parameterGroups,
            {
              _key: uuid(),
              _type: 'seriesParameterGroup',
              label: {},
              seriesParameters: [
                {
                  id: uuid(),
                  _type: 'seriesParameter',
                  label: {},
                },
              ],
            },
          ])
        }
      >
        Add parameter group
      </Button>
    </Box>
  );
}
