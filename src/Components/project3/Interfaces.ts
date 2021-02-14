export interface IAddress {
    city: string;
    zipcode?: string;
    street?: string;
    suite?: string;
}

export interface ICompany {
    name: string;
    catchPhrase?: string;
    bs?: string;
}

interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    address?: IAddress;
    phone?: string;
    website?: string;
    company?: ICompany;
}

export const initialUserValues = {
    id: -1,
    name: "",
    username: "",
    email: "",
    address: { city: "" },
    company: { name: "" },
};

export default IUser;
