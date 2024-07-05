export enum TrackingType {
  Stock = 'Stock',
  Page = 'Page',
}

export type Tracking = {
  id: number | string;
  title: string;
  url: string;
  type: TrackingType;
  user: string;
};
