import { fbStore, fbStoreObj } from "../../../firebase";

export const addTravelBlock = async (uid, planId, obj) => {
   try {
      const res = await fbStore
         .collection(`${uid}/travelList/${planId}`)
         .doc("plans")
         .update({ plans: fbStoreObj.FieldValue.arrayUnion(obj) });
      return res;
   } catch (err) {
      console.log(err);
   }
};
