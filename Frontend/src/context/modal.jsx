import { createContext, useState } from 'react';
import PropTypes from "prop-types";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [openModalId, setOpenModalId] = useState(null);

  const openModal = (id) => setOpenModalId(id);
  const closeModal = () => setOpenModalId(null);

  return (
    <ModalContext.Provider value={{ openModalId, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.node,
};
