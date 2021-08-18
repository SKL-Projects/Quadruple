import { fbStore, fbStoreObj } from "../../../firebase";

export const getPlans = async (uid, planId) => {
   try {
      const res = await fbStore
         .collection(`${uid}/travelList/${planId}`)
         .doc("plans")
         .get();
      return res.data();
   } catch (err) {
      throw err;
   }
};

export const addTravelBlock = async (uid, planId, obj) => {
   try {
      const res = await fbStore
         .collection(`${uid}/travelList/${planId}`)
         .doc("plans")
         .update({ plans: fbStoreObj.FieldValue.arrayUnion(obj) });
      return res;
   } catch (err) {
      throw err;
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
      throw err;
   }
};

export const editTravelBlock = async (uid, planId, prevBlock, newBlock) => {
   try {
      await removeTravelBlock(uid, planId, prevBlock);
      await addTravelBlock(uid, planId, newBlock);
   } catch (err) {
      throw err;
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
      throw err;
   }
};
