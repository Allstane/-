import axios from 'axios'
import {useState} from 'react'

export type Chapter = {
  chapter_id: number;
  txt: string;
  title: string;
}