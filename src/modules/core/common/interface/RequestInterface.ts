export enum GamingProviderEnum {
  ARP_STUDIO = 'ARP_STUDIO',
  EVOLUTION = 'EVOLUTION',
  VELA_GAMING = 'VELA_GAMING',
  OPMG = 'OPMG'
}
export interface RequestInterface {
  gameProvider: GamingProviderEnum;
  // request: any;
}

export interface QueryResponse {
	totalRecords: number;
	totalPages: number;
	page: number;
	limit: number;
	data: Array<any>;
}

export interface RequestQuery {
	status?: string;
	keyword?: string;
	orderBy?: string;
	page?: number;
	limit?: number;
}