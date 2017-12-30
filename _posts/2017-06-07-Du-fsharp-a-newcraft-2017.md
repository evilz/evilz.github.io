---
layout: post
title: Du Fsharp à NewCrafts 2017
date: 2017-06-07
author: evilz
comments: true
tags: [dotnet, Informatique]
feature: https://farm5.staticflickr.com/4599/38677096174_8c651790b7_z.jpg
---

J'ai eu la chance d'assister aux deux jours de la [conférence NewCrafts de cette année](http://ncrafts.io).
Sur les deux jours, nous avons pu assister à de nombreuses présentations très intéressantes,
mais je vais ici m'intéresser aux sessions abordant du Fsharp et auxquelles j'ai pu participer.

 
## Scott Wlaschin - Thirteen ways of looking at a Turtle
**@ScottWlaschin**

![](https://farm5.staticflickr.com/4590/38677096634_9fa35623fb_z.jpg)
 
Tout le monde se pose la même question en lisant le titre de la session : "Une tortue ? What ...?"
En fait Scott nous propose en utilisant l'image de cette tortue une API très simpliste permettant de tracer des traits.
La "tortue" peut se déplacer en avant, tourner sur un angle donné et finalement dessiner ou non le trait pendant son déplacement.
 
Cette API de quatre méthodes peut sembler trop simple pour être vraiment intéressante, mais nous allons voir sa réalisation en utilisant 13 approches différentes.
Cela va du modèle orienté objet classique, en passant par de l'actor model puis de l'event sourcing.
 
 
Je vous recommande fortement de jeter un coup d'œil, car même si le code est présenté en F#, cela reste applicable dans d'autres plateformes/langages.
L'ensemble du contenu est en ligne sur [son fameux site](https://fsharpforfunandprofit.com/turtle/)
 
 
## Michel Grootjans et Thomas Coopman : Playing with projections
**@michelgrootjans @tcoopman**


J’ai participé à un atelier, où nous avons joué avec des projections. 
Lorsque l’on fait de l’event sourcing, il va souvent falloir relire et rejouer les événements d’une certaine façon, que ce soit pour retourner dans un état particulier ou pour faire des analyses, il y a souvent besoin de faire des transformations sur des paquets d'événements.
 
L’objectif de cet atelier était donc de travailler sur ces transformations qui sont appelées des Projections.
Le domaine métier est relativement simple, mais possède déjà de nombreux types d'événements. 

![](https://farm5.staticflickr.com/4681/24519809777_39e840ba0c_z.jpg)
 
J’avoue ne pas avoir fait l’exercice directement en F# mais en C# en utilisant pas mal de linq. Donc facilement portable en F#.
D’ailleurs l’exercice est disponible dans de nombreux langages. 
 
Je vous invite à regarder [ici](https://github.com/michelgrootjans/playing_with_projections)
 
 
---
 
## Evelina Gabasova - The F#orce Awakens
**@evelgab**
 
 <amp-youtube data-videoid="R10rPhpLvr8" layout="responsive" width="480" height="270"></amp-youtube>
 
Après une introduction digne de la saga Star Wars, Evelina nous a présenté comment elle a réalisé une analyse autour des personnages en utilisant les scripts des sept films.
 
1) La première étape consistait à réussir à parser les différents scripts des films pour en extraire les noms des personnages. Elle a alors utilisé les scènes pour en déduire les personnages connectés.
Cela ne s'est pas fait sans mal puisque chaque script possède un format différent et que certains personnages n'ont même pas de dialogue.
 
Pour cette première étape ce sont des regex et des active patterns qui ont été utilisés.
 
```fsharp 
// Active pattern to parse the contents of the script
let (|SceneTitle|Name|Word|) (text:string) =
    let scenePattern = "[ 0-9]*(INT.|EXT.)[ A-Z0-9]"
    let namePattern = "^[/A-Z0-9]+[-]*[/A-Z0-9 ]*[-]*[/A-Z0-9 ]+$"
    if Regex.Match(text, scenePattern).Success then
        SceneTitle text
    elif Regex.Match(text, namePattern).Success then
        Name text
    else Word
```
 
2) Deuxième étape : Analyser les données.
 
Evelina nous a montré ses différents [Azure notebook](https://notebooks.azure.com/) d'analyse.
Ces notebooks, fortement inspirés de ceux disponibles depuis longtemps en Python, permettent de mélanger texte et code exécutable.
Il est même possible d’utiliser la lib Fsharp.Data pour générer des graphiques plus ou moins complexes.

![](https://farm5.staticflickr.com/4728/39355368362_eea1c8ed5d_z.jpg)
 
3) Troisième étape : Utiliser plusieurs apis publiques fournissant des informations supplémentaires sur Star Wars.
Il s'agit principalement de l'api [Swapi](http://swapi.co/API)
Elle fournit des détails sur de nombreux éléments de la saga et possède même les clients pour plusieurs langages.
C'est Evelina qui a créé le client F#.
 
Pour cela elle a utilisé une fonctionnalité très puissante de F# : les Type Provider.
Une simple référence vers le package JsonProvider a créé deux constantes contenant une json d'exemple : une avec les champs minimum et l'autre complète. Le provider se charge de créer dynamiquement un modèle.
 
Elle a complété sa démo en croisant des données récupérées d'IMDB en utilisant la même technique, mais un provider différent : 'HtmlProvider' qui est lui capable de récupérer un tableau de données pour notre exemple.
 
![](https://farm5.staticflickr.com/4642/39385329141_3591e4cb6e_z.jpg)
 
Pour tous les détails, rendez-vous sur [son blog](http://evelinag.com/blog/2016/01-25-social-network-force-awakens/)
 
Que faut-il retenir de tout ça ? 
Plusieurs points sont intéressants à garder en tête :

- F# permet de très vite et avec peu de code prototyper l'analyse de données.
les Type Provider et les notebooks sont aussi d'une grande aide.
 
- Commencer par analyser un ensemble de données connu avant de se lancer sur des analyses à grande échelle.
Bien que le domaine lié à Star Wars puisse paraître geek, c'est surtout un domaine connu par beaucoup de monde, et cela permet de s'apercevoir rapidement des résultats incohérents.
 
---
 
## Gien Verschatse - Playing nice together: how to use F# in a brownfield project
**@selketjah**

![](https://farm5.staticflickr.com/4732/39385329281_ae3fc96c21_n.jpg)
 
J'attendais cette session avec impatience. Gien, développeuse Belge pour des jeux de casino en ligne, nous a fait un retour d'expérience sur son intégration de développement F# au sein d'un existant en C#.
 
Elle a donc passé en revue les différentes fonctionnalités qui pouvaient ou non être utilisées depuis un programme C# voire VB.net.
 
J’ai refait moi-même quelques tests suite à cette présentation et [mon code est disponible ici](https://github.com/evilz/Fsharp-from-csharp)
 
Ce que je retiens surtout de ce retour d'expérience, c’est le courage de Gien à s'être lancée dans l’aventure F#, dans le sens où il est difficile (pour ne pas dire impossible) de trouver des missions en F#. C’est donc à nous d’introduire au fur et à mesure cette techno si cela nous semble adéquat.
 

---
 
## Krzysztof Cieslak - Hacking F# in JS ecosystem
**@k_cieslak**
 
![](https://farm5.staticflickr.com/4725/39355368152_ff3dc158a0_z.jpg)
 
Dans cette session, Krzysztof nous présente le dernier Framework à la mode dans la communauté FSharp, `Fable`.
Fable est un compilateur F# vers JavaScript qui s'appuie sur Babel.
 
Fable va prendre votre code F#, en extraire un AST et le fournir à Babel qui fait le reste du travail pour obtenir un code Js pour Navigateur ou NodeJS.
On peut alors se poser la question : Mais pourquoi ?
La réponse simple serait “parce qu’on peut !” ou encore “pourquoi pas !”
 
Mais il y a de vrais avantages à utiliser F# comme langage principal :
- Une approche fonctionnelle
- Tout est fortement typé : Record type et Union Type
- Toutes les fonctionnalités avancées : pattern matching, Computation Expression
- Réutilisation de code côté serveur
- Pragmatique
- Communauté
 
Il nous a ensuite présenté l'outil à travers plusieurs démos dans le navigateur avec du JS très simple, mais aussi une démo react.
 
Il faut aussi savoir que Fable permet la génération de sourcemap ; il est donc possible de déboguer le code F# depuis la fenêtre de DevTool de Chrome !
 
La dernière version de Fable est utilisable directement depuis la cli dotnet et permet donc d'initialiser rapidement un projet ou de démarrer un serveur : 
 dotnet fable start
 
[Plus d’infos sur ce billet du blog](http://fable.io/blog/Introducing-1-0-beta.html)
 
De plus si comme moi vous vous demandez comment jouer avec du code d’une librairie externe et comment récupérer tous les types un peu comme le fait Typescript, les devs de la communauté ont pensé à tout et ont créé cet outil : [ts2fable](https://www.npmjs.com/package/ts2fable), qui permet de convertir un type definition de Typescript en Fsharp.

 
Vous trouverez plus d'informations et de démos sur [le site officiel](http://fable.io/)
 
---
 
## Mathias Brandewinder - Serverless F# with Azure Functions: fsibot goes nano-services
**@brandewinder**
 
![](https://farm5.staticflickr.com/4644/39385329341_8e1455883c_z.jpg)

 
Le Professeur Tournesol nous a très rapidement montré comment mettre en place grâce aux Azure Functions un système Server Less (ou presque) en F#.
 
Ce que j'apprécie principalement sur le système des Azure Functions c’est l’interface en ligne simple et agréable à utiliser. Il est vraiment facile de créer une nouvelle fonction et de définir le trigger qui va la déclencher. 
Il y a déjà pas mal de triggers disponibles et nous avons pu voir l’utilisation d'un trigger basé sur une horloge et d'un autre sur des messages queue.
 
 <p>      </p>
 
Le FsiBot de Mathias utilise ces deux triggers. L’application regarde à intervalles réguliers les tweets d’un channel comportant du F#, compile et s'exécute. 

![](https://farm5.staticflickr.com/4599/38677096784_1554bbcf02_z.jpg)
 
[Le code est disponible ici](https://github.com/mathias-brandewinder/fsibot-serverless)
 
[Et un petit billet explicatif ici](http://brandewinder.com/2017/04/01/azure-function-app-diagram/)
 
---
 
 
## Et pour conclure

Deux journées finalement assez riches pour la communauté F#. Et même si les 45min de présentation ne permettent pas de rentrer dans le détail, cela a l'avantage de présenter la technologie et les possibilités du langage aux développeurs.
Je vous invite donc à regarder de près ce langage .net au travers des différents liens fournis ainsi que sur http://fsharp.org et [awesome-fsharp](https://github.com/fsprojects/awesome-fsharp).