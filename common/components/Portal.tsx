import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  isOpen: boolean;
  targetElementId?: string;
  children: ReactNode;
}

const DEFAULT_PORTAL_ID = 'portal';

const Portal = (props: PortalProps) => {
  if (!props.isOpen) {
    return <></>;
  }

  const portalElement = document.getElementById(
    props.targetElementId ?? DEFAULT_PORTAL_ID,
  );
  if (!portalElement) {
    throw new Error('Portal Element Does Not Exists');
  }

  return ReactDOM.createPortal(props.children, portalElement);
};

export default Portal;
