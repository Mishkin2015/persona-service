import ClientModel from '../../models/ClientModel';
import Ifi from '../../models/Ifi';
import Config from '../Config';
import matchIdentifierIfi from './matchIdentifierIfi';

interface Options {
  client: ClientModel;
  config: Config;
  ifi: Ifi;
}

export default ({ config, client, ifi }: Options) => {
  return config.state.personaIdentifiers.filter((identifier) => {
    return matchIdentifierIfi({ identifier, client, ifi });
  });
};
