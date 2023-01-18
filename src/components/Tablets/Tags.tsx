import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import {TagInUse} from './../data/Tag'

export default function Tags(tags: Array<TagInUse>) {
  return (
    <Stack spacing={1} alignItems="center">
      <Stack direction="row" spacing={1}> Тэги:
        {tags.map((tag: TagInUse) => <Chip label={tag.owners_title} color="success"/>)}
      </Stack>

    </Stack>
  );
}