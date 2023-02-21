import { instance } from "../../components/AxiosInstance"

export const languages = [
    {value: 'English', title: 'English'},
    {value: 'Russian', title: 'Русский'},
    {value: 'Ukrainian', title: 'Українська'},
    {value: 'German', title: 'Duitse'},
    {value: 'Poland', title: 'Polski'},
]

export let allLanguages = [];
export const getLanguages = () => {
    instance.get('/languages').then(response => allLanguages = response.data)
    return instance.get('/languages')
}

export const getLanguageById = (id) => {
    return allLanguages.find(lang => lang.id === id)
}