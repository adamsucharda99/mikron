import { Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Slug, SlugInputProps, set, unset, useFormValue } from 'sanity';
import slugify from 'slugify';

export default function SlugInput({
  value,
  onChange,
  elementProps,
}: SlugInputProps) {
  const [slug, setSlug] = useState<string>(value?.current ?? '');

  const nameFormValue = useFormValue(['name']) as string;
  const typeFormValue = useFormValue(['_type']) as string;

  useEffect(() => {
    if (nameFormValue) {
      const isSeries = typeFormValue === 'series';

      const slug = slugify(nameFormValue, { lower: true, strict: true });
      setSlug(isSeries ? `${slug}-series` : slug);

      const newSlug: Slug = {
        _type: 'slug',
        current: isSeries ? slug + '-series' : slug,
      };
      onChange(newSlug ? set(newSlug) : unset());
    }
  }, [nameFormValue]);

  return <Input {...elementProps} value={slug} />;
}
