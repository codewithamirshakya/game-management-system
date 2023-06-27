export interface TestDataInterface {
    title?: string;

    description?: string;

    name?: string;

}

export interface DataListRequest {
    attributes: QueryList;
  
  }

  interface QueryList {
    page?: number;
    order?: string;
    offset?: number;
    limit?: number;
  }
