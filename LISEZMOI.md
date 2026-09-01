# Carnet de charges

Application web autonome. Aucun serveur, aucun compte, aucune dépendance à Claude.
Les données restent dans le navigateur du téléphone.

Toutes les commandes ci-dessous se lancent **depuis ce dossier** :

    cd c:\Users\shive\Desktop\muscu\app

---

## A. GitHub Pages

Gratuit et permanent. Le dépôt doit être **public** (les dépôts privés
demandent un compte payant pour Pages). Aucune donnée personnelle
n'est dans ces fichiers, tout reste sur ton téléphone.

### 1. Créer le dépôt sur github.com

Bouton **+** en haut à droite → **New repository**.
Nom : `carnet_muscu`. Coche **Public**. **N'ajoute ni README ni .gitignore.**
→ Create repository.

### 2. Envoyer les fichiers

    git init -b main
    git add .
    git commit -m "Carnet de charges"
    git remote add origin https://github.com/Sevenwyn/carnet_muscu.git
    git push -u origin main

Au premier push, une fenêtre demande de se
connecter à GitHub : choisis **Sign in with your browser**.

### 3. Activer Pages

Dans le dépôt : **Settings** → **Pages** (menu de gauche).
Source : **Deploy from a branch**. Branche : `main`, dossier `/ (root)`.
→ **Save**. Compte deux minutes.

Adresse : `https://sevenwyn.github.io/carnet_muscu/`

### Mettre à jour ensuite

    git add .
    git commit -m "mise à jour"
    git push

---

## B. Firebase Hosting

Le CLI est déjà installé. `firebase.json` est déjà écrit, avec les
en-têtes qui empêchent le service worker d'être mis en cache trop
longtemps — c'est ce qui fait que tes mises à jour arrivent vraiment.

### 1. Créer le projet

Sur console.firebase.google.com → **Créer un projet**.
Nom : `carnet-charges`. Tu peux refuser Google Analytics.

### 2. Se connecter et publier

    firebase login
    firebase use --add        # choisis le projet, alias : default
    firebase deploy --only hosting

Adresse : `https://carnet-charges.web.app`

### Mettre à jour ensuite

    firebase deploy --only hosting

---

## C. Netlify

Le plus rapide, sans terminal. `netlify.toml` est déjà là.

### Par glisser-déposer

Va sur https://app.netlify.com/drop et fais glisser **ce dossier**
dans la page. L'adresse arrive en trente secondes.
Sans compte elle est temporaire ; crée un compte gratuit pour la garder,
puis **Site configuration → Change site name** pour choisir l'adresse.

### Ou branché sur GitHub (recommandé si tu as fait l'étape A)

**Add new site → Import an existing project → GitHub**, choisis `carnet_muscu`.
Publish directory : `.`. Chaque `git push` redéploie tout seul.

---

## Installer sur le téléphone

- **iPhone** : ouvrir l'adresse dans **Safari** (pas Chrome), bouton Partager,
  « Sur l'écran d'accueil ».
- **Android** : ouvrir dans Chrome, menu ⋮, « Installer l'application ».

L'app s'ouvre alors en plein écran, sans barre de navigateur, et fonctionne
sans réseau.

---

## Transférer les données existantes

Les données ne suivent pas d'une adresse à l'autre : chaque site a son
propre stockage.

1. Sur l'ancienne version, dérouler **Historique et sauvegarde** → **Copier**.
2. Sur la nouvelle, même endroit → **Restaurer** → coller → **Restaurer** à nouveau.

Fais-le **avant** d'abandonner l'ancienne adresse.

---

## Mettre à jour l'app

Quand `index.html` change, incrémente aussi la version du cache dans
`sw.js` — ligne 2, `carnet-v1` devient `carnet-v2` — sinon les téléphones
déjà installés continueront de servir l'ancienne version depuis leur cache.
