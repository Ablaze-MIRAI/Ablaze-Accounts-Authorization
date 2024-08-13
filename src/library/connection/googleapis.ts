import environment from "@/environment";
import googleapis from "googleapis";

export const createGoogleOAuth2Client = () =>{
  return new googleapis.Auth.OAuth2Client({
    clientId: environment.GOOGLE_CLIENT_ID,
    clientSecret: environment.GOOGLE_CLIENT_SECRET,
    redirectUri: environment.GOOGLE_REDIRECT_URI
  });
};
