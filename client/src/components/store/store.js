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
    {
      name: `Curry Up Now`,
      latitude: 37.762289,
      longitude: -122.421454,
      blurb: `Indian street food in a hurry!`,
    },
    {
      name: `Easy Slider`,
      latitude: 37.787596,
      longitude: -122.39663,
      blurb: `Slinging sliders to order.`,
    },
    {
      name: `Grillenium Falcon`,
      latitude: 37.7897001,
      longitude: -122.4035692,
      blurb: `It made a grilled cheese in 14 parsecs!`,
    },
    {
      name: `Hamborghini`,
      latitude: 37.801151,
      longitude: -122.407572,
      blurb: `Serving up hocky-style specialties such as the Bobby Orr tuna melt.`,
    },
    {
      name: `Guac N Roll`,
      latitude: 37.8031337,
      longitude: -122.4201193,
      blurb: `Spicy food and spicy tunes.`,
    },
    {
      name: `Mamas and Tapas`,
      latitude: 38.578809,
      longitude: -121.493758,
      blurb: `Family run small plates.`,
    },
    {
      name: `Ms. Cheesious`,
      latitude: 37.7763685,
      longitude: -122.4241893,
      blurb: `Creative grilled cheese sandwiches.`,
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
