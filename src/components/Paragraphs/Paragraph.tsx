import React from 'react'

export type Paragraph = {
  paragraph_id: number;
  chapter_id: number;
  txt: string;
  title: string;
}

export const dummyP: Paragraph = {paragraph_id: 0, chapter_id: 0, txt: '', title: ''}