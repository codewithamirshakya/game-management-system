export interface AsyncEventDispatcherInterface {
  dispatch(eventName: string, metaData: any);
}