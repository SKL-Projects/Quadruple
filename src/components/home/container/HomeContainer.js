import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../../lib/api/profile";
import { signin } from "../../../modules/auth";
import Home from "../view/Home";

function HomeContainer({ navigation }) {
   const auth = useSelector(({ auth }) => auth);
   const dispatch = useDispatch();
   useEffect(() => {
      if (!auth.signined) {
         const authPersist = async () => {
            const res = await getProfile();
            if (res) dispatch(signin(res));
         };
         setTimeout(() => authPersist(), 600);
      }
   }, [auth]);

   return <Home navigation={navigation} />;
}

export default HomeContainer;
