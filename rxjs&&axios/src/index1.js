



// import './js/day_4_17.js';
// import './js/day_4_18.js';
// import './js/day_4_19.js';
// import './js/day_4_23';
// import './js/day_4_24.js';
// import './js/day_4_25.js';

import axios from 'axios/lib/axios';

// Add a request interceptor
debugger
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log('interception--config', config);
  debugger
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  console.log('interception--response', response);
  debugger;
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});
debugger
axios.get('https://www.tianqiapi.com/api/')
  .then(function (response) {
    const data = response.data;
    document.getElementById('people').innerHTML = data.data.map(function (person) {
      return (
        '<li class="row">' +
          '<div class="col-md-3">' +
            '<strong>' + person.day + '</strong>' +
            '<div>Github: <a href="https://github.com/' + person.day + '" target="_blank">' + person.date + '</a></div>' +
            '<div>Github: <a href="https://github.com/' + person.tem1 + '" target="_blank">' + person.tem1 + '</a></div>' +
            '<div>Twitter: <a href="https://twitter.com/' + person.week + '" target="_blank">' + person.wea + '</a></div>' +
          '</div>' +
        '</li><br/>'
      );
    }).join('');
  })
  .catch(function (err) {
    document.getElementById('people').innerHTML = '<li class="text-danger">' + err.message + '</li>';
  });

// axios.all([
//   axios.get('https://api.github.com/users/mzabriskie', {params: {
//     ID: 12345
//   }}),
//   axios.get('https://api.github.com/users/mzabriskie/orgs')
// ]).then(axios.spread(function (user, orgs) {
//   debugger;
//   document.getElementById('useravatar').src = user.data.avatar_url;
//   document.getElementById('username').innerHTML = user.data.name;
//   document.getElementById('orgs').innerHTML = orgs.data.map(function (org) {
//     return (
//       '<li class="row">' +
//         '<img src="' + org.avatar_url + '" class="col-md-1"/>' +
//         '<div class="col-md-3">' +
//           '<strong>' + org.login + '</strong>' +
//         '</div>' +
//       '</li>'
//     );
//   }).join('');
// }));

// transform
// var ISO_8601 = /(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})Z/;
// function formatDate(d) {
//   return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
// }
// axios.get('https://api.github.com/users/mzabriskie', {
//     transformResponse: axios.defaults.transformResponse.concat(function (data, headers) {
//       debugger
//       Object.keys(data).forEach(function (k) {
//         if (ISO_8601.test(data[k])) {
//           data[k] = new Date(Date.parse(data[k]));
//         }
//       });
//       return data;
//     })
//   })
//   .then(function (res) {
//     debugger
//     document.getElementById('useravatar').src = res.data.avatar_url;
//     document.getElementById('username').innerHTML = res.data.name;
//     document.getElementById('created').innerHTML = formatDate(res.data.created_at);
//     document.getElementById('updated').innerHTML = formatDate(res.data.updated_at);
//   });

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker1.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}