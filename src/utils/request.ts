import { extend } from 'umi-request';
import { message } from 'antd';

const request = extend({
  prefix: '/api',
  timeout: 10000,
});
//   return {
//     url,
//     options: { ...options, headers },
//   };
// });

request.interceptors.request.use((url, options) => {
  const token = 'hello';

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return {
    url,
    options: { ...options, headers },
  };
});

request.interceptors.response.use(async (response) => {
  if (!response) {
    message.error('您的网络发生异常， 无法连接服务器');
  }
  const { status } = response;
  const result = await response.json();
  console.log(result);
  let errorText;
  // if (status === 422) {
  //   let errs = '';
  //   for (let key in result.errors) {
  //     errs += result.errors[key][0];
  //   }
  //   errorText = `[ ${errs} ]`;
  //   message.error(errorText);
  // }
  if (status === 400) {
    errorText += `[ ${result.message} ]`;
    message.error(errorText);
  }
  return response;
});
export default request;
