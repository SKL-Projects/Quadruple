import { googleSignIn } from "../../../env";

export const config = {
   expoClientId: googleSignIn.expoGoClientId,
   androidClientId: googleSignIn.androidClientId,
   iosClientId: googleSignIn.iosClientId,
   webClientId: googleSignIn.webClientId,
   clientId: googleSignIn.clientId,
};
