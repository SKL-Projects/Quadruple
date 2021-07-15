import { fbStorageRef, fbStore } from "../../../firebase";

export const getProfile = async (uid) => {
   try {
      const res = await fbStore.collection(`${uid}`).doc("profile").get();
      return res.data();
   } catch (err) {
      console.log(err);
   }
};

export const updateProfileAvatar = async (uid, uri, profile) => {
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
               await fbStore
                  .collection(`${uid}`)
                  .doc("profile")
                  .set({ ...profile, avatar: url });
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
