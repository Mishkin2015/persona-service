import * as promiseRetry from 'promise-retry';
import InvalidGetPersonaFromIdentifierOptions from // tslint:disable:import-spacing
  '../../errors/InvalidGetPersonaFromIdentifierOptions';
import UnassignedPersonaOnIdentifier from '../../errors/UnassignedPersonaOnIdentifier';
import logger from '../../logger';
import ClientModel from '../../models/ClientModel';
import Identifier from '../../models/Identifier';
import Config from '../Config';

export interface GetPersonaIdFromIdentifierOptions {
  readonly client: ClientModel;
  readonly config: Config;
  readonly identifier: Identifier;
  readonly wasCreated: boolean;
}
const getPersonaIdFromIdentifier = async ({
  client,
  config,
  identifier,
  wasCreated, // Was identifier created, if so, create a Persona.
}: GetPersonaIdFromIdentifierOptions): Promise<string> => {
  if (wasCreated && identifier.persona !== undefined) {
    throw new InvalidGetPersonaFromIdentifierOptions(
      'Identifier was marked as wasCreated, but allready had a persona on it',
    );
  }
  if (wasCreated) {
    const {persona} = await config.repo.createPersona({ client });
    await config.repo.setIdentifierPersona({
      id: identifier.id,
      persona: persona.id,
    });
    return persona.id;
  } else if (!wasCreated && identifier.persona !== undefined) {
    return identifier.persona;
  } else /* if (!wasCreated && identifier.persona === undefined) */ {
    // Shouldn't happen, but just in case, retry 3 times, with backoff

    return promiseRetry<string>(async (retry) => {
      const {identifier: identifier2} = await config.repo.getIdentifier({
        client,
        id: identifier.id,
      });

      if (identifier2.persona === undefined) {
        logger.warn('uploadproflies retrying finding identifier persona');
        return retry(new UnassignedPersonaOnIdentifier());
      }

      return identifier2.persona;
    }, {
      maxTimeout: 300,
      minTimeout: 50,
      retries: 3,
    });
  }
};

export default getPersonaIdFromIdentifier;