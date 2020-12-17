import { WSServer } from "./wslib";
import { Token, User } from "./models";

//#region [ private ]
export const registerDebugEvent = (wss: WSServer<User, Token>) => {
    //#region [ hub events]
    wss.hub.onRegister.sub(e => console.log(`[wss][hub] onRegister service: ${e.service}, event: ${e.event}, isAuth: ${e.options.isAuth}, roles: ${e.options.roles}`));
    wss.hub.onPublish.sub(e => console.log(`[wss][hub] onPublish  service: ${e.descriptor.service}, event: ${e.descriptor.event}, clients: ${e.clients.map(x => x.id).join(',')}`));
    wss.hub.onSuscribed.sub(e => console.log(`[wss][hub]${e.error ? '[error]' : ''} onSuscribed service: ${e.service}, event: ${e.event}, client: ${e.client.id}${e.error ? `, ${JSON.stringify(e.error.message)}` : ''}`));
    wss.hub.onUnsuscribed.sub(e => console.log(`[wss][hub]${e.error ? '[error]' : ''} onUnsuscribed service: ${e.service}, event: ${e.event}, client: ${e.client.id}${e.error ? `, ${JSON.stringify(e.error.message)}` : ''}`));
    //#endregion

    //#region  [ rest events ]
    wss.rest.onRegister.sub(e => console.log(`[wss][rest] onRegister service: ${e.service}, method: ${e.method}, isAuth: ${e.options.isAuth}, roles: ${e.options.roles}`));
    wss.rest.onRequest.sub(e => console.log(`[wss][rest]${e.error ? '[error]' : ''} onRequest service: ${e.service}, method: ${e.method}, client: ${e.client.id}${e.error ? ', error: ' + e.error.message : ''}`));
    //#endregion
}

export const registerAuthDebugEvents = (wss: WSServer<User, Token>) => {

    //#region [ auth event ]
    wss.auth.onTimeout.sub(e => console.log(`[wss][auth] onTimeout client.id: ${e.id}: login or authenticate required in ${wss.auth.loginRequiredTimeout} millis.`));
    wss.auth.onAuthenticate.sub(e => console.log(`[wss][auth] onAuthenticate client.id: ${e.client.id}, authInfo:{  user: ${e.authInfo.user.email}, token:..., }`));
    wss.auth.onLogin.sub(e => console.log(`[wss][auth] onLogin client.id: ${e.client.id}, authInfo:{  user: ${e.authInfo.user.email}, token:..., }`));
    wss.auth.onLogout.sub(e => console.log(`[wss][auth] onLogout client.id: ${e.client.id},authInfo:{  user: ${e.authInfo.user.email}, token:..., }`));
    wss.auth.onRegister.sub(e => console.log(`[wss][auth] onRegister client.id: ${e.client.id}, authInfo:{  user: ${e.authInfo.user.email}, token:..., }`));
    //#endregion
}