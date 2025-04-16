export type JobSchedulerProps = {
  cronTime: string;
  yourTaskFunction: () => void;
};
export interface ErrorDetails {
  statusCode: number;
  errorMessage: string;
}
