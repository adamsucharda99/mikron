'use client';

import {
  Machine,
  SeriesParameterGroup,
} from '@/app/(web)/[locale]/products/[category]/[slug]/series';
import {
  Box,
  Divider,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { MachineSortItem } from '../../../sanity/components/MachineOrderInput/MachineOrderInput';
import ScrollButton from './ScrollButton';

interface Props {
  machines: Machine[];
  seriesParameterGroups: SeriesParameterGroup[];
  locale: string;
  machineOrder: MachineSortItem[] | null;
}

export default function ParameterTable({
  machines,
  seriesParameterGroups,
  locale,
  machineOrder,
}: Props) {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const sortedMachines = machineOrder
    ? machines.slice().sort((a, b) => {
        const indexA = machineOrder.findIndex((item) => item._key === a._id);
        const indexB = machineOrder.findIndex((item) => item._key === b._id);
        return (
          (indexA !== -1 ? indexA : Number.MAX_VALUE) -
          (indexB !== -1 ? indexB : Number.MAX_VALUE)
        );
      })
    : machines;

  return (
    <Box position='relative'>
      <TableContainer
        overflowY={{ lg: 'auto' }}
        maxH='75vh'
        ref={tableContainerRef}
      >
        <Table size='sm'>
          <Thead
            position='sticky'
            top={0}
            bg='white'
            h={14}
            zIndex={2}
            _after={{
              content: '""',
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: 'full',
              height: '4px',
              background: 'gray.100',
            }}
          >
            <Tr>
              <Th bg='white' position={{ lg: 'sticky' }} left={0} />
              {sortedMachines.map((machine) => (
                <Th
                  key={machine._id}
                  textAlign='center'
                  fontSize='small'
                  color='gray.600'
                >
                  {machine.name}
                </Th>
              ))}
              <Divider borderColor='red' />
            </Tr>
          </Thead>
          {seriesParameterGroups.map((group) => (
            <Tbody key={group._key}>
              <Tr>
                <Td
                  textTransform='uppercase'
                  fontWeight='semibold'
                  fontSize='small'
                  color='gray.600'
                  position={{ lg: 'sticky' }}
                  left={0}
                  bg='gray.50'
                >
                  {group.label}
                </Td>
                {sortedMachines.map((machine) => (
                  <Td key={machine._id} bg='gray.50' />
                ))}
              </Tr>
              {group.seriesParameters.map((parameter, index) => (
                <Tr key={parameter.id}>
                  <Td
                    fontWeight='medium'
                    color='gray.700'
                    fontSize='small'
                    position={{ lg: 'sticky' }}
                    left={0}
                    bg='white'
                    borderRight='1px'
                    borderColor='gray.200'
                    display='flex'
                  >
                    {parameter.label}
                  </Td>
                  {sortedMachines.map((machine) =>
                    machine.machineParameters
                      .filter(
                        (machineParam) =>
                          machineParam.seriesParameterId === parameter.id
                      )
                      .map((machineParam) => (
                        <Td
                          key={machineParam._key}
                          fontSize='small'
                          textAlign='center'
                        >
                          {machineParam.value}
                          {parameter.unit}
                        </Td>
                      ))
                  )}
                </Tr>
              ))}
            </Tbody>
          ))}
          <Tr>
            <Td
              h='40px'
              color='gray.600'
              position='sticky'
              left={0}
              fontSize='small'
            >
              {locale === 'en' ? '*Optional' : '*Za príplatok'}
            </Td>
            {sortedMachines.map((machine) => (
              <Td key={machine._id} />
            ))}
          </Tr>
        </Table>
      </TableContainer>
      <Flex
        position='absolute'
        top='50%'
        w='full'
        justifyContent='space-between'
        px={8}
        hideBelow='lg'
      >
        <ScrollButton direction='left' tableContainerRef={tableContainerRef} />
        <ScrollButton direction='right' tableContainerRef={tableContainerRef} />
      </Flex>
    </Box>
  );
}
