export interface ILoginHistory {
  id: number;
  userAgent: string;
  createDate: string;
  updateDate: string;
  version: number;
}

export interface IRequestLoginHistory {
  getParams: {
    id: number;
    pageNumber: number;
  }
}
