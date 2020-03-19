export const SET_DRAWER_OPEN = 'drawer/SET_DRAWER_OPEN';

export const setDrawerOpen = (open: boolean) => {
  return (dispatch) => {
    dispatch({
      type: SET_DRAWER_OPEN,
      open,
    });
  };
};
