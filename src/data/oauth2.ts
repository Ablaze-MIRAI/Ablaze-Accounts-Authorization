import "server-only";

import environment from "@/environment";
import { secondsAgo } from "@/library/utils";
import { generateOAuth2Code } from "@/library/keygenerator";
import { prisma } from "@/library/prisma";
import { createHashWithExpire, deleteKey, getHash } from "@/library/kv";
import type { $Enums } from "@prisma/client";
import type { OAuth2CodeStore } from "@/typings/oauth2";

export const getUserAcceptStatus = async (uid: string, client_id: string) =>{
  const status = await prisma.acceptApp.findFirst({
    where: { uid: uid, client_id: client_id }
  });

  return status;
};

export const createOAuth2Code = async (uid: string, rid: string, cid: string, scope: string, client_type: $Enums.ClientType) =>{
  const codestore: OAuth2CodeStore = {
    uid: uid,
    rid: rid,
    client_id: cid,
    scope: scope,
    client_type: client_type
  };

  const code = generateOAuth2Code();
  await createHashWithExpire(
    environment.OAUTH2_STORE_PREFIX,
    code,
    environment.OAUTH2_CODE_EXPIRES,
    codestore
  );

  return code;
};

export const createAcceptApp = async (uid: string, client_id: string) =>{
  return await prisma.$transaction(async (p) =>{
    const isfound = await p.acceptApp.findFirst({
      where: {
        uid: uid,
        client_id: client_id
      }
    });

    if(isfound) return;

    await p.acceptApp.create({
      data: {
        uid: uid,
        client_id: client_id
      }
    });
  });
};

export const getOAuth2Code = async (code: string): Promise<OAuth2CodeStore | undefined> =>{
  const data = await getHash(environment.OAUTH2_STORE_PREFIX, code);
  await deleteKey(environment.OAUTH2_STORE_PREFIX, code);
  return data;
};

export const createOAuth2Refresh = async (token: string, code: OAuth2CodeStore, rid: string | null) =>{
  return await prisma.refreshToken.create({
    data: {
      token: token,
      expiration: secondsAgo(environment.OIDC_REFRESH_EXPIRES),
      client_id: code.client_id,
      client_type: code.client_type,
      uid: code.uid,
      scope: code.scope,
      rid: rid
    }
  });
};

export const getUserUid = async (uid: string) =>{
  return prisma.user.findUnique({
    select: { screen_name: true, avatar: true, account_type: true },
    where: { uid: uid }
  });
};

export const updateOAuth2Refresh = async (token: string, newtoken: string) =>{
  try{
    return await prisma.refreshToken.update({
      where: { token: token },
      data: { token: newtoken }
    });
  }catch(e){
    console.log(e);
    return undefined;
  }
};

export const getRefreshTokenByToken = async (token: string) =>{
  return await prisma.refreshToken.findUnique({
    where: { token: token },
    select: {
      client_id: true,
      scope: true,
      updatedAt: true,
      user: {
        select: {
          uid: true,
          screen_name: true,
          avatar: true,
          account_type: true
        }
      }
    }
  });
};
