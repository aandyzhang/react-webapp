const headers = new Headers({
  Accept: "application/json",
  "Content-Type": "application/json",
});


function get(url) {
  return fetch(url, {
    method: "GET",
    headers: headers
  }).then(response => {
    return handleResponse(url, response);
  });
}

function post(url,params) {
  return fetch(url,{
    method: "POST",
    headers: headers,
    body: params
  }).then(response => {
    return handleResponse(url, response)
  })
}

function handleResponse(url, response) {
  if (response.status === 200) {
    return response.json();
  } else {
    console.error(`Request failed. Url = ${url}`);
    return Promise.reject({
      error: { message: "Request failed due to server error" }
    });
  }
}


//封装ajax

const getData = url => {
  let promise = new Promise((resolve,reject) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = "json"
      xhr.open("GET",url);
      xhr.send(null);
      xhr.onload = ()=> {
        if(xhr.status == 200){
          return resolve(xhr.response)
        }else{
          return reject(xhr.statusText)
        }
      }
  })
  return promise;
}

export { get, post,getData };


