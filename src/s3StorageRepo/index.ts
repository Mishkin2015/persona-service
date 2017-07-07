import commonS3Repo from 'jscommons/dist/s3Repo';
import StorageRepo from '../repoFactory/StorageRepo';
import Config from './Config';

export default (config: Config): StorageRepo => {
  return {
    ...commonS3Repo(config),
  };
};
