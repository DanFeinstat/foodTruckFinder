import React, { useReducer } from "react";
import ownerApi from "../../utils/ownerApi";

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
  popupValue: null,
  realTrucks: [],
  mapBounds: {},
  trucksToDisplay: [],
  owner: {
    id: "",
    name: "",
    description: "",
    loggedIn: false,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case `addTruck`:
      const moreTrucks = action.payload;
      return { ...state, realTrucks: moreTrucks };
    case `removeTruck`:
      const lessTrucks = [...state.realTrucks];
      let filteredNewTrucks = lessTrucks.filter(
        truck => truck.name !== action.payload
      );
      return { ...state, realTrucks: filteredNewTrucks };
    case `newMapBounds`:
      const currentTrucks = [...state.trucks, ...state.realTrucks];
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
      let updateMapBounds = action.payload;
      // console.log(updateMapBounds);
      // console.log(state);

      return {
        ...state,
        trucksToDisplay: newDisplay,
        mapBounds: updateMapBounds,
      };
    // case `popupInfo`:
    //   const newPopupInfo = [action.payload.longitude, action.payload.latitude];
    //   return { ...state, popUpInfo: newPopupInfo };
    case `popupValue`:
      let newPopupValue;
      if (action.payload) {
        newPopupValue = {
          name: action.payload.name,
          blurb: action.payload.blurb,
          coords: [action.payload.longitude, action.payload.latitude],
        };
      } else {
        newPopupValue = null;
      }
      return { ...state, popupValue: newPopupValue };
    case `login`:
      let newOwner = { ...state.owner };
      newOwner.id = action.payload.id;
      newOwner.name = action.payload.name;
      newOwner.description = action.payload.description;
      newOwner.loggedIn = true;
      return { ...state, owner: newOwner };
    case `logout`:
      let resetOwner = { ...state.owner };
      resetOwner.id = "";
      resetOwner.name = "";
      resetOwner.description = "";
      resetOwner.loggedIn = false;
      return { ...state, owner: resetOwner };
    case `editDescription`:
      let newDescription = { ...state.owner };
      newDescription.description = action.payload.description;
      // console.log(action.payload);
      // const newDescriptionDatabaseObject = {
      //   id: state.owner.id,
      //   description: action.payload.description,
      // };
      // const descriptionUpdate = setUpdateDescription(
      //   newDescriptionDatabaseObject,
      //   action.payload.authToken
      // );
      // console.log(descriptionUpdate);
      return {
        ...state,
        owner: newDescription,
      };
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
