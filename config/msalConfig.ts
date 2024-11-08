// https://github.com/Azure-Samples/ms-identity-ciam-javascript-tutorial/blob/main/1-Authentication/0-sign-in-vanillajs/App/public/authConfig.js
// https://github.com/Shivanik97/msal-auth-vue/blob/main/src/config/msalConfig.ts

import {
    PublicClientApplication,
    type AccountInfo,
    type RedirectRequest,
    LogLevel
  } from "@azure/msal-browser"
  import { reactive } from 'vue'

  /**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */
export const msalConfig = {
    auth: {
        clientId: 'Enter_the_Application_Id_Here', // This is the ONLY mandatory field that you need to supply.
        authority: 'https://Enter_the_Tenant_Subdomain_Here.ciamlogin.com/', // Replace the placeholder with your tenant subdomain        
        redirectUri: 'http://localhost:3000/redirect', // You must register this URI on Microsoft Entra admin center/App Registration. Defaults to window.location.href e.g. http://localhost:3000/
        navigateToLoginRequestUrl: true, // If "true", will navigate back to the original request location before processing the auth code response.
    },
    cache: {
        cacheLocation: 'sessionStorage', // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO.
        storeAuthStateInCookie: false, // set this to true if you have to support IE
    },
    system: {
        loggerOptions: {
            loggerCallback: (level:LogLevel, message:string, containsPii:boolean) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            },
        },
    },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const graphScopes: RedirectRequest  = {
    scopes: [ "User.Read" ],
};

/**
 * An optional silentRequest object can be used to achieve silent SSO
 * between applications by providing a "login_hint" property.
 */

// const silentRequest = {
//   scopes: ["openid", "profile"],
//   loginHint: "example@domain.net"
// };

export const state = reactive({
    isAuthenticated: false,
    user: null as AccountInfo | null
  })
  
  export const msalInstance = new PublicClientApplication(msalConfig)