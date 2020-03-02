### Atol CD / Ternum BFC / Générateur de sites v2


### GatsbyJS

### Fonctionnement des workspaces et du theming
Afin de proposer la structure en theme du générateur, il est important d'utiliser Yarn et le système de workspace associé

Avant de lancer le site, il est important de lancer la commande `yarn` dans le dossier `/gatsby`
=> Cela permet la mise à jour ou l'installation des dépendances (cela créee les fichiers `yarn.lock` situés dans chacun des workspaces)

Ici, on retrouvera un workspace pour le site ainsi qu'un workspace par thème !

On peut vérifier l'existence et la bonne organisation de nos workspaces avec la commande `yarn workspaces info`

### Structure du projet
Chacun des workspaces possède son propre `package.json` associé à son propre `yarn.lock`

On retrouve un `package.json` à la racine du dossier `gatsby` => Permet la déclaration des workspaces du projet
On retrouve un `package.json` dans le dossier `site` => Permet la déclaration des dépendances GATSBY, REACT, REACT DOM mais aussi les dépendances vers les thèmes et les plugins utiles au site (`plugin-manifest, plugin-offline`) ainsi que les dépendances pour le formatage des fichiers (`es-lint, husky, prettier`)
On retrouve un `package.json` dans chaque thème => Permet la déclaration des dépendances utiles au bon fonctionnement du thème, notamment tous les plugins utilisés par les composants et les pages.


### Commande Gatsby avec Yarn

Pour lancer le site en développement : `yarn workspace site develop`
Pour lancer le build du site : `yarn workspace site build`
Afin d'ajouter un modules ou une dépendance au site on peut utiliser la commande suivante : `yarn workspace site add {nom du module}`

Ces commandes fonctionnent pour chaque thème du site puisque ceux-ci peuvent être lancés individuellement : `yarn workspace {nom du thème}`

### Commande gatsby Clean

Afin de vider le cache du site, `yarn workspace site clean`


