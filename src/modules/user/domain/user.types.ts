import { Address } from "./value-objects/address.value-object";

export enum UserRoles {
    guest = 'guest',
    admin = 'admin',
    moderator = 'moderator',
}

export type UserProps =  {
    email: string,
    role: UserRoles,
    address :Address
}

export type CreateUserProps = Omit<UserProps, 'role'>;

export type UpdateUserAddressProps = Partial<{
  country: string;
  street: string;
  postalCode: string;
}>;