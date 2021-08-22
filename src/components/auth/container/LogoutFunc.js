import { fbAuth } from "../../../../firebase";
import { signout } from "../../../modules/auth";

export default async function logout(dispatch) {
   await fbAuth.signOut();
   dispatch(signout());
}
