import { IServiceItemData } from './my-services';

export interface IServiceItem extends IServiceItemData {
  count: number;
  cost: number;
}

export interface IOrder {
  id: string;
  orderNumber?: string;
  name: string;
  address: string;
  meetingDateTime: Date | string;
  startWorkDate: Date | string;
  phoneNumber: string;
  orderServices: IServiceItem[];
}

export interface ISortedOrder extends IOrder {
  totalCost: number;
}
