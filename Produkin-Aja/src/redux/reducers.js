import { GET_PRODUK } from './actions';

const initialState = {
    produk: [],
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUK:
            return { ...state, produk: action.payload };
        default:
            return state;
    }
}

export default userReducer;