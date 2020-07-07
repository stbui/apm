// import { SERVER_URL } from './constant'

// const resources_url = SERVER_URL + 'resources';

// function getQueryString(name) { }

// function wasUrl(baseUrl) {
//     return baseUrl && SERVER_URL && isLocalUrl(baseUrl) && !isServerUrl(baseUrl);
// }

// function isLocalUrl(baseUrl) {
//     return !baseUrl.startsWith('data:') && !baseUrl.startsWith('file:');
// }

// function isServerUrl(baseUrl) {
//     return baseUrl.startsWith(resources_url);
// }

// export class URLTransformer {
//     encodedBaseUrl: string
//     sessionId: string

//     constructor(baseUrl: string, sessionId: string) {
//         this.encodedBaseUrl = encodeURIComponent(baseUrl);
//         this.sessionId = sessionId;
//     }

//     transform(baseUrl: string) {
//         if (!wasUrl(baseUrl)) {
//             return baseUrl;
//         }

//         let url = resources_url;

//         const queryObject = {
//             url: encodeURIComponent(baseUrl),
//             base: this.encodedBaseUrl,
//             session_id: this.sessionId,
//         };

//         url += getQueryString(queryObject);

//         return url;
//     }
// }
