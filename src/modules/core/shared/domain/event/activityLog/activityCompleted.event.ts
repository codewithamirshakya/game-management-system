
export class ActivityCompletedEvent {
  constructor(
    public readonly gamingProvider : number,
    public readonly activityType : string,
    public readonly description: string,
    public readonly ipAddress: string,
    public readonly browserAgent: string,
    public readonly userId? : number,
    public readonly objectId?: string,
    public readonly objectClass?: string,
  ) {
  }
}