import axios from 'axios'
import {useState} from 'react'

export type Paragraph = {
  paragraph_id: number;
  chapter_id: number;
  txt: string;
  title: string;
}