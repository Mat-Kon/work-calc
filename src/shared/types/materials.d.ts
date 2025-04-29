import { IServiceItemData } from './my-services';

export interface IMaterialItemData extends Omit<IServiceItemData, 'nameService'> {
  name: string;
}
