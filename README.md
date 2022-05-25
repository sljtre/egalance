# Egalance

### Egal - *ité des ch* - ances

***
Un projet de 2ème année à l'ISEN !

**Objectif :** un jeu sérieux sur le thème de l'un des objectifs 
de development durable donné par l'ONU (ici, l'égalité des chances)

#Pour lancer le projet :

###Prérequis : Node, Wamp, MySQL Workbench

Vous allez avoir besoin de lancer wamp et mySQL Workbench.

Une fois que les 2 sont lancés, il faudra créer une table "egalance" dans mySQL, puis faire "server" en haut, et "data import".
Dans import options, sélectionner "import from self-contained file" et sélectionner le fichier SQL à la tête de l'arborescence du repository.
Sélectionner le default target schema egalance, puis aller dans l'onglet "import progress" et lancer l'import.
Il va vous demander un mot de passe, avant la version 8.0.23 comprise vous pouvez valider sans rien mettre, mais à partir de la 8.0.25 le mot de passe est "password".
Une fois que l'import est validé, lancer un premier terminal dans le dossier "back", faire "npm i" puis "node server.js".

Lancer ensuite un second terminal et faire les commandes suivantes :

-npm i @angular/cli -g
-npm i @ionic/cli -g

Puis allez dans le dossier "front", faîtes "npm i" (ce sera un peu long, c'est normal) puis "ionic serve".
Il avant tout faudra vous faire un compte, et vous pourrez alors accéder à l'entièreté du site et du jeu.