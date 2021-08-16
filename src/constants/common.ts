export const UrlGetUniversities = "http://universities.hipolabs.com/search?country=";
export const UrlGetCountries = "https://restcountries.eu/rest/v2/";

export enum EventType {'None', 'View', 'Add', 'Edit'};

export const PopupTitle = {
    [EventType.None]: '',
    [EventType.View]: 'View Application',
    [EventType.Add]: 'Add New Application',
    [EventType.Edit]: 'Edit Application',
};

export type University = {
    name: string,
    country: string,
    website: string,
    date: string,
    notes: string,
};

export const UniversityColumns = {
    NAME:'Name',
    COUNTRY:'Country',
    WEBSITE:'Website',
    DATE:'Due Date',
    NOTES: 'Notes',
};
