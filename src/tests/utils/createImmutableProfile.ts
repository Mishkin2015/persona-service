import * as stringToStream from 'string-to-stream';
import service from '../../tester';
import {
  TEST_CLIENT,
  TEST_CONTENT,
  TEST_OPENID_AGENT,
  TEST_PROFILE_ID,
  TEXT_CONTENT_TYPE,
} from './values';

export default async () => {
  await service.overwriteProfile({
    agent: TEST_OPENID_AGENT,
    client: TEST_CLIENT,
    content: stringToStream(TEST_CONTENT),
    contentType: TEXT_CONTENT_TYPE,
    profileId: TEST_PROFILE_ID,
  });
};