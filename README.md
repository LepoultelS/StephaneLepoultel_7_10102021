# Projet OpenClassrooms n°7

## Création d'un réseau social d'entreprise pour Groupomania

Télécharger le repository et suivez les instructions ci-après pour installer ce projet en local

## prérequis

* Installer Node.js
* Installer Vue.js
* Installer MySQL

## Base de données MySQL

* Ouvrez votre terminal
* Allez dans le dossier backend : `cd backend`
* Créez la base de données : `node bdd_config/bdd_config.js`
* Dans le dossier backend, créer un fichier .env contenant : DB_HOST(localhost), DB_USER(votre user), DB_PSWD(votre mot de passe), DB_NAME(groupomania).

## Installation et démarrage du Backend

* Ouvrez votre terminal
* Allez dans le dossier backend : `cd backend` 
* Installez toutes les dépendances du projet : `npm i`
* Dans le fichier .env, ajouter JWT_KEY(clé de cryptage pour le token) et JWT_EXPIRATION(expiration du token),
* Démarrez le serveur Node.js : `npm start`

## Installation et démarrage du Frontend

* Ouvrez votre terminal
* Allez dans le dossier backend : `cd frontend`
* Installez toutes les dépendances du projet : `npm i`
* Dans le dossier frontend, créer un fichier .env contenant : JWT_KEY(clé de cryptage pour le token),
* Démarrez l'application : `npm run serve`

## Testez l'application
* Ouvrez votre navigateur et allez sur : `http://localhost:8080/`


La création d'un compte admin n'étant pas accssible à tout le monde, les comptes créés ne le sont pas.
Pour être admin il faut le modifier directement dans la base de données, pour ce faire :
* Lancer un terminal
* Se connecter à mysql avec la commande : `mysql -u root -p`
* Renseigner votre mot de passe root
* Utiliser la bonne base : `USE groupomania;`
* Et enfin choisir le compte qui va devenir admin : `UPDATE user SET admin='1' WHERE id='1';`