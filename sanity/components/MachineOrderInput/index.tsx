import { groq } from 'next-sanity';
import { useCallback, useEffect, useState } from 'react';
import {
  useClient,
  useFormValue,
  ArrayOfPrimitivesInputProps,
  set,
  unset,
} from 'sanity';
import { apiVersion } from '../../env';
import { Box, List, ListItem } from '@chakra-ui/react';

const query = groq`
  *[_type == 'machine' && $id == series._ref] {
    name
  }
`;

const removeDraftsPrefix = (id: string): string => {
  const prefix = 'drafts.';

  return id.startsWith(prefix) ? id.substring(prefix.length) : id;
};

export default function MachineOrderInput({
  onChange,
  value,
  elementProps,
}: ArrayOfPrimitivesInputProps<string>) {
  const idFormValue = useFormValue(['_id']) as string;
  const client = useClient({ apiVersion });

  const [machineOrder, setMachineOrder] = useState<string[]>(value ?? []);

  const onDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.dataTransfer.setData('itemIndex', index.toString());
  };

  const onDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLLIElement>, dropIndex: number) => {
      const dragIndex = parseInt(e.dataTransfer.getData('itemIndex'));
      const draggedItem = machineOrder[dragIndex];

      const newMachineOrder = [...machineOrder];
      newMachineOrder.splice(dragIndex, 1); // Remove item from its original position
      newMachineOrder.splice(dropIndex, 0, draggedItem); // Insert item in new position

      setMachineOrder(newMachineOrder);

      onChange(newMachineOrder ? set(newMachineOrder) : unset());
    },
    []
  );

  useEffect(() => {
    const getMachines = async () => {
      const data = await client.fetch<{ name: string }[]>(query, {
        id: removeDraftsPrefix(idFormValue),
      });

      setMachineOrder(data.map((machine) => machine.name));
    };

    getMachines();
  }, [idFormValue]);

  if (!machineOrder.length) return null;

  return (
    <List {...elementProps} spacing={3}>
      {machineOrder.map((machine, index) => (
        <ListItem
          draggable
          onDragStart={(e) => onDragStart(e, index)}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, index)}
          key={index}
          cursor='grab'
        >
          <Box p={3} borderRadius='sm' bg='gray.100' color='gray.800'>
            {machine}
          </Box>
        </ListItem>
      ))}
    </List>
  );
}
