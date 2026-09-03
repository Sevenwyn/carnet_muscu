# Carnet de charges

Application web autonome. Aucun serveur, aucun compte, aucune dépendance à Claude.
Les données restent dans le navigateur du téléphone.

Toutes les commandes ci-dessous se lancent **depuis ce dossier**.

---

## A. GitHub Pages — c'est ce qui est en place

Deux pages sont publiées :

- **Carnet de saisie** — https://sevenwyn.github.io/carnet_muscu/
- **Programme et guides** — https://sevenwyn.github.io/carnet_muscu/programme.html

Les deux pages sont **indépendantes** : aucun lien ne les relie.
Le carnet embarque ses propres guides de mouvement, il se suffit à lui-même
pendant la séance. Le programme reste consultable à son adresse, à part.
Dépôt : https://github.com/Sevenwyn/carnet_muscu

`programme.html` est généré par `build_app.py` à partir de
`programme-artifact.html`, lui-même produit par `build_artifact.py`
depuis le `programme.html` du dossier parent. Ne l'édite pas à la main.

### Publier une modification

    git add .
    git commit -m "mise à jour"
    git push

Compte une à deux minutes avant que GitHub Pages reconstruise.

### Si tu devais tout refaire

Créer un dépôt **public** sur github.com (bouton **+** → New repository),
sans README ni .gitignore, puis :

    git init -b main
    git add .
    git commit -m "Carnet de charges"
    git remote add origin https://github.com/Sevenwyn/carnet_muscu.git
    git push -u origin main

Puis **Settings** → **Pages** → Source **Deploy from a branch**,
branche `main`, dossier `/ (root)` → **Save**.

---

## B. Firebase Hosting

Le CLI est déjà installé. `firebase.json` est prêt, avec les en-têtes
qui empêchent le service worker de rester en cache.

1. Créer un projet sur console.firebase.google.com (Analytics facultatif).
2. Puis :

    firebase login
    firebase use --add        # choisir le projet, alias : default
    firebase deploy --only hosting

Mises à jour ensuite : `firebase deploy --only hosting`

---

## C. Netlify

`netlify.toml` est prêt.

- **Glisser-déposer** : https://app.netlify.com/drop, faire glisser ce dossier.
- **Branché sur GitHub** : Add new site → Import an existing project → GitHub →
  `carnet_muscu`, publish directory `.`. Chaque `git push` redéploie tout seul.

---

## Installer sur le téléphone

- **iPhone** : ouvrir l'adresse dans **Safari** (pas Chrome), bouton Partager,
  « Sur l'écran d'accueil ».
- **Android** : Chrome, menu ⋮, « Installer l'application ».

L'app s'ouvre en plein écran, sans barre de navigateur, et fonctionne sans réseau.

---

## Transférer les données

Les données ne suivent pas d'une adresse à l'autre : chaque site a son
propre stockage.

1. Ancienne version : **Historique et sauvegarde** → **Copier**.
2. Nouvelle version : même endroit → **Restaurer** → coller → **Restaurer**.

---

## Mettre à jour l'app

`build_app.py` régénère `index.html`, `manifest.webmanifest` et `sw.js`
à partir de `carnet.html`. Il ne touche pas à ce fichier-ci.

La version du cache dans `sw.js` est **calculée automatiquement** à partir du
contenu de `index.html` (`carnet-c49dfca8` par exemple). Rien à incrémenter
à la main : toute modification change l'empreinte, donc invalide le cache.

Depuis la v3, le service worker va **chercher la page sur le réseau en premier**
et ne retombe sur le cache que hors ligne. Une mise à jour arrive donc dès le
prochain lancement, sans avoir à recharger deux fois. Les polices et les icônes
restent servies depuis le cache, elles ne changent jamais.
