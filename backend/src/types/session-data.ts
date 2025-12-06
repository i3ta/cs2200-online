import "express-session";

declare module "express-session" {
  interface SessionData {
    casUser?: string;
    casUserInfo?: {
      authenticationdate?: string;
      authenticationmethod?: string;
      authncontextclass?: string;
      bypassmultifactorauthentication?: string;
      clientipaddress?: string;
      credentialtypes?: string;
      geolocation?: string;
      isfromnewlogin?: string;
      longtermauthenticationrequesttokenused?: string;
      samlauthenticationstatementauthmethod?: string;
      uid?: string;
      useragent?: string;
      mail?: string;
      gtunmaskeddisplayname?: string;
      telephoneNumber?: string;
    };
    returnUrl?: string;
    cas_return_to?: string;
    user?: any;
  }
}
