import React, { useReducer } from "react";

const initialState = {
  trucks: [
    {
      name: `Identity Coffee`,
      latitude: 38.568587,
      longitude: -121.471795,
      blurb: `Best iced latte in Sacramento.`,
    },
    {
      name: `Sutter's Fort`,
      latitude: 38.5723654,
      longitude: -121.4712114,
      blurb: `It's a fort!`,
    },
    {
      name: `Temple Coffee`,
      latitude: 38.5739618,
      longitude: -121.4010712,
      blurb: `The best way to pray.`,
    },
  ],
  trucksToDisplay: [],
};

function reducer(state, action) {
  switch (action.type) {
    case `addTruck`:
      const newTrucks = [...state.trucks];
      newTrucks.push(action.payload);
      return { ...state, trucks: newTrucks };
    case `newMapBounds`:
      const currentTrucks = [...state.trucks];
      const newDisplay = [];
      currentTrucks.map(truck => {
        let latTest = [...action.payload.latRange];
        let lngTest = [...action.payload.lngRange];
        latTest.push(truck.latitude);
        latTest.sort();
        lngTest.push(truck.longitude);
        lngTest.sort();
        if (latTest[1] === truck.latitude && lngTest[1] === truck.longitude) {
          newDisplay.push(truck);
        }
      });
      return { ...state, trucksToDisplay: newDisplay };
    default:
      return state;
  }
}

const AppContext = React.createContext(initialState);

const AppContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
