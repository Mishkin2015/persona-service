import CommonService from 'jscommons/dist/serviceFactory/Service';
import DeleteProfileOptions from './options/DeleteProfileOptions';
import GetProfileOptions from './options/GetProfileOptions';
import GetProfilesOptions from './options/GetProfilesOptions';
import OverwriteProfileOptions from './options/OverwriteProfileOptions';
import PatchProfileOptions from './options/PatchProfileOptions';
import GetProfileResult from './results/GetProfileResult';
import GetProfilesResult from './results/GetProfilesResult';

interface Service extends CommonService {
  deleteProfile: (opts: DeleteProfileOptions) => Promise<void>;
  getProfile: (opts: GetProfileOptions) => Promise<GetProfileResult>;
  getProfiles: (opts: GetProfilesOptions) => Promise<GetProfilesResult>;
  overwriteProfile: (opts: OverwriteProfileOptions) => Promise<void>;
  patchProfile: (opts: PatchProfileOptions) => Promise<void>;
}

export default Service;