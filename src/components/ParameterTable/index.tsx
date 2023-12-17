import {
  Machine,
  SeriesParameterGroup,
} from '@/app/(web)/[locale]/products/[category]/[slug]/series';
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { MachineSortItem } from '../../../sanity/components/MachineOrderInput';

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
    <TableContainer py={12}>
      <Table>
        <TableCaption>
          {locale === 'en' ? '*Optional' : '*Za príplatok'}
        </TableCaption>
        <Thead>
          <Tr>
            <Th />
            {sortedMachines.map((machine) => (
              <Th
                key={machine._id}
                textAlign='center'
                fontSize='sm'
                color='gray.600'
              >
                {machine.name}
              </Th>
            ))}
          </Tr>
        </Thead>
        {seriesParameterGroups.map((group) => (
          <Tbody key={group._key}>
            <Tr>
              <Td
                textTransform='uppercase'
                fontWeight='bold'
                fontSize='sm'
                color='gray.500'
              >
                {group.label}
              </Td>
              {sortedMachines.map((machine) => (
                <Td key={machine._id} />
              ))}
            </Tr>
            {group.seriesParameters.map((parameter) => (
              <Tr key={parameter.id}>
                <Td fontWeight='medium' color='gray.700' fontSize='sm'>
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
                        fontSize='sm'
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
      </Table>
    </TableContainer>
  );
}
