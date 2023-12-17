import { Box, Icon, List, ListItem, Spinner, Text } from '@chakra-ui/react';
import { groq } from 'next-sanity';
import { useCallback, useEffect, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';
import { MdDragIndicator } from 'react-icons/md';
import {
  ArrayOfObjectsInputProps,
  set,
  unset,
  useClient,
  useFormValue,
} from 'sanity';
import { apiVersion } from '../../env';

interface MachineSortItem {
  _key: string;
  name: string;
}

const query = groq`
  *[_type == 'machine' && $id == series._ref] {
    _id,
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
}: ArrayOfObjectsInputProps<MachineSortItem>) {
  const idFormValue = useFormValue(['_id']) as string;
  const client = useClient({ apiVersion });

  const [machineOrder, setMachineOrder] = useState<MachineSortItem[]>(
    value ?? []
  );

  useEffect(() => {
    const getMachines = async () => {
      const data = await client.fetch<{ _id: string; name: string }[]>(query, {
        id: removeDraftsPrefix(idFormValue),
      });

      const newArray = data.map((machine) => ({
        _key: machine._id,
        name: machine.name,
      }));

      if (value?.length && !value?.some((item) => item === null)) {
        const orderedKeySet = new Set(value.map((item) => item._key));

        const sortedArray = newArray
          .filter((item) => orderedKeySet.has(item._key))
          .sort((a, b) => {
            const indexA = value.findIndex((item) => item._key === a._key);
            const indexB = value.findIndex((item) => item._key === b._key);
            return indexA - indexB;
          });

        const extraItems = newArray.filter(
          (item) => !orderedKeySet.has(item._key)
        );
        const finalArray = sortedArray.concat(extraItems);

        setMachineOrder(finalArray);
      } else {
        setMachineOrder(newArray);
      }
    };

    getMachines();
  }, [idFormValue]);

  useEffect(() => {
    onChange(machineOrder ? set(machineOrder) : unset());
  }, [machineOrder]);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(machineOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination?.index as number, 0, reorderedItem);

    setMachineOrder(items);
  };

  if (!machineOrder.length)
    return (
      <Text color='gray.700'>
        This series has no machines yet. Assign machines to this series to sort
        them here later.
      </Text>
    );

  if (machineOrder.some((item) => item === null)) {
    return <Spinner />;
  }

  return (
    <Box my={2} {...elementProps}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='machines'>
          {(provided) => (
            <List
              {...provided.droppableProps}
              ref={provided.innerRef}
              spacing={3}
            >
              {machineOrder.map((machine, index) => (
                <Draggable
                  key={machine._key}
                  draggableId={machine._key}
                  index={index}
                >
                  {(provided) => (
                    <ListItem
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      p={3}
                      bg='gray.100'
                      color='gray.800'
                    >
                      <Icon fontSize='20px' color='gray.500'>
                        <MdDragIndicator />
                      </Icon>
                      {machine.name}
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
}
