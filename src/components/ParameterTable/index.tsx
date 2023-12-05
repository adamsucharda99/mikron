import { Machine } from '@/app/[locale]/products/[category]/[slug]/Series';
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

interface Props {
  machines: Machine[];
}

export default function ParameterTable(props: Props) {
  const machines = props.machines.sort((a, b) => {
    const nameA = a.fields.name.toUpperCase();
    const nameB = b.fields.name.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });

  return (
    <TableContainer py={12}>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th />
            {machines.map((m) => (
              <Th key={m.fields.name} fontSize='sm' textAlign='center'>
                {m.fields.name}
              </Th>
            ))}
          </Tr>
        </Thead>
        {machines[0].fields.parameters.parameterGroups.map((g, i) => (
          <Tbody key={i}>
            <Tr>
              <Td
                textTransform='uppercase'
                fontSize='xs'
                color='gray.500'
                fontWeight='semibold'
              >
                {g.label}
              </Td>
              {machines.map((m, i) => (
                <Td key={i} />
              ))}
            </Tr>
            {g.parameters.map((p, i) => (
              <Tr key={i}>
                <Td
                  textTransform='capitalize'
                  fontSize='sm'
                  fontWeight='medium'
                  color='gray.700'
                >
                  {p.label}
                </Td>
                {machines.map((m, i) => (
                  <Td
                    key={i}
                    fontSize='sm'
                    fontWeight='medium'
                    textAlign='center'
                  >
                    {m.fields.parameters.parameterGroups
                      .flatMap((group) => group.parameters)
                      .find((param) => param.label === p.label)?.value || '—'}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        ))}
      </Table>
    </TableContainer>
  );
}