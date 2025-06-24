type CustomPublicMetadata = {
  dbUserId?: string;
}

export type CustomSessionClaims = {
  publicMetadata?: CustomPublicMetadata;
  [key: string]: any;
}