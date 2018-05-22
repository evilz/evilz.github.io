---
layout: post
title: Retour sur la Fsharp Exchange 2018
date: 2018-04-11
author: evilz
comments: true
tags: [Web, Informatique]
feature: https://farm1.staticflickr.com/976/28404284398_89e98f320e_c.jpg
---

La Fsharp Exchange est l'une des plus importantes conférences de l'année sur F# (côté Europe).
Et pour l'occasion, la communauté a répondu présente avec plus de 160 personnes sur place.

Au coeur de Londres, dans les locaux de Skills Matter, les présentations se sont enchaînées à un rythme effréné avec une quinzaine de présentations par jour.

## La communauté

La communauté F# est composée de nombreuses personnes dans le monde entier, le langage étant open source on y trouve de nombreux contributeurs. 
Si certains sont au coeur de F# comme Steffen Forkmann [@sforkmann](https://twitter.com/sforkmann) ou Enrico Sada [@enricosada](https://twitter.com/enricosada), d'autres contribuent à l'outillage comme Krzysztof Cieślak [@k_cieslak](https://twitter.com/k_cieslak) sur [ionide.io](http://ionide.io) ou aux nombreuses librairies listées sur [fsproject](https://github.com/fsprojects).

De plus, nous avons clôturé cette conférence en mode table ronde avec une sélection de quelques contributeurs sélectionnés par Don Syme lui-même.
En mode interview, ces contributeurs se sont présentés, ont présenté leur projet, le parcours pour arriver à contribuer et maintenir les projets.

<div align="center">
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Now starting the panel of <a href="https://twitter.com/hashtag/fsharp?src=hash&amp;ref_src=twsrc%5Etfw">#fsharp</a> Rockstar OSS contributors ! <a href="https://twitter.com/hashtag/fsharpx?src=hash&amp;ref_src=twsrc%5Etfw">#fsharpx</a> <a href="https://t.co/7a4eNGJtVw">pic.twitter.com/7a4eNGJtVw</a></p>&mdash; Alfonso Garcia-Caro (@alfonsogcnunez) <a href="https://twitter.com/alfonsogcnunez/status/982294203718885376?ref_src=twsrc%5Etfw">April 6, 2018</a></blockquote>
</div>

Ce qui rassemble toutes ces personnes, c'est avant tout la passion du code, du fonctionnel pour la plupart, et du partage. Il faut savoir que les échanges les plus importants se passent en dehors des présentations pendant les pauses. Tout le monde est très accessible et il est même possible d'avoir de petits code reviews sur un coin de table.


<div align="center">
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/hashtag/fsharpX?src=hash&amp;ref_src=twsrc%5Etfw">#fsharpX</a> we do whatever Scott Washin tells us to do 😂 <a href="https://twitter.com/SoatGroup?ref_src=twsrc%5Etfw">@SoatGroup</a> <a href="https://t.co/4Y8cHCD21L">pic.twitter.com/4Y8cHCD21L</a></p>&mdash; Vincent Bourdon (@Evilznet) <a href="https://twitter.com/Evilznet/status/981812141874401280?ref_src=twsrc%5Etfw">April 5, 2018</a></blockquote>
</div>


Voici une petite interview de Don Syme à propos de la communauté.
<div align="center">
<blockquote class="twitter-video" data-lang="en"><p lang="en" dir="ltr">I caught a quick chat with <a href="https://twitter.com/dsyme?ref_src=twsrc%5Etfw">@dsyme</a>, creator of <a href="https://twitter.com/hashtag/fsharp?src=hash&amp;ref_src=twsrc%5Etfw">#fsharp</a> language. We talk about <a href="https://twitter.com/hashtag/fsharpX?src=hash&amp;ref_src=twsrc%5Etfw">#fsharpX</a> and F# community. //<a href="https://twitter.com/mlusiak?ref_src=twsrc%5Etfw">@mlusiak</a> <a href="https://t.co/Yj74tJIjCY">pic.twitter.com/Yj74tJIjCY</a></p>&mdash; tretton37 (@tretton37) <a href="https://twitter.com/tretton37/status/981909620401766400?ref_src=twsrc%5Etfw">April 5, 2018</a></blockquote>
</div>




## Fsharp Everywhere !
<div align="center">
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Twitter: “F# is dead”, “Most F# devs moved to Haskell or something else”... <br><br>Meanwhile real world and industry <a href="https://twitter.com/hashtag/fsharp?src=hash&amp;ref_src=twsrc%5Etfw">#fsharp</a> usage: <a href="https://t.co/4OmYLXsBC0">pic.twitter.com/4OmYLXsBC0</a></p>&mdash; Krzysztof Cieślak (@k_cieslak) <a href="https://twitter.com/k_cieslak/status/983321387703074816?ref_src=twsrc%5Etfw">April 9, 2018</a></blockquote>
</div>


L'utilisation de F# n'en finit pas d'évoluer ! C'est évidemment un très bon langage (tout comme C#) mais deux faits importants aident à cette progression :

- La mode du fonctionnel : on entend beaucoup parler de **Haskel**, de **ELM** ou plus simplement **React**.
- Avec F#, on peut répondre à tous les besoins ! Et c'est ce qui à été démontré pendant cette conférence.

### Pour le WEB 

- côté back on peut utiliser Giraffe, Suave, WebSharper, Freya ...
- côté front : Fable et Fable.Elmish
- pour les deux, la stack SAFE permet de faire du Suave / Azure / Fable / Elmish quasiment en un claquement de doigts !

La présentation de Tomasz Heimowski était tout simplement impressionnante et tout le monde retiendra sa VITESSE de développement et le feedback rapide que l'on peut avoir en F#.
[SAFE apps with F# web stack](https://skillsmatter.com/app/conferences/9419-f-sharp-exchange-2018/skillscasts/11308-safe-apps-with-f-web-stack) – Tomasz Heimowski ([slides](http://theimowski.com/talk-safe-stack/#/))

### Pour l'analyse de données

F# permet facilement de manipuler des jeux de données grâce au design de code sous forme de pipeline. 
Cela permet de facilement ajouter/modifier des filtres, des sélections, des transformations sur les données.
De plus, les typeprovider ajoutent si besoin une notion de typage à la volée quasiment gratuite.
En utilisant la REPL et de simples scripts .fsx, on arrive à visualiser des résultats en quelques minutes.
Cette année, Jamie Dixon nous a parlé de son expérience avec son fils sur les courses de Stock cars avec un simple RASPBERRY PI :
  [STOCK CARS, RASPBERRY PI, AND F#](https://skillsmatter.com/app/conferences/9419-f-sharp-exchange-2018/skillscasts/11639-stock-cars-raspberry-pi-and-f-sharp)

### Transpilage

F# étant un bon langage typé et fonctionnel, les développeurs l'aiment jusqu'à l'utiliser comme source pour être transpilé dans une autre plateforme. Cette année nous avons vu :

- **Fable** : qui permet de transpiler en Javascript et faire du code pour navigateur ou du nodeJS
- **FEZ**: qui transpile en code pour BEAM, présenté par Karl Nilsson ([slides](https://docs.google.com/presentation/d/1yos-mvWd01_78UNLpTpvABlyhizbp5td_91b03AuO7E/edit#slide=id.p))

### Ecosystème dotnet

Il y a encore plein de possibilités, l'accès aux données, la gestion de logs, le machine learling, etc. Il ne faut pas oublier qu'il est tout simplement possible de faire tout ce que l'on peut faire en dotnet ! Du mobile, des applis riches, des microservices, du cloud...

### L'outillage

Tout ceci ne serait pas possible sans un bon outillage. Les IDEs sont de plus en plus nombreux avec chacun leurs propres fonctionnalités. La plupart s'appuyant sur le [F# Compiler Services](http://fsharp.github.io/FSharp.Compiler.Service/)

<div align="center">
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">. <a href="https://twitter.com/_cartermp?ref_src=twsrc%5Etfw">@_cartermp</a> shows how F# is now &quot;in the box&quot; in more ways than ever before. Great to see! <a href="https://twitter.com/hashtag/fsharpX?src=hash&amp;ref_src=twsrc%5Etfw">#fsharpX</a> <a href="https://t.co/rDS3W6Ctir">pic.twitter.com/rDS3W6Ctir</a></p>&mdash; Compositional IT (@compositionalit) <a href="https://twitter.com/compositionalit/status/982171754226335744?ref_src=twsrc%5Etfw">April 6, 2018</a></blockquote>
</div>


## Fsharp et Dotnet Core et Microsoft 

L'un des points les plus marquants pour moi, c'est la stratégie de Microsoft qui a clairement changé ces derniers temps, et notamment depuis l'ouverture en open source et l'arrivée de l'équipe Xamarin.
On constate une forte évolution au travers de dotnet Core/standard et de la CLI.

Mais en plus, F# fait maintenant partie de la stratégie "mainstream" et les modifications apportées sur les outils sont constamment testées sur des environements F# et certaines librairies associées.
Cela a déjà permis de constater des bugs dans Packet et Nugets et la résolution des problèmes se fait en bonne collaboration.

<div align="center">
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Whoa! 😵 this time it&#39;s sure Microsoft look deeply at F#! testing dotnet core against <a href="https://twitter.com/safe_stack?ref_src=twsrc%5Etfw">@safe_stack</a> is amazing <a href="https://twitter.com/_cartermp?ref_src=twsrc%5Etfw">@_cartermp</a> <a href="https://twitter.com/hashtag/fsharpX?src=hash&amp;ref_src=twsrc%5Etfw">#fsharpX</a>  <a href="https://twitter.com/FableCompiler?ref_src=twsrc%5Etfw">@FableCompiler</a> <a href="https://twitter.com/SoatGroup?ref_src=twsrc%5Etfw">@SoatGroup</a> <a href="https://t.co/shdDofYRe2">pic.twitter.com/shdDofYRe2</a></p>&mdash; Vincent Bourdon (@Evilznet) <a href="https://twitter.com/Evilznet/status/982175964665819138?ref_src=twsrc%5Etfw">April 6, 2018</a></blockquote>
</div>

Visual Studio s'enrichit enfin en fonctionnalités. Il suffit de voir ce post : [F# language and tools update for Visual Studio 2017 version 15.6](https://blogs.msdn.microsoft.com/dotnet/2018/03/06/f-language-and-tools-update-for-visual-studio-2017-version-15-6/) fait par Phillip Carter.

> We now build the F# Compiler Service project as a part of our CI, thanks to Steffen Forkmann

## Liens vers les présentations

Les vidéos sont accessibles uniquement si vous avez payé l'accès à la conférence, les slides sont quant à elles publiques.

*   [Keynote: Crossroads: F# in the middle of… nowhere?](https://skillsmatter.com/app/conferences/9419-f-sharp-exchange-2018/skillscasts/10137-keynote-crossroads-f-sharp-in-the-middle-of-nowhere) – Alfonso Garcia-Caro
*   [Fable for busy moms & dads! How F# and Fable help me to spend more time with my kids!](https://skillsmatter.com/app/conferences/9419-f-sharp-exchange-2018/skillscasts/11304-fable-for-busy-moms-dads-how-fsharp-and-fable-help-me-to-spend-more-time-with-my-kids) – François Nicaise ([slides](https://whitetigle.github.io/fsharpx2018/))
*   [FEZ – fsharp type safety for the BEAM](https://skillsmatter.com/app/conferences/9419-f-sharp-exchange-2018/skillscasts/11312-fez-fsharp-type-safety-for-the-beam) – Karl Nilsson ([slides](https://docs.google.com/presentation/d/1yos-mvWd01_78UNLpTpvABlyhizbp5td_91b03AuO7E/edit#slide=id.p))
*   [Property Based Testing in F#](https://skillsmatter.com/app/conferences/9419-f-sharp-exchange-2018/skillscasts/11478-property-based-testing-in-f-sharp) – Christina Nicolau
*   [Elmish: get your dev stack back under control](https://skillsmatter.com/app/conferences/9419-f-sharp-exchange-2018/skillscasts/11310-elmish-get-your-dev-stack-back-under-control) – Maxime Mangel ([slides](https://mangelmaxime.github.io/fsharp-exchange-2018-elmish/#/))
*   [SAFE apps with F# web stack](https://skillsmatter.com/app/conferences/9419-f-sharp-exchange-2018/skillscasts/11308-safe-apps-with-f-web-stack) – Tomasz Heimowski ([slides](http://theimowski.com/talk-safe-stack/#/))
*   [Easing the Path to F# Adoption](https://skillsmatter.com/app/conferences/9419-f-sharp-exchange-2018/skillscasts/11745-easing-the-path-to-f-sharp-adoption) – Colin Bull
*   [A journey into the F# compiler](https://skillsmatter.com/app/conferences/9419-f-sharp-exchange-2018/skillscasts/11629-a-journey-into-the-f-sharp-compiler) – Steffen Forkmann ([slides](https://forki.github.io/CompilerIntro/#/))
*   [STOCK CARS, RASPBERRY PI, AND F#](https://skillsmatter.com/app/conferences/9419-f-sharp-exchange-2018/skillscasts/11639-stock-cars-raspberry-pi-and-f-sharp) – Jamie Dixon
*   [Azure F#unctions](https://skillsmatter.com/app/conferences/9419-f-sharp-exchange-2018/skillscasts/11347-azure-f-sharpunctions) – Mikhail Shilkov ([slides](https://www.slideshare.net/MikhailShilkov/azure-functions-92988186))
*   [3D Model Manipulation with F#](https://skillsmatter.com/app/conferences/9419-f-sharp-exchange-2018/skillscasts/11603-3d-model-manipulation-with-f-sharp) – Wael El Oraiby
*   [Lightning Talk: Lessons from F#: From Academic Prototypes to Safety-Critical Systems](https://skillsmatter.com/app/conferences/9419-f-sharp-exchange-2018/skillscasts/11481-lightning-talk-lessons-from-f-sharp-from-academic-prototypes-to-safety-critical-systems) – Heidy Khlaaf
*   [Lightning Talk: Session types for F#ers](https://skillsmatter.com/app/conferences/9419-f-sharp-exchange-2018/skillscasts/11593-lightning-talk-session-types-for-f-sharpers) – Fahd Abdeljallal
*   [Lightning Talk: F# Support in JetBrains Rider](https://skillsmatter.com/app/conferences/9419-f-sharp-exchange-2018/skillscasts/11440-lightning-talk-f-sharp-support-in-jetbrains-rider) – Eugene Auduchinok
*   [Keynote: F# Code I Love](https://skillsmatter.com/app/conferences/9419-f-sharp-exchange-2018/skillscasts/11439-keynote-f-sharp-code-i-love) – Don Syme ([slides](https://twitter.com/dsyme/status/982238973861945344))
*   [Keynote: F# in 2018!](https://skillsmatter.com/app/conferences/9419-f-sharp-exchange-2018/skillscasts/10138-keynote-thrilled-to-have-phillip-carter-hosting-a-keynote-at-fsharpx-2018) – Phillip Carter
*   [How do we cook highload microservices at SBTech](https://skillsmatter.com/app/conferences/9419-f-sharp-exchange-2018/skillscasts/11309-how-do-we-cook-highload-microservices-at-sbtech) – Anton Moldovan
*   [The Curious Case of Freya, Suave, and Giraffe: Reducing Risks In Picking a New Tech.](https://skillsmatter.com/app/conferences/9419-f-sharp-exchange-2018/skillscasts/11516-the-curious-case-of-freya-suave-and-giraffe-reducing-risks-in-picking-a-new-tech) – Gien Verschatse
*   [Keynote: Deep Learning with CNTK and F#](https://skillsmatter.com/app/conferences/9419-f-sharp-exchange-2018/skillscasts/10265-keynote-can-t-wait-to-hear-from-mathias-brandewinder-at-fsharpx-2018) – Mathias Brandewinder
*   [Geo-Art with F# and Ordnance Survey Data](https://skillsmatter.com/app/conferences/9419-f-sharp-exchange-2018/skillscasts/11306-geo-art-with-fsharp-and-ordnance-survey-data) – Kit Eason
*   [Distributed Tracing, Lessons Learned](https://skillsmatter.com/app/conferences/9419-f-sharp-exchange-2018/skillscasts/11506-distributed-tracing-lessons-learned) – Gina Marie Maini
*   [Lightning Talk: Dr FunctionalLove or: How EROAD learned to stop worrying and love F#](https://skillsmatter.com/app/conferences/9419-f-sharp-exchange-2018/skillscasts/11602-dr-functionallove-or-how-eroad-learned-to-stop-worrying-and-love-f-sharp) – Jim Bennett ([slides](https://www.slideshare.net/JimBennett10/learning-to-love-f))
*   [Lightning Talk: Existentials – Playing Hide and Seek With Your Types](https://skillsmatter.com/app/conferences/9419-f-sharp-exchange-2018) – Nicholas Cowle
*   [Park Bench Panel hosted by Don Syme](https://skillsmatter.com/app/conferences/9419-f-sharp-exchange-2018/skillscasts/11438-park-bench-panel-hosted-by-don-syme)