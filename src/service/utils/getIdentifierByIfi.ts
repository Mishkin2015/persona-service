import ClientModel from '../../models/ClientModel';
import Config from '../Config';
import getIfiFromAgent from './getIfiFromAgent';
import validateAgent from './validateAgent';

interface Options {
  config: Config;
  client: ClientModel;
  agent: any;
}

export default async ({ config, client, agent }: Options) => {
  // Validates agent.
  validateAgent(agent, ['agent']);

  // Finds Identifier using Agent.
  const ifi = getIfiFromAgent(agent);
  const getIdentifierResult = await config.repo.getIdentifierByIfi({ client, ifi });
  return getIdentifierResult.identifierId;
};