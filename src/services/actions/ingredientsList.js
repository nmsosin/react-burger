export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";


const checkResponse = (res) => {
  // console.log(res);
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

// export const getIngredientData = async () => {
//   try {
//     setItems(null);
//     const res = await fetch(dataUrl);
//     const result = await checkResponse(res);
//     setItems(result.data);
//   } catch (err) {
//     alert(`Ой! При запросе данных произошла ошибка: ${err}`);
//   }
// }

// const dataUrl = 'https://norma.nomoreparties.space/api/ingredients';


export function getIngredientsData (dataUrl) {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    fetch(dataUrl)
      .then(checkResponse)
      .then( res  => {
        if (res) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res.data
          })
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED
          })
        }
        // console.log(res)
      })
      .catch( err => {
      dispatch({
        type: GET_INGREDIENTS_FAILED
      })
      // console.log(err);
    })
  }
}
