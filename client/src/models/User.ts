import { Address } from './Address';
import { GenderType } from './GenderType';

export default class User {
  public id: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public shippingAddress?: Address;
  public birthDate?: string;
  public gender?: GenderType;
  public instagramLinked: boolean;
}
