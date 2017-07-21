import NoModel from 'jscommons/dist/errors/NoModel';
import EtagPrecondition from '../errors/EtagPrecondition';
import DeleteProfileOptions from '../repoFactory/options/DeleteProfileOptions';
import DeleteProfileResult from '../repoFactory/results/DeleteProfileResult';
import Config from './Config';
import matchProfileIdentifier from './utils/matchProfileIdentifier';

export default (config: Config) => {
  return async (opts: DeleteProfileOptions): Promise<DeleteProfileResult> => {
    const storedProfiles = config.state.agentProfiles;
    const client = opts.client;
    const personaIdentifier = opts.personaIdentifier;
    let existingId: string|undefined;
    let existingContentType: string|undefined;
    const remainingProfiles = storedProfiles.filter((profile) => {
      const isMatch = (
        matchProfileIdentifier({ client, personaIdentifier, profile }) &&
        profile.profileId === opts.profileId
      );

      if (isMatch) {
        existingId = profile.id;
        existingContentType = profile.contentType;

        if (opts.ifMatch !== undefined && profile.etag !== opts.ifMatch) {
          throw new EtagPrecondition();
        }
      }

      return !isMatch;
    });

    if (existingId !== undefined && existingContentType !== undefined) {
      config.state.agentProfiles = remainingProfiles;
      return { id: existingId, contentType: existingContentType };
    }

    /* istanbul ignore next */
    throw new NoModel('Agent Profile');
  };
};
