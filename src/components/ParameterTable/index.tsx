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

interface Props {
  machines: Machine[];
  seriesParameterGroups: SeriesParameterGroup[];
  locale: string;
}

export default function ParameterTable({
  machines,
  seriesParameterGroups,
  locale,
}: Props) {
  return (
    <TableContainer py={12}>
      <Table>
        <TableCaption>
          {locale === 'en' ? '*Optional' : '*Za príplatok'}
        </TableCaption>
        <Thead>
          <Tr>
            <Th />
            {machines.map((machine) => (
              <Th key={machine._id} textAlign='center'>
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
              {machines.map((machine) => (
                <Td key={machine._id} />
              ))}
            </Tr>
            {group.seriesParameters.map((parameter) => (
              <Tr key={parameter.id}>
                <Td fontWeight='medium' color='gray.700' fontSize='sm'>
                  {parameter.label}
                </Td>
                {machines.map((machine) =>
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
