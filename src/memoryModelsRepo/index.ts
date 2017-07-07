import commonMemoryRepo from 'jscommons/dist/memoryRepo';
import ModelsRepo from '../repoFactory/ModelsRepo';
import Config from './Config';

export default (config: Config): ModelsRepo => {
  return {
    ...commonMemoryRepo(config),
  };
};
