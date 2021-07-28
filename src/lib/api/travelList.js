import { fbStore } from "../../../firebase";

export const getAllTravelList = async (uid) => {
   try {
      const collectionNames = await (
         await fbStore.collection(`${uid}`).doc("travelList").get()
      ).data().collectionNames;
      let travelList = [];

      await Promise.all(
         collectionNames.map(async (name) => {
            const res = await fbStore
               .collection(`${uid}/travelList/${name}`)
               .get();
            let obj = {};
            res.forEach((doc) => {
               obj[`${doc.id}`] = doc.data();
            });
            travelList.push(obj);
         })
      );
      return travelList;
   } catch (err) {
      console.log(err);
   }
};