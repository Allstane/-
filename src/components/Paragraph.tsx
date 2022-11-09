import axios from 'axios'
import { FC } from 'react'

type Paragraph = {
  paragraph_id: number;
  chapter_id: number;
  txt: string;
  title: string;
}

async function getParagraph() {
  try {
    const { data, status } = await axios.get<Paragraph>(
      'http://localhost:8080/paragraph/26',

    );

    console.log(JSON.stringify(data, null, 4));
    console.log('response status is: ', status);

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

const Par = getParagraph()
export default Par

