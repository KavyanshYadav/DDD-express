export type AddressProps = {
    country: string;
    street: string;
    postalCode: string;
  };
  
  export class Address {
    public readonly country: string;
    public readonly street: string;
    public readonly postalCode: string;
  
    constructor(props: AddressProps) {
      if (!props.country || !props.street || !props.postalCode) {
        throw new Error('Invalid address props');
      }
      this.country = props.country;
      this.street = props.street;
      this.postalCode = props.postalCode;
    }
  
    unpack(): AddressProps {
      return {
        country: this.country,
        street: this.street,
        postalCode: this.postalCode,
      };
    }
  }
  