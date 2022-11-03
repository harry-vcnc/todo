import Portal from '@root/components/Portal';
import React, { useEffect } from 'react';
import { popUpActions, useSelectPopUp } from '../slice';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';

const PopUp = () => {
  const dispatch = useDispatch();
  const { isOpen, content } = useSelectPopUp();

  const onClickCancel = () => {
    return dispatch(popUpActions.onCancel());
  };
  const onClickConfirm = () => {
    return dispatch(popUpActions.onConfirm());
  };

  return (
    <Portal isOpen={isOpen}>
      <PopUpDimmed>
        <PopUpContainer>
          <div>{content}</div>
          <ButtonContainer>
            <button onClick={onClickCancel}>Cancel</button>
            <button onClick={onClickConfirm}>OK</button>
          </ButtonContainer>
        </PopUpContainer>
      </PopUpDimmed>
    </Portal>
  );
};

const PopUpDimmed = styled.div`
  position: absolute;
  margin: 0 auto;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 100px;
  color: black;
  background-color: white;
  border-radius: 4px;
`;

const ButtonContainer = styled.div``;

export default PopUp;
