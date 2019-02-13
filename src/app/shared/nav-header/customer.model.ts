export class Customer {
    name: string;
    phone: number;
    address: string;
    email: string;
    constructor(
        name: string,
        phone: number,
        address: string,
        email: string
    ) {
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.email = email;
    }
}
