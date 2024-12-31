export type JobSchedulerProps = {
  cronTime: string;
  yourTaskFunction: () => void;
};
