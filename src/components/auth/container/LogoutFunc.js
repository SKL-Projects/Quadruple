import { fbAuth } from "../../../../firebase";
import { signout } from "../../../modules/auth";

export default async function logout(auth, dispatch) {
   await fbAuth.signOut();
   dispatch(signout());
}
