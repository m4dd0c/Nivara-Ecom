import { IAddress, ITop, IBottom } from "./api";

export interface IRemoveKeysFromQuery {
  params: string;
  keysToRemove: string[];
}
export interface IRemoveValueFromQuery {
  params: string;
  key: string;
  valueToRemove: string;
}

export interface IFormQuery {
  params: string;
  key: string;
  value: string;
}
export type tAddress = IAddress;

export interface ISeasonal {
  type: string;
  product: ITop | IBottom;
}
