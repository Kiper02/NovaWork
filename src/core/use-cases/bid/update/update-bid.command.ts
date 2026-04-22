export interface IUpdateBidCommand {
  bidId: string;
  coverLetter?: string;
  amount?: number;
  userId: string;
}