# ReactLightModal

## Présentation

Le composant `Modal` est une boîte de dialogue modale personnalisable et accessible, construite avec React.
Il gère les animations d'ouverture et de fermeture à l'aide de `react-transition-group`
et offre diverses options de personnalisation, telles que la taille, les attributs ARIA, et le comportement de fermeture.

## Prérequis

- **Node.js** : Version `20.16.0`
- **Éditeur recommandé** : [WebStorm](https://www.jetbrains.com/webstorm/) ou tout autre éditeur compatible avec JavaScript/React.

## Installation

```bash
   npm i react-light-dialog-modal
   yarn add react-light-dialog-modal
```

## Props

### `id` (string, requis)
Un identifiant unique pour l'élément modal. Cet ID est utilisé pour contrôler l'accessibilité et le comportement de la modal.

### `isOpen` (bool, requis)
Un booléen qui détermine si la modal est ouverte ou fermée. Quand `true`, la modal est affichée ; quand `false`, elle est masquée.

### `children` (node)
Le contenu à afficher à l'intérieur de la modal. Cela peut inclure n'importe quel élément React valide.

### `className` (string)
Classes supplémentaires à appliquer pour personnaliser les styles de la modal.

### `onClose` (func, requis)
Une fonction appelée lorsque la modal doit se fermer. Cela peut être déclenché par un clic à l'extérieur de la modal, la pression de la touche "Échap", ou en cliquant sur le bouton de fermeture à l'intérieur de la modal.

### `ariaLabelledby` (string, requis)
Un attribut ARIA qui spécifie l'ID de l'élément qui étiquette la modal. Cela améliore l'accessibilité pour les lecteurs d'écran.

### `ariaDescribedby` (string, requis)
Un attribut ARIA qui spécifie l'ID de l'élément qui décrit la modal. Cela améliore également l'accessibilité.

### `size` (string ou number)
Définit la largeur de la modal. Il accepte des valeurs en pourcentage, pixels, ou toute unité de largeur CSS valide.

## Props par défaut

### `size`
La taille par défaut de la modal est définie à `80%`, ce qui signifie qu'elle occupe 80% de la largeur de son conteneur.

## Comportement et cycle de vie

### Gestion des effets
Le hook `useEffect` est utilisé pour ajouter des écouteurs d'événements qui gèrent les clics à l'extérieur de la modal et détectent lorsque la touche "Échap" est pressée. Ces écouteurs sont attachés lorsque la modal est ouverte et retirés lorsqu'elle est fermée ou que le composant est démonté.

- **Clic à l'extérieur** : Si un utilisateur clique à l'extérieur du contenu de la modal, la fonction `onClose` est appelée pour fermer la modal.
- **Touche Échap** : Si l'utilisateur appuie sur la touche "Échap", la fonction `onClose` est déclenchée pour fermer la modal.

### Gestion de la taille
La fonction `determineSize` calcule dynamiquement la largeur de la modal en fonction de la prop `size` :

- Si `size` est un nombre, il est converti en pixels.
- Si `size` est une chaîne de caractères, elle vérifie si la chaîne est numérique et ajoute "px" si nécessaire.
- Si aucune taille valide n'est fournie, la modal se règle par défaut à 80% de largeur.

## Animation
La modal utilise le composant `CSSTransition` de `react-transition-group` pour animer l'apparition et la disparition de la modal. Elle utilise des classes CSS pour une transition fluide, avec un délai de 300 millisecondes.

## Accessibilité
- La modal inclut les attributs `aria-modal`, `aria-labelledby`, et `aria-describedby` pour s'assurer qu'elle est accessible aux utilisateurs ayant des handicaps.
- La modal est focalisée (`tabIndex="-1"`) pour s'assurer qu'elle capture le focus lorsqu'elle est ouverte.

## Rendu
Le contenu de la modal est rendu en utilisant `ReactDOM.createPortal`, permettant de le placer en dehors de la hiérarchie principale du composant React, généralement à la racine du document body. Cela garantit que la modal apparaît au-dessus du reste du contenu sans perturber la disposition de la page.
