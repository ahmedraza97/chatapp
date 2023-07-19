const INCREMENT = "increment";

function increment(data) {
  return {
    type: "increment",
    payload: data,
  };
}

function incrementByAmount(data) {
  return {
    type: "incrementByAmount",
    payload: data,
  };
}

export { increment, incrementByAmount };
