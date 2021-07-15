import { fbAuth } from "../../../../firebase";
import { signout } from "../../../modules/auth";
import { clearProfile } from "../../../modules/profile";

export default async function logout(auth, dispatch) {
   await fbAuth.signOut();
   dispatch(signout());
   dispatch(clearProfile());
}
