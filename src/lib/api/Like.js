import { fbStore, fbStoreObj } from "../../../firebase";

export const getLikeListApi = async (uid, planId) => {
   try {
      const res = await fbStore
         .collection(`${uid}/travelList/${planId}`)
         .doc("like")
         .get();
      return res.data();
   } catch (err) {
      console.log(err);
   }
};

export const addLikeBlock = async (uid, planId, obj) => {
   try {
      const res = await fbStore
         .collection(`${uid}/travelList/${planId}`)
         .doc("like")
         .update({ likes: fbStoreObj.FieldValue.arrayUnion(obj) });
      return res;
   } catch (err) {
      console.log(err);
      throw err;
   }
};

export const removeLikeBlock = async (uid, planId, obj) => {
   try {
      const res = await fbStore
         .collection(`${uid}/travelList/${planId}`)
         .doc("like")
         .update({ likes: fbStoreObj.FieldValue.arrayRemove(obj) });
      return res;
   } catch (err) {
      console.log(err);
      throw err;
   }
};
