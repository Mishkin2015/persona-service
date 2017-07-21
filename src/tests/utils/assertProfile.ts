import * as assert from 'assert';
import * as streamToString from 'stream-to-string';
import service from '../../tester';
import { TEST_CLIENT, TEST_PROFILE_ID } from './values';

export default async (agent: any, content: string) => {
  const expectedProfileIds = [TEST_PROFILE_ID];

  // Checks the profileIds.
  const agentProfilesResult = await service.getProfiles({
    agent,
    client: TEST_CLIENT,
  });
  const actualProfileIds = agentProfilesResult.profileIds;
  assert.deepEqual(actualProfileIds, expectedProfileIds);

  // Checks the content.
  const agentProfileResult = await service.getProfile({
    agent,
    client: TEST_CLIENT,
    profileId: TEST_PROFILE_ID,
  });
  const actualContent = await streamToString(agentProfileResult.content);
  assert.equal(actualContent, content);
  assert.equal(agentProfileResult.updatedAt.constructor, Date);
  assert.equal(agentProfileResult.etag.constructor, String);
};
