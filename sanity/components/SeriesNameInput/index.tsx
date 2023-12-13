import { Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { InputProps, set, unset } from 'sanity';

export default function SeriesInput({
  value,
  onChange,
  elementProps,
}: InputProps) {
  const handleChange = useCallback(
    (newValue: string): void => {
      onChange(newValue ? set(newValue) : unset());
    },
    [onChange]
  );

  return (
    <InputGroup>
      <Input
        {...elementProps}
        onChange={(e) => handleChange(e.target.value)}
        value={value as string}
      />
      <InputRightAddon>Series</InputRightAddon>
    </InputGroup>
  );
}
