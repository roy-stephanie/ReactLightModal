import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {CSSTransition} from 'react-transition-group';
import './Modal.css';

/**
 * The Modal component is a customizable and accessible modal dialog box.
 * It handles opening and closing animations using `react-transition-group`.
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
const Modal = ({id, isOpen, children, className, onClose, ariaLabelledby, ariaDescribedby, size}) => {
  useEffect(() => {
    if (isOpen) {
      /**
       * Handles closing the modal when a click occurs outside the modal content.
       *
       * @param {MouseEvent} event - The mouse event triggered by the click.
       */
      const handleClickOutside = (event) => {
        const modalElement = document.getElementById('modal-container');
        if (modalElement && !modalElement.contains(event.target)) {
          onClose();
        }
      };

      /**
       * Handles closing the modal when the Escape key is pressed.
       *
       * @param {KeyboardEvent} event - The keyboard event triggered by the key press.
       */
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

  /**
   * Determines the width of the modal based on the `size` prop.
   *
   * @param {string|number} size - The size value passed to the component.
   * @returns {string} The calculated width in pixels or percentage.
   */
  const determineSize = (size) => {
    if (typeof size === 'number') {
      return `${size}px`;
    } else if (typeof size === 'string') {
      return size.match(/^\d+$/) ? `${size}px` : size;
    } else {
      return '80%';
    }
  };

  const modalContent = (
    <div className="modal-container-position">
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="modal"
        unmountOnExit
        onExited={() => onClose()}
      >
        <div
          id={id}
          className={`modal ${className}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={ariaLabelledby}
          aria-describedby={ariaDescribedby}
          tabIndex="-1"
          style={{width: determineSize(size)}}
        >
          <div id="modal-container" className="modal-container">
            <div className="modal-content">
              <button onClick={onClose} className="modal-close">X</button>
              {children}
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
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

Modal.defaultProps = {
  size: '80%',
};

export default Modal;
