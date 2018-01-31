import * as types from '../actions/drupalAPITypes';

class drupalAPI {

  static getAllDrupal(API_LOC = types.DRUPAL_API_LOC) {
    console.log('getAllDrupal()');
    return fetch(API_LOC).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static getAllDrupalImg(API_LOC = types.DRUPAL_API_LOC) {
    console.log('getAllDrupalImg()');
    return fetch(API_LOC).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  // var url = 'https://example.com/profile';
  // var data = {username: 'example'};

  // fetch(url, {
  //   method: 'POST', // or 'PUT'
  //   body: JSON.stringify(data),
  //   headers: new Headers({
  //     'Content-Type': 'application/json'
  //   })
  // }).then(res => res.json())
  // .catch(error => console.error('Error:', error))
  // .then(response => console.log('Success:', response));

  // {
  //   "errors": [{
  //     "title": "Forbidden",
  //     "status": 403,
  //     "detail": "The current user is not allowed to PATCH the selected resource.",
  //     "links": {
  //       "info": "http:\/\/www.w3.org\/Protocols\/rfc2616\/rfc2616-sec10.html#sec10.4.4"
  //     },
  //     "code": 0,
  //     "id": "\/node--dogs\/5de0fb4a-4057-4fa2-a808-5dbb6b96efe0",
  //     "source": {
  //       "pointer": "\/data"
  //     }
  //   }]
  // }

  /*
'Authorization' => 'Bearer ' . $token,
'Content-Type' => 'application/vnd.api+json'
 */


  static updateDrupal(API_LOC = types.DRUPAL_API_LOC, data) {
    // console.log('dataz ===>', JSON.stringify(data));
    return fetch(API_LOC, {
      method: 'PATCH',
      body: JSON.stringify(data),
      // mode: 'no-cors',
      headers: new Headers({
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjEyM2JkMzExMjQwODE4Njg2NDg5NGJjMjQ5YWY0NTA2ODkxNTVkYWIwMjhiYWU3Nzc3ZTAwMDI0MTBmZGViMjI2ZmUxYTZhYTNhYzNmMGEyIn0.eyJhdWQiOiI5ZWQ2MGUwOC04ZWFjLTRiYjMtYjRjNy04ZmEzYjk3NjQ2MjIiLCJqdGkiOiIxMjNiZDMxMTI0MDgxODY4NjQ4OTRiYzI0OWFmNDUwNjg5MTU1ZGFiMDI4YmFlNzc3N2UwMDAyNDEwZmRlYjIyNmZlMWE2YWEzYWMzZjBhMiIsImlhdCI6MTUxNjkxMzE3OCwibmJmIjoxNTE2OTEzMTc4LCJleHAiOjE1MTY5MTM0NzgsInN1YiI6IjIiLCJzY29wZXMiOlsiYXV0aGVudGljYXRlZCIsImRvZ3NfY3JlYXRvciIsImRvZ3NfcmV2aWV3ZXIiXX0.qW431TY179UBD3Vtk0uLRSwxJQxJ3XYJi2tspKHbQhrtEUgjs8a5eb6_Y8Y8cyrtbsAliCXPxmHQKE4TKZzfHCD2-mijK8c0s0Wlbhj51IWJy4wspjx6ZvMTjHwShMD1-D9Tzm0t65928FRK68ZU9Am2Q7eGCAnXFEQa_Fun5Fhd3zVsPD0gdpNwo6xy4llI_XP1ROJaiZ59OAhxXk2CoQzgBvHlxHXrw_ARadj15kV7bYyphHXcGQGBfzslJ4pV17-W1oJ2OQ-GGK9Jqjao02pr1DGD3mSn7upDsRX2dIEG0ocXeQXIZyhMnybE8bMMxKz690zsSN8IceURURalpA'
      })
    }).then(response => {
      // console.log('response.json() ===> ', response.json());
      return response.json();
    }).catch(error => {
      return error;
    });
  }


}


// api-dog-admin

/*


curl --request POST \
--data "grant_type=password\
&client_id=9ed60e08-8eac-4bb3-b4c7-8fa3b9764622\
&client_secret=api-dog-admin\
&username=api-dog-admin\
&password=api-dog-admin"\
 http://local.decoupledkit.com/oauth/token

*/





// fetch(API_URL + API_PATH + 'tasks', {
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   },
//   method: 'patch',
//   body: JSON.stringify( { task: task } )
// })

export default drupalAPI;