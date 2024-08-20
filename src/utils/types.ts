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
  date_created: number;
  date_updated: number;
  date_changed: number;
  in_stock: boolean;
  trigger_text: string;
  time_between_checks: string;
};
