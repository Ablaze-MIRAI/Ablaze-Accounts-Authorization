import environment from "@/environment";
import { prisma } from "@/library/prisma";

const GITHUB_TOKEN_ENDPOINT = "https://github.com/login/oauth/access_token";
const GITHUB_API_USER = "https://api.github.com/user";

type OAuth2TokenResponse = {
  access_token: string,
  scope: string,
  token_type: string
} & {
  error: string,
  error_description: string,
  error_uri: string
}

export const getToken = async (code: string): Promise<OAuth2TokenResponse> =>{
  const formdata = new FormData();
  formdata.append("client_id", environment.GITHUB_CLIENT_ID);
  formdata.append("client_secret", environment.GITHUB_CLIENT_SECRET);
  formdata.append("redirect_uri", environment.GITHUB_REDIRECT_URI);
  formdata.append("code", code);

  const response = await fetch(GITHUB_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Accept": "application/json"
    },
    body: formdata
  });

  const body = await response.json();

  return body as OAuth2TokenResponse;
};

export const getGitHubUser = async (token: string) =>{
  const response = await fetch(GITHUB_API_USER, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if(!response.ok) return undefined;

  const user = await response.json();

  return user;
};

export const getUserByGitHub = async (github_uid: string) =>{
  const user = await prisma.idpGitHub.findUnique({
    where: { githubid: github_uid },
    select: {
      user: {
        select: {
          uid: true,
          screen_name: true,
          avatar: true
        }
      }
    }
  });

  return user;
};

export const getUserByEmail = async (email: string) =>{
  const user = await prisma.idpEmail.findUnique({
    where: { email: email },
    select: {
      user: {
        select: {
          screen_name: true,
          avatar: true
        }
      }
    }
  });

  return user;
};
