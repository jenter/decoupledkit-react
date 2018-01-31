import drupalAPI from '../api/drupalAPI';

// This should probably be an environment variable.
export const DRUPAL_API_LOC = 'http://local.decoupledkit.com/jsonapi/node/dogs';

export const LOAD_DRUPAL_DATA = 'LOAD_DRUPAL_DATA';
export const RECEIVE_DRUPAL_DATA = 'RECEIVE_DRUPAL_DATA';
export const LOAD_DRUPAL_IMAGES = 'LOAD_DRUPAL_IMAGES';
export const RECEIVE_DRUPAL_IMAGES = 'RECEIVE_DRUPAL_IMAGES';

export function loadDrupalData() {
  return { type: LOAD_DRUPAL_DATA, data: {} };
}

export function receiveDrupalData(data) {
  return { type: RECEIVE_DRUPAL_DATA, data };
}

export function receiveDrupalImages(images) {
  return { type: RECEIVE_DRUPAL_IMAGES, images };
}

export function updateContent(item, field, val) {
  return dispatch => {
    const body = {
      "data": {
        "id": item.uuid,
        "attributes": {
          [field]: val
        }
      }
    }
    console.log(`${DRUPAL_API_LOC}/${item.uuid}`)
    drupalAPI.updateDrupal(`${DRUPAL_API_LOC}/${item.uuid}`, body).then((res) => {
      console.log(res);
      dispatch(loadDrupalData());
    });
  }
}

/**
 * Fetch the drupal data.
 *
 * This will initiate a state change via `dispatch` and will instruct the
 * component who is listening to the state of this action to trigger an update.
 * We will chain resolvers here as well, after the initial request for data has
 * completed we will trigger another request which we can `dispatch` back to
 * the component and trigger another state update to add images.
 */
export function doLoadDrupalData() {
  let result = {};
  return (dispatch) => {
    return drupalAPI.getAllDrupal(DRUPAL_API_LOC)
      .then(json => {
        const { data } = json;
        result = data.reduce((result, item) => {
          result[item.id] = item;
          return result;
        }, {});

        let initialReturn = JSON.parse(JSON.stringify(result));
        // @Steve: there seems to be an issue where the dispatch only fires here onload. I suspect it's preventing multiple times within a timeframe.
        // So I commented this out and just waiting till it fires below within the .then()
        // dispatch(receiveDrupalData(initialReturn));
        initialReturn = null; // GC.

        const imageRequests = [];
        const images = {};

        Object.keys(result).forEach((uuid, index) => {
          imageRequests.push(drupalAPI.getAllDrupalImg(`${DRUPAL_API_LOC}/${uuid}/field_dog_picture`));
        });

        Promise.all(imageRequests).then(values => {
            values.forEach((item, index) => {
              const { data: { attributes }, links: { self } } = item;
              const uuid = self.split('/').splice(-2, 1)[0]; // has to be a better way to get the UUID.
              result[uuid].image = DRUPAL_API_LOC.replace('\/jsonapi\/node\/dogs', attributes.url);
            });
            let imageResult = JSON.parse(JSON.stringify(result));
            // imageResult = null; // GC.
            return imageResult;
          }).then(function(imageResult){
            dispatch(receiveDrupalData(imageResult));
          });
      })
      .catch(err => console.log(err));
  }
}
