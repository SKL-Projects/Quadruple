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

export const removeTravelBlock = async (uid, planId, obj) => {
   try {
      const res = await fbStore
         .collection(`${uid}/travelList/${planId}`)
         .doc("plans")
         .update({ plans: fbStoreObj.FieldValue.arrayRemove(obj) });
      return res;
   } catch (err) {
      console.log(err);
   }
};

export const editTravelBlock = async (uid, planId, prevBlock, newBlock) => {
   try {
      await removeTravelBlock(uid, planId, prevBlock);
      await addTravelBlock(uid, planId, newBlock);
   } catch (err) {
      console.log(err);
   }
};

export const changeSequence = async (uid, planId, data) => {
   try {
      await fbStore
         .collection(`${uid}/travelList/${planId}`)
         .doc("plans")
         .update({
            plans: data,
         });
   } catch (err) {
      console.log(err);
   }
};
