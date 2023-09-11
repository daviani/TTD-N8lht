# TEST TECHNIQUE

## Installation :

L'installation de ce test technique est simple et rapide. Une seule commande suffit : `yarn run-all`. J'ai choisi l'
approche du monorepos pour faciliter l'installation et l'utilisation du projet en local, suivant la méthodologie MD10 (
moins de 10 commandes en moins de 10 minutes). Le processus d'installation commence par une vérification préliminaire.
Il s'assure que l'utilisateur a bien installé globalement la librairie "expo-cli". Si ce n'est pas le cas, il propose
automatiquement de procéder à son installation. Ensuite, le script installe les trois fichiers package.json nécessaires
et lance simultanément les deux applications. Si tout se déroule comme prévu, votre navigateur s'ouvrira automatiquement
à l'adresse : localhost:19006.

## Étapes initiales :

- Installation de React Native sur mon MacBook.
- Prise en compte des consignes reçues.
- Configuration de la base de données MongoDB (MongoDB présente deux avantages : facilité de mise en place et approche
  NoSQL).
- Création et configuration du monorepos.
- Génération de jeux de données de test avec différents scénarios (sans erreur, duplication d'ID, suivi de wording,
  suivi d'amount, solde négatif).
- Configuration des scripts (en utilisant "concurrently").
- Intégration et configuration d'un linter (ESLint).

## Tâches principales :

La création de l'application backend se fait avec ExpressJS (apps/api).

- Configuration des variables d'environnement.
- Création des routes.

### GET : /api/client

Cette route permet de récupérer la liste de tous les clients.

- Code de statut 200 : Succès de la requête. La liste des clients est retournée.
- Code de statut 404 : Aucun client trouvé.
- Code de statut 500 : Erreur interne du serveur.

### GET : /api/clients/name

Cette route permet de récupérer les noms des clients.

- Code de statut 200 : Succès de la requête. Les noms des clients sont retournés.
- Code de statut 404 : Aucun nom de client trouvé.
- Code de statut 500 : Erreur interne du serveur.

### GET : /api/client/:uuid

Cette route permet de récupérer un client en utilisant son identifiant unique (UUID).

- Code de statut 200 : Succès de la requête. Le client est retourné.
- Code de statut 404 : Aucun client trouvé pour l'UUID spécifié.
- Code de statut 500 : Erreur interne du serveur.

### GET : /api/check-account/:uuid

Cette route permet de vérifier le compte d'un client en utilisant son identifiant unique (UUID).

- Code de statut 202 : Succès de la vérification du compte. Un message indiquant que la vérification du compte a été
  acceptée est retourné.
- Code de statut 404 : La vérification du compte a échoué ou l'UUID du client n'a pas été trouvé.
- Code de statut 500 : Erreur interne du serveur.

### DELETE

Cette route permet de supprimer une opération associée à un client.

- Code de statut 204 : Suppression réussie de l'opération.
- Code de statut 404 : Aucun client trouvé pour l'UUID spécifié ou aucune opération correspondant à l'UUID de
  l'opération.
- Code de statut 500 : Erreur interne du serveur.

Le service de vérification est créé pour scanner le compte d'un client et détecter d'éventuelles erreurs (4 erreurs
possibles : doublons sur les ID, suivi du wording, suivi de l'amount, solde négatif). Nous avons également mis en place
une gestion avancée des erreurs.

La création de l'application frontend en React Native se poursuit (apps/front).

- Création de l'écran d'accueil (Home) qui affiche un bouton pour accéder à la liste des clients.
- Création de l'écran Clients qui affiche l'ensemble des clients sous forme de liste.
- Création de l'écran ClientDetails qui affiche le nom du client, la dernière opération, la dernière balance calculée,
  ainsi qu'un bouton pour accéder à l'écran de vérification.
- Création de l'écran AccountDétails, l'écran le plus complexe, qui affiche :

    - Dans le cas où tout se passe bien, un message, le statut de la requête renvoyé par le backend et le dernier solde.
    - Dans le cas contraire, le statut avec le message "I'm a teapot", accompagné de la liste des problèmes identifiés
      et de leurs raisons respectives. Il est également possible de supprimer les opérations en cause.

## Pour finir :

- Mise en place des tests unitaires avec Jest/superTest.
- Améliorations, optimisations et corrections diverses.
- Tentative de mise en place de JSdoc
