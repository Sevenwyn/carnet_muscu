# Carnet de charges

Application web autonome : aucun serveur, aucun compte, aucune dépendance.
Les données restent dans le navigateur du téléphone.

## Mettre en ligne

Dépose le contenu de ce dossier (les 5 fichiers, pas le dossier lui-même)
sur n'importe quel hébergeur de fichiers statiques :

- **Netlify Drop** — https://app.netlify.com/drop — glisse le dossier, tu as
  une adresse en trente secondes. Crée un compte gratuit pour la conserver.
- **GitHub Pages** — dépôt public, Settings > Pages, branche `main`, dossier `/`.
- **Cloudflare Pages**, **Vercel**, ou l'hébergement d'un site perso existant.

L'adresse doit être en **https** : le mode hors-ligne et l'installation sur
l'écran d'accueil n'y fonctionnent pas autrement.

## Installer sur le téléphone

- **iPhone** : ouvrir l'adresse dans Safari, bouton Partager, « Sur l'écran d'accueil ».
- **Android** : ouvrir dans Chrome, menu ⋮, « Installer l'application ».

Une fois installée, elle s'ouvre en plein écran, sans barre de navigateur,
et fonctionne sans réseau.

## Transférer les données existantes

Les données d'un site ne suivent pas d'une adresse à l'autre.
Sur l'ancienne version, ouvrir « Historique et sauvegarde » puis **Copier**.
Sur la nouvelle, même endroit, **Restaurer**, coller, valider.

## Mettre à jour

Remplacer `index.html`, puis incrémenter `CACHE` dans `sw.js`
(`carnet-v1` devient `carnet-v2`), sans quoi les téléphones garderont
l'ancienne version en cache.
