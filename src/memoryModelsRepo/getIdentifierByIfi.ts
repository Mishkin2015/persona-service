import NoModel from 'jscommons/dist/errors/NoModel';
import GetIdentifierByIfiOptions from '../repoFactory/options/GetIdentifierByIfiOptions';
import GetIdentifierByIfiResult from '../repoFactory/results/GetIdentifierByIfiResult';
import Config from './Config';
import getIdentifiersMatchingIfi from './utils/getIdentifiersMatchingIfi';

export default (config: Config) => {
  return async (opts: GetIdentifierByIfiOptions): Promise<GetIdentifierByIfiResult> => {
    const matchingIdentifiers = getIdentifiersMatchingIfi({
      config,
      ifi: opts.ifi,
      organisation: opts.organisation,
    });

    const isExistingIfi = matchingIdentifiers.length !== 0;
    if (!isExistingIfi) {
      throw new NoModel('Persona Identifier');
    }

    const identifierId = matchingIdentifiers[0].id;
    const personaId = matchingIdentifiers[0].persona;
    return { identifierId, personaId };
  };
};
