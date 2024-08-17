# ReactLightModal

## Overview

The Modal component is a customizable and accessible modal dialog built with React.

## Prérequis

- **Node.js** : Version `20.16.0`
- **Recommended Editor** : [WebStorm](https://www.jetbrains.com/webstorm/) or any other editor compatible with JavaScript/React.

## Installation

```bash
   npm i react-light-dialog-modal
   yarn add react-light-dialog-modal
```

## Props

### `id` (string, requis)
A unique identifier for the modal element. This ID is used to control accessibility and the behavior of the modal.

### `isOpen` (bool, requis)
A boolean that determines whether the modal is open or closed. When true, the modal is displayed; when false, it is hidden.

### `children` (node)
The content to display inside the modal. This can include any valid React element.

### `className` (string)
Additional classes to apply for customizing the modal's styles.

### `onClose` (func, requis)
A function called when the modal should close. This can be triggered by a click outside the modal, pressing the "Escape" key, or clicking the close button inside the modal.

### `ariaLabelledby` (string, requis)
An ARIA attribute specifying the ID of the element that labels the modal. This improves accessibility for screen readers.

### `ariaDescribedby` (string, requis)
An ARIA attribute specifying the ID of the element that describes the modal. This also enhances accessibility.

### `size` (string or number)
Defines the width of the modal. It accepts percentage values, pixels, or any valid CSS width unit.
The default size of the modal is set to 80%, meaning it occupies 80% of its container's width.

## Behavior and Lifecycle

### Effect Management
Le hook `useEffect` est utilisé pour ajouter des écouteurs d'événements qui gèrent les clics à l'extérieur de la modal et détectent lorsque la touche "Échap" est pressée. Ces écouteurs sont attachés lorsque la modal est ouverte et retirés lorsqu'elle est fermée ou que le composant est démonté.

- **Click Outside** : If a user clicks outside the modal content, the onClose function is called to close the modal.
- **Escape Key** : If the user presses the "Escape" key, the onClose function is triggered to close the modal.

### Size Management
The determineSize function dynamically calculates the width of the modal based on the size prop:

- If size is a number, it is converted to pixels.
- If size is a string, it checks if the string is numeric and appends "px" if necessary.
- If no valid size is provided, the modal defaults to 80% width.

## Accessibility
- The modal includes aria-modal, aria-labelledby, and aria-describedby attributes to ensure it is accessible to users with disabilities.
- The modal is focusable (tabIndex="-1") to ensure it captures focus when opened.

## Rendering
The content of the modal is rendered using ReactDOM.createPortal, allowing it to be placed outside the main React component hierarchy, typically at the root of the document body.
This ensures that the modal appears above other content without disrupting the page layout.

## How to use
```bash
import { Modal } from "react-light-dialog-modal";

const MyComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <Modal
        id="modalId"
        className={"class"}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        size={70}
        ariaDescribedby={"modalDescribedby"}
        ariaLabelledby={"modalariaLabelledby"}
      >
        Modal Content
    </Modal>
  )
}
```
