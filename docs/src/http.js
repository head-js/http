// import axios from 'axios';
// import { create } from '../../dist/axios';
// import { create } from '../../dist/create';
import $http from '../../dist/http';


// const $axios = axios.create({});
// const $http = create({ instance: $axios });
// const $http = create({});


$http.get('https://httpbin.org/get').then(({ code, message, data, res }) => {
  console.log('🌀 $http.get(endpoint)');
  console.log(code, message, data, res);
});

$http.get('https://httpbin.org/get', { p1: 'P1' }).then(({ code, message, data, res }) => {
  console.log('🌀 $http.get(endpoint, params)');
  console.log(code, message, data, res);
});

$http.get('https://httpbin.org/get', { p1: 'P1' }, { 'x-h1': 'H1' }).then(({ code, message, data, res }) => {
  console.log('🌀 $http.get(endpoint, params, headers)');
  console.log(code, message, data, res);
});

$http.get('https://httpbin.org/get', null, { 'x-h1': 'H1' }).then(({ code, message, data, res }) => {
  console.log('🌀 $http.get(endpoint, null, headers)');
  console.log(code, message, data, res);
});

$http.get('https://httpbin.org/status/403')
  .then(({ code, message, data, res }) => {
    console.assert(false, '🌀 $http.get(endpoint) 403');
    console.log(code, message, data, res);
  })
  .catch(({ code, message, data, res }) => {
    console.log('💊 $http.get(endpoint) 403');
    console.log(code, message, data, res);
  });

const ac = new AbortController();

$http.get('https://polyfills.vercel.app/api/sleep/2/seconds', null, null, { signal: ac.signal })
  .then(({ code, message, data, res }) => {
    console.assert(false, '🌀 $http.get(endpoint) Cancel');
  })
  .catch(({ code, message, data, res }) => {
    console.log('💊 $http.get(endpoint) Cancel');
    console.log(code, message, data, res);
  });

setTimeout(() => {
  ac.abort();
}, 1000);

$http.get('https://polyfills.vercel.app/api/raise-500/standard')
  .then(({ code, message, data, res }) => {
    console.assert(false, '🌀 $http.get(endpoint) 500');
    console.log(code, message, data, res);
  })
  .catch(({ code, message, data, res }) => {
    console.log('💊 $http.get(endpoint) 500');
    console.log(code, message, data, res);
  });

$http.get('https://polyfills.vercel.app/api/raise-500/text')
  .then(({ code, message, data, res }) => {
    console.assert(false, '🌀 $http.get(endpoint) 500');
    console.log(code, message, data, res);
  })
  .catch(({ code, message, data, res }) => {
    console.log('💊 $http.get(endpoint) 500');
    console.log(code, message, data, res);
  });

$http.post('https://polyfills.vercel.app/api/set-authn', null, { username: 'username' }).then(({ code, message, data, res }) => {
  console.log('🌀 $http.post(endpoint) x-set-authn');
  console.log(code, message, data, res);
});

$http.post('https://httpbin.org/post', null, { d1: 'D1' }).then(({ code, message, data, res }) => {
  console.log('🌀 $http.post(endpoint, null, data)');
  console.log(code, message, data, res);
});

$http.post('https://httpbin.org/post', { p1: 'P1' }, { d1: 'D1' }).then(({ code, message, data, res }) => {
  console.log('🌀 $http.post(endpoint, params, data)');
  console.log(code, message, data, res);
});

$http.post('https://httpbin.org/post', { p1: 'P1' }, { d1: 'D1' }, { 'x-h1': 'H1' }).then(({ code, message, data, res }) => {
  console.log('🌀 $http.post(endpoint, params, data, headers)');
  console.log(code, message, data, res);
});

$http.post('https://httpbin.org/post', null, { d1: 'D1' }, { 'x-h1': 'H1' }).then(({ code, message, data, res }) => {
  console.log('$http.post(endpoint, null, params, headers)');
  console.log(code, message, data, res);
});

window.head = window.head || {};
window.head.$http = $http;
