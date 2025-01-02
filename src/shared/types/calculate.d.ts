import { IServiceItemData } from './my-services';

export interface IServiceItem extends IServiceItemData {
  value: number;
  cost: number;
}
