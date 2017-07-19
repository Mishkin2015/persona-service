import NoModel from 'jscommons/dist/errors/NoModel';
import GetProfilesOptions from '../serviceFactory/options/GetProfilesOptions';
import GetProfilesResult from '../serviceFactory/results/GetProfilesResult';
import Config from './Config';
import getIdentifierByIfi from './utils/getIdentifierByIfi';

export default (config: Config) => {
  return async (opts: GetProfilesOptions): Promise<GetProfilesResult> => {
    try {
      const personaIdentifier = await getIdentifierByIfi({
        agent: opts.agent,
        client: opts.client,
        config,
      });
      const profileIds = (await config.repo.getProfiles({
        client: opts.client,
        personaIdentifier,
      })).profileIds;

      return { profileIds };
    } catch (err) {
      if (err !== null && err !== undefined && err.constructor === NoModel) {
        return { profileIds: [] };
      }
      /* istanbul ignore next */
      throw err;
    }
  };
};
