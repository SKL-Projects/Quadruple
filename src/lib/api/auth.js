import { deleteProfile } from "./profile";

export const removeUser = async (uid) => {
   try {
      await deleteProfile(uid);
   } catch (err) {
      throw err;
   }
};
