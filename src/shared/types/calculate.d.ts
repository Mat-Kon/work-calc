import { IServiceItemData } from './my-services';

export interface IServiceItem extends IServiceItemData {
  value: number;
  cost: number;
}

export interface Order {
  id: string;
  name: string;
  address: string;
  meetingDateTime: Date;
  startWorkDate: Date;
  phoneNumber: number;
  orderServices: IServiceItem[];
}
