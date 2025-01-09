import { IServiceItemData } from './my-services';

export interface IServiceItem extends IServiceItemData {
  count: number;
  cost: number;
}

export interface IOrder {
  id: string;
  name: string;
  address: string;
  meetingDateTime: Date;
  startWorkDate: Date;
  phoneNumber: string;
  orderServices: IServiceItem[];
}
