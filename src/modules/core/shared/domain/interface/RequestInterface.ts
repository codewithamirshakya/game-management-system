export enum GamingProviderEnum {
  ARP_STUDIO = 'ARP_STUDIO',
  EVOLUTION = 'EVOLUTION',
  VELA_GAMING = 'VELA_GAMING'
}
export interface RequestInterface {
  gameProvider: GamingProviderEnum;
  // request: any;
}