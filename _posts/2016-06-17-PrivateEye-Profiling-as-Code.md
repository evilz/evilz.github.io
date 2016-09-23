---
layout: post
title: PrivateEye : Profiling as Code
date: 2016-06-017
author: evilz
comments: true
tags: [Mac, Informatique]
feature: http://www.privateeye.io/images/logo/logo.png
---

<img src="https://i.ytimg.com/vi/aHxIb84afAA/maxresdefault.jpg" style="height:200px;float:left" />J'ai eu la change de participer à un petit atelier sur **Private Eye** avec **Greg Young** durant la conférence NCraft 2016.

 Greg Young est très connu dans la communauté pour avoir évangélisé le terme de CQRS. Mais pour cette occasion il ne s'agit plus de parler de CQRS mais bel et bien d'un outil de profiling développé par Greg lui même.

Dans cet atelier, nous avons joué avec PrivateEye et appris à monitorer un processus de la CLR via une REPL F#. Les participants pouvaient aussi bien être sous Windows, OSX ou Linux.


# Profiling

Avant de se lancer dans le vif du sujet, il est bon de rappeler ce qu'est le profiling et dans quel cas cela est utilisé.

On utilise un Profiler principalement lorsque l'on a des problèmes liés à la performance. Un profiler va récolter un grand nombre d'informations sur l'exécution d'une application comme la mémoire allouée, par qui? comment ? à quelle fréquence? etc...
Le but étant de trouver les goulots d'étranglement, les fuites mémoire, des consommations importantes de CPU et autres problématiques qui peuvent ralentir le bon fonctionnement.

De nombreux profilers existent sur le marché et Visual Studio en inclue même un par défaut. Cependant, ils sont souvent difficiles à mettre en place sur des environnement de production. Imaginez un environnement avec une architecture de type CQRS E/S qui traite un grand nombre de requêtes. Il peut être compliqué, voir impossible de recréer le scénario qui a engendré les problèmes en production lorsque cela est dû à une charge trop importante. Private Eye à donc été créé dans l'optique de résoudre cette problématique. 


# Repl

Mais là où Private eye sort du lot habituel, c'est qu'il nous offre une API qui permet par code de requêter le moteur de profiling.
L'api peut être utilisée via tous les langages .net, mais le focus est pour l'instant mis sur l'utilisation à travers la REPL F#.

**Qu'est ce qu'une REPL ? **

Ce terme signifie **Read–eval–print loop**. 
Il s'agit simplement d'une boucle en qui lit le code entré, l'évalue et affiche le résultat. Globalement c'est ce que l'on retrouve dans tous les langages de scripting ou de shell.
On peut aussi parler de session interactive. Sous Visual Studio 2015 il existe une fenêtre interactive pour F# et pour C#.

![](https://msdnshared.blob.core.windows.net/media/MSDNBlogsFS/prod.evol.blogs.msdn.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/01/29/92/3187.2015-10-07%20VS2015Update1CTP-1-interactive.png)

Pour en savoir plus il existe une introduction à la REPL C# sur channel 9  [ici](https://channel9.msdn.com/Events/Visual-Studio/Connect-event-2015/103)


# Utilisation
La version présentée pour l'occasion est la version gratuite, que l'on peut télécharger [ici](http://www.privateeye.io/free.html)
Il vous faudra aussi F# d'installé sur votre machine pour exécuter **fsi.exe**

Les étapes sont finalement simples :

## Configurer le profiling de la CLR

Ce système existe de base avec la CLR. Il suffit de définir les valeurs des variables d'environnement suivantes: 

```
set COR_ENABLE_PROFILING=1
set COR_PROFILER={D51126CE-1443-42ED-8FD6-B4D32C466292}
set COR_PROFILER_PATH=%~dp0x64\PrivateEye.Profiler.dll

set PRIVATEEYE_PROFILER_MODE=0
set PRIVATEEYE_PROFILER_PORT=4444
```

## Démmarer une session interactive en écoute

- On lance une session interactive F# :  `fsi.exe`

- On charge privateeye.fsx

```
#load "privateeye.fsx";;
```

- On import le namespace PrivateEye.Bridge
```
open PrivateEye.Bridge;;
```

- on ajoute des fonctions d'affichage prédéfinies. Ce mécanisme est présent de base, il permet d'enregistrer un fonction d'affichage pour un type donné. Dans notre cas on enregistre six fonctions.
```
addFsiPrinters();;
```

- Enfin, on se met on écoute d'une connexion
```
Profiler.StartListening();; 
```

Le profiler est maintenant prêt à recevoir et traiter les informations.
Il ne reste plus qu'à lancer votre application .net.
Une connexion va alors s'ouvrir tant que votre programme .net est en cours d'exécution puis se fermer automatiquement.

## Requêter le profiler

On peut maintenant regarder ce que le profiler a récupéré comme informations.

Dans la session interactive F# exécutez la fonction suivante :

```
mostCalledMethods();;
```

Une liste de toute les méthodes appelé par le programme sont alors affichées. 
Disons que seulement les dix premières nous intéresses, il suffit de d'envoyer le résultat à une séquence et de sélectionner que dix éléments.

```fsharp
mostCalledMethods() |> Seq.take 10;;
```

Voici un petit résumé en image

![](http://www.privateeye.io/images/demo.gif)

> Pour vous simplifier la vie vous pouvez simplement lancer `runfsi.cmd` qui fera tout pour vous :)
> Puis ouvrir une fenêtre de commande et exécuter `launchapp_anycpu.cmd PATH_DE_VOTRE_APP_NET`


## Observation pendant l'exécution

Bien qu'il existe à ce jour tout un tas de méthodes perméttant de requêter les informations récoltées pendant l'execution. (dont la liste est disponible [ ici ](https://github.com/PrivateEye/PrivateEye/wiki/FSharp-API))

Il est aussi possible de s'abonner sur des évènements pendant l'écoute ! Il ne s'agit pas réellement d'évènement au sens C#, mais plutôt d'observable aux quelles nous allons souscrire.
Voici un petit exemple, toujours dans la session interactive entrez le code suivant:

```fsharp
onAllocation() |> Observable.subscribe(fun x -> printfn "Alloc %s" x.Method.Name)
```

Relancez votre programme .net.
Vous devriez maintenant voir s'afficher dans la session

```fsharp
Alloc XXXXX 
Alloc XXXXX 
Alloc XXXXX 
Alloc XXXXX 
```

Evidement il s'agit ici d'un exemple très simple avec un simple log, mais il ne tiens qu'à vous de définir ce que vous voulez exécuter à chaque callback.
Couplé à la librairie `FSharp.Charting` on peut facilement envisager de sortir de beaux graphiques.

Il existe aussi d'autres observable mis à notre disposition notamment : `onException()` et `onGCCompleted()`.

La liste complète est [ici](https://github.com/PrivateEye/PrivateEye/wiki/FSharp-API#observables) ainsi qu'un complément d'information sur les types utilisables dans les callbacks [ici](https://github.com/PrivateEye/PrivateEye/wiki/Using-Observables)


## Record and Replay

C'est bien tout ça, mais si j'ai oublié de souscrire à l'observable ou que j'ai besoin de modifier quelque chose dans la souscription ? 
Il faut que je relance mon application et que je rejoue tout mon scénario :'(

Bonne nouvelle ! ce n'est pas nécessaire ! Il est possible avec PrivateEye d'enregistrer une session et de la rejouer ensuite. 
La mise en place est extrêmement simple après avoir mis en écoute la session il vous suffit d'appeler la méthode startRecording avec le nom du fichier ou seront stockées les données.

```fsharp
startListening();;
Starting TCP listening on TCP endpoint: 127.0.0.1:4444.
val it : unit = ()

startRecording("mysession.foo");;
val it : unit = ()
```

Quelques informations complémentaires :
- Cette méthode bloque votre session, il existe une autre fonction startRecordingInteractive() pour continuer à utiliser la session si besoin
- Le fichier de données va être très gros, prévoyez suffisamment de place (plusieurs Giga)

Une fois l'enregistrement terminé, le fichier est créé. Il vous suffit alors d'exécuter `replayRecording()` pour rejouer la session.

```fsharp
replayRecording("mysession.foo");;
Starting replay.
Received identification Mono PrivateEye v0.4.0 Process Id 484 Commercial: False
Replay status 5898240/58720256 10.0%
val it : System.Threading.Tasks.Task =
  System.Threading.Tasks.Task {AsyncState = null;
                               CreationOptions = None;
                               Exception = null;
                               Id = 1;
                               IsCanceled = false;
                               IsCompleted = false;
                               IsFaulted = false;
                               Status = Running;}

Replay status 11796480/58720256 20.1%
Replay status 17694720/58720256 30.1%
Replay status 23592960/58720256 40.2%
Replay status 29491200/58720256 50.2%
Replay status 35389440/58720256 60.3%
Replay status 41287680/58720256 70.3%
Replay status 47185920/58720256 80.4%
Replay status 53084160/58720256 90.4%
Replay completed.
```


# Version payante

> Cette version n'a malheureusement pas pu être présenté   durant la NCraft. 

Via la version payant, il vous sera possible de monitorer votre environnement de production. 
L'ensemble du système présenté fonctionnera alors dans l'autre sens. Vos applications de production seront elles en attentent de connexion et depuis votre session interactive F# vous allez vous connecter à l'application désirée.
Par défaut, rien ne sera monitorer. Il faudra activer chaque fonctionnalitén petit à petit et ce de façon très précise pour éviter de faire tomber la production. 

Je ne peux malheureusement pas donner plus d'informations pour l'instant car cette version n'est pas encore disponible.

# Questions en vrac

- Y aura t'il un support des applications **.net Core** ?
	- Non pas pour tout de suite car les API Core à utiliser ne sont pas encore bien définies et ce ne sera pas le cas avant pas mal de temps.
	
- Pour quand est prévu la sortie de la version payant ?
	- Une sortie vers la fin l'année 2016 est envisagé.


# Conclusion
Bien que pas encore mature, PrivateEye est un outil prometteur qui s'adresse évidemment à des connaiseurs et tout bon Hackeur.
La maitrise de F# n'est pas une nécéssité et il existe meme un package nuget que l'on peut facilement référencer dans un projet .net.
Bref pour conclure je dirais "Wait and See"

