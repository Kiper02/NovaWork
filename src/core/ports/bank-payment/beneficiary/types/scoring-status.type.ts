export interface IScoringStatusPortResult {
  beneficiaryId: string;
  status: 'SUCCEEDED' | 'FAILED' | 'PENDING';
  warnings?: Array<{
    code: string;
    description: string;
  }>;
}

export interface IScoringStatusQueryParams {
  beneficiaryId?: string;
  passed?: boolean;
  page?: number;
  limit?: number;
}

export interface IPaginatedScoringStatusResult {
  items: IScoringStatusPortResult[];
  total: number;
  page: number;
  limit: number;
}