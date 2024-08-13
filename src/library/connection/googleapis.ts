import environment from "@/environment";
import { google } from "googleapis";

export const createGoogleOAuth2Client = () =>{
  return new google.auth.OAuth2({
    clientId: environment.GOOGLE_CLIENT_ID,
    clientSecret: environment.GOOGLE_CLIENT_SECRET,
    redirectUri: environment.GOOGLE_REDIRECT_URI
  });
};
