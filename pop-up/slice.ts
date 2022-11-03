import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@root/pages/store';
import { useSelector } from 'react-redux';

interface PopUpState {
  isOpen: boolean;
}

const initialState: PopUpState = { isOpen: false };

const popUpSlice = createSlice({
  name: 'popUp',
  initialState,
  reducers: {
    requestPopUp: () => {},
    openPopUp: (state) => {
      state.isOpen = true;
    },
    closePopUp: (state) => {
      state.isOpen = false;
    },
    onConfirm: () => {},
    onCancel: () => {},
  },
});

export const popUpActions = popUpSlice.actions;
export const popUpReducer = popUpSlice.reducer;

export const useSelectPopUp = () => {
  return useSelector((state: RootState) => state.popUp);
};
