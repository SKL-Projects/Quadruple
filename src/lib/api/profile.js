import { fbAuth, fbStorageRef, fbStore } from "../../../firebase";

export const getProfile = async () => {
   try {
      const res = await fbAuth.currentUser;
      return res;
   } catch (err) {
      throw err;
   }
};

export const updateProfileAvatar = async (uid, uri, user) => {
   try {
      const response = await fetch(uri);
      const blob = await response.blob();

      var metadata = {
         contentType: "image/png",
      };

      const ref = fbStorageRef.child(`avatars/${uid}.png`);

      const task = ref.put(blob, metadata);

      return new Promise((resolve, reject) => {
         task.then(
            async (snapshot) => {
               const url = await snapshot.ref.getDownloadURL();

               await user.updateProfile({ photoURL: url });
               resolve(url);
            },
            (err) => reject(err)
         );
      });
   } catch (err) {
      console.log(err);
      return false;
   }
};

export const updateDisplayName = async (user, newName) => {
   try {
      const res = await user.updateProfile({ displayName: newName });
      return res;
   } catch (err) {
      throw err;
   }
};

export const deleteProfile = async (uid) => {
   try {
      var desertRef = fbStorageRef.child(`avatars/${uid}.png`);
      await desertRef.delete();
   } catch (err) {
      throw err;
   }
};
