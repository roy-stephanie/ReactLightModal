import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './Modal.css';

/**
 * The Modal component is a customizable and accessible modal dialog box.
 * It handles opening and closing animations without relying on react-transition-group to avoid findDOMNode warnings.
 * The modal can be customized in size and style, and it supports ARIA attributes for accessibility.
 *
 * @param {string} id - A unique identifier for the modal element.
 * @param {boolean} isOpen - Determines whether the modal is open or closed.
 * @param {React.node} children - The content to be rendered inside the modal.
 * @param {string} className - Additional class names for custom styles.
 * @param {function} onClose - Function called to close the modal, triggered by outside click, Escape key, or close button.
 * @param {string} ariaLabelledby - ARIA attribute for the element that labels the modal.
 * @param {string} ariaDescribedby - ARIA attribute for the element that describes the modal.
 * @param {string|number} size - Width of the modal, can be a percentage, pixel value, or valid CSS width unit.
 *
 * @returns {React.Element} The rendered modal component.
 */
const Modal = (
  {
    id,
    isOpen,
    children,
    className,
    onClose,
    ariaLabelledby,
    ariaDescribedby,
    size = '80%',
  }) => {
  const modalRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Handle modal visibility transition
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const timeout = setTimeout(() => setVisible(false), 300); // Match the duration of your CSS transition
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          onClose();
        }
      };

      const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  const determineSize = (size) => {
    if (typeof size === 'number') {
      return `${size}px`;
    } else if (typeof size === 'string') {
      return size.match(/^\d+$/) ? `${size}px` : size;
    } else {
      return '80%';
    }
  };

  if (!visible) return null;

  return ReactDOM.createPortal(
    <div className={`modal-container-position ${isOpen ? 'modal-open' : 'modal-close'}`}>
      <div
        ref={modalRef}
        id={id}
        className={`modal ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        tabIndex="-1"
        style={{width: determineSize(size)}}
      >
        <div id={id} className="modal-container">
          <div className="modal-content">
            <button onClick={onClose} className="modal-close">
              X
            </button>
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  ariaLabelledby: PropTypes.string.isRequired,
  ariaDescribedby: PropTypes.string.isRequired,
  size: PropTypes.string,
};

export default Modal;
