import { instance } from "../../components/AxiosInstance"

export const languages = [
    {value: 'English', title: 'English'},
    {value: 'Russian', title: 'Русский'},
    {value: 'Ukrainian', title: 'Українська'},
    {value: 'German', title: 'Duitse'},
    {value: 'Poland', title: 'Polski'},
]

export const getLanguages = () => {
     return instance.get('/languages')
}