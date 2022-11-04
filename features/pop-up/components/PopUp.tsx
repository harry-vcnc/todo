import Portal from '@root/common/components/Portal';
import { popUpActions, selectPopUp } from '../slice';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';

const PopUp = () => {
  const dispatch = useDispatch();
  const { isOpen, content } = useSelector(selectPopUp);

  const onClickCancel = () => {
    dispatch(popUpActions.cancelPopUp());
  };
  const onClickConfirm = () => {
    dispatch(popUpActions.confirmPopUp());
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
