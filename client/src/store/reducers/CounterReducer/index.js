const initialState = { value: 0, user: null };

export default function CounterReducer(state = initialState, action) {
  switch (action.type) {
    case "increment":
      return { ...state, value: state.value + 1 };
    case "decrement":
      return { ...state, value: state.value - 1 };
    case "incrementByAmount":
      return { ...state, value: state.value + action.payload };
    case "loginUser":
      return { ...state, user: action.payload };
    case "logoutUser":
      return { ...state, user: null };
    default:
      return state;
  }
}
