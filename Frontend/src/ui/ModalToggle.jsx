import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useModal } from '../hook/modals'; 

const ModalToggle = ({
  modalId,
  toggleButtonId,
  ModalComponent,
  className,
  style,
  title,
  ...props
}) => {
  const { openModalId, openModal, closeModal } = useModal();
  const isOpen = openModalId === modalId;

  useEffect(() => {
    const closeOnClickOutside = () => {
      if (isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('click', closeOnClickOutside);
    } else {
      document.removeEventListener('click', closeOnClickOutside);
    }

    return () => {
      document.removeEventListener('click', closeOnClickOutside);
    };
  }, [isOpen, closeModal]);

  const handleToggleClick = (e) => {
    e.stopPropagation();
    if (isOpen) {
      closeModal();
    } else {
      openModal(modalId);
    }
  };
  return (
    <div  className="relative w-full">
      <div
        id={toggleButtonId}
        onClick={handleToggleClick}
        className={className}
        style={style}
        title={title}
      >
        {title}
      </div>
      {isOpen && (
        <div id={modalId} onClick={(e) => e.stopPropagation()}>
          <ModalComponent {...props} closeModal={closeModal}/>
        </div>
      )}
    </div>
  );
};


ModalToggle.propTypes = {
  modalId: PropTypes.string.isRequired,
  toggleButtonId: PropTypes.string.isRequired,
  ModalComponent: PropTypes.elementType.isRequired,
  className: PropTypes.string,
  style: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export default ModalToggle;
