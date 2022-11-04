import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@root/pages/store';
import { useSelector } from 'react-redux';

interface PopUpState {
  isOpen: boolean;
  content: string;
}

type RequestPopUpActionType = PayloadAction<Pick<PopUpState, 'content'>>;
type OpentPopUpActionType = PayloadAction<Pick<PopUpState, 'content'>>;

const initialState: PopUpState = { isOpen: false, content: '' };

const popUpSlice = createSlice({
  name: 'popUp',
  initialState,
  reducers: {
    setPopUpContent: (state, action: RequestPopUpActionType) => {
      state.content = action.payload.content;
    },
    openPopUp: (state, action: OpentPopUpActionType) => {
      state.content = action.payload.content;
      state.isOpen = true;
    },
    cancelPopUp: (state) => {
      state.isOpen = false;
    },
    confirmPopUp: () => {},
  },
});

export const popUpActions = popUpSlice.actions;
export const popUpReducer = popUpSlice.reducer;

export const useSelectPopUp = () => {
  return useSelector((state: RootState) => state.popUp);
};
