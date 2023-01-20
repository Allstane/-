import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { tagsColorSettings } from '../../../helpers/tags';
import './style.css'
const Tags = ({tags = []}) => {
  return (
    <Stack spacing={1} alignItems="center">
      <Stack direction="row" spacing={1} className='tags-wrapper'>
        {tags.map((tag) => <Chip label={tag.owners_title} color={tagsColorSettings[tag.owners_title]}/>)}
      </Stack>
    </Stack>
  );
}

export default Tags