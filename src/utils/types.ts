export enum TrackingType {
  Stock = "Stock",
  Page = "Page",
}

export type Tracking = {
  _id: string;
  title: string;
  url: string;
  type: TrackingType;
  username: string;
};
