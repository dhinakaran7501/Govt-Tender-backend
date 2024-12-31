// To Write Reusable functions

import { CronJob } from 'cron';
import logger from './logger';
import { JobSchedulerProps } from '../types/helpers.type';

export const JobScheduler = ({
  cronTime,
  yourTaskFunction,
}: JobSchedulerProps) => {
  const job = new CronJob(cronTime, yourTaskFunction);
  job.start();
  logger.info(`Job scheduled to run at: ${cronTime}`);
};

// const MyTask = () => {
//   console.log("MY TASK");
// };

// JobScheduler({ cronTime: "* * * * * *", yourTaskFunction: MyTask });
