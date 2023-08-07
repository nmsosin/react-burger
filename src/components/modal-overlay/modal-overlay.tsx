import {FC} from 'react';
import modalOverlayStyles from './modal-overlay.module.css';

type TModalOverlayProps = {
  closeModal: () => void;
}
const ModalOverlay: FC<TModalOverlayProps> = ({ closeModal }) => {
  return(
      <>
          <div className={modalOverlayStyles.overlay} onClick={closeModal}>
          </div>
      </>
  );
}

export default ModalOverlay;