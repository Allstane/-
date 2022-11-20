import {instance} from './../AxiosInstance'
import React, {useState} from 'react'

export type Author = {
  id: number;
  original_name: string;
  original_language: number;
  birth_date: number;
  death_date: number;
  is_author: boolean;
  is_translator: boolean
}

export const dummyA: Author =
  {id: 0, original_name: '', original_language: 1, birth_date: 0, death_date: 0, is_author: false, is_translator: false}

interface IApplicationProps {}