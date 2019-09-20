import jsonServerProvider from 'prophet-data-json-server';
const dataProvider = jsonServerProvider('http://localhost:996');

export default dataProvider;

// import { GET_LIST, GET_ONE, CREATE, UPDATE, DELETE } from 'prophet-core';
// import { stringify } from 'query-string';

// const list = {
//     data: [
//         {
//             id: 1,
//             username: '1',
//             nickName: '2',
//             address_id: '3',
//             phone: '4',
//             create_time: '5',
//             status: '6',
//         },
//         {
//             id: 2,
//             username: '1',
//             nickName: '2',
//             address_id: '3',
//             phone: '4',
//             create_time: '5',
//             status: '6',
//         },
//     ],
//     total: 50,
// };

// const dataProvider = (apiUrl = './api', httpClient = fetch) => {
//     return (type, resource, params) => {
//         switch (type) {
//             case GET_LIST:
//                 return list;
//             case GET_ONE:
//                 return list;
//             case CREATE:
//                 return { data: { ...params.data, id: 99 } };
//             case UPDATE:
//                 return list;
//             case DELETE:
//                 return list;
//             default:
//                 throw new Error(`不支持action类型 ${type}`);
//         }
//     };
// };

// export default dataProvider('http://localhost:996');
