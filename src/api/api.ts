import { UrlGetUniversities, UrlGetCountries } from '../constants/common';

const getData = async (url: string) => {
    return fetch(url).then(res =>{
        if (!res.ok) {
            return Promise.reject(res.statusText);
        }
        return res.json();
    });
}

export const getUniversities = async (country: string) => {
    return getData(`${UrlGetUniversities}${country}`);
}

export const getCountries = async () => {
    return getData(`${UrlGetCountries}`);
}
