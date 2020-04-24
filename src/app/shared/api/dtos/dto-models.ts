/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.19.577 on 2020-01-28 16:51:28.

export interface Dto {
}

export class AddressDto implements Dto {
    id: number;
    address: string;
    city: string;
    zip: string;
    country: string;
}

export class CustomerDto implements Dto {
    id: number;
    user: UserDto;
    termsAndConditionsAccepted: boolean;
    postalAddress: AddressDto;
}

export class DeliveryDto implements Dto {
    id: number;
    deliveryAddress: AddressDto;
}

export class OrderDto implements Dto {
    id: number;
    user: UserDto;
    invoiceAddress: AddressDto;
    deliveries: DeliveryDto[];
    products: ProductDto[];
}

export class ProductDto implements Dto {
    id: number;
    productNumber: number;
    productName: string;
    price: number;
    ratings: RatingDto[];
    orderIds: number[];
}

export class RatingDto implements Dto {
    id: number;
    user: UserDto;
    productId: number;
    score: number;
    description: string;
}

export class RoleDto implements Dto {
    id: number;
    roleType: RoleType;
    roleName: string;
}

export class UserDto implements Dto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: RoleDto[];
    customerId: number;
}

export enum RoleType {
    ROLE_JPA_GLOBALADMIN = 'ROLE_JPA_GLOBALADMIN',
    ROLE_JPA_ADMIN = 'ROLE_JPA_ADMIN',
    ROLE_JPA_SELLER = 'ROLE_JPA_SELLER',
    ROLE_JPA_BUYER = 'ROLE_JPA_BUYER',
    ROLE_REALM_SUPERADMIN = 'ROLE_REALM_SUPERADMIN',
    ROLE_REALM_CLIENT_ADMIN = 'ROLE_REALM_CLIENT_ADMIN',
    ROLE_REALM_CLIENT_SELLER = 'ROLE_REALM_CLIENT_SELLER',
    ROLE_REALM_CLIENT_BUYER = 'ROLE_REALM_CLIENT_BUYER',
    ROLE_USER = 'ROLE_USER',
    ROLE_OFFLINE_ACCESS = 'ROLE_OFFLINE_ACCESS',
    ROLE_UMA_AUTHORIZATION = 'ROLE_UMA_AUTHORIZATION',
}
