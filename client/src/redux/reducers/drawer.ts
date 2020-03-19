import { SET_DRAWER_OPEN } from '../actions/drawer';

interface IDrawerState {
  open: boolean;
}

interface IDrawerAction {
  type: string;
  open: boolean;
}

const initialState = {
  open: false,
};

function DrawerReducer(state: IDrawerState = initialState, action: IDrawerAction) {
  switch (action.type) {
    case SET_DRAWER_OPEN:
      return {
        ...state,
        open: action.open,
      };
    default:
      return state;
  }
}

export default DrawerReducer;
