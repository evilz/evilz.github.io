---
layout: post
title: Microsoft WebCamp HTML5
date: 2011-03-29 13:17
author: evilz
comments: true
categories: [css3, html5, Informatique, Microsoft]
feature: https://farm5.staticflickr.com/4725/25472196478_bbc5f1f6a6_m.jpg
---

Ce mercredi 16 mars j'ai assisté au WebCamp HTML5 chez Microsoft présenté par David Rousset, Aurélien Verla, Glovanni Clément et Sébastien Doncker.
Je ne vais pas vous rapporter l'ensemble des infos qui nous ont été présentées, je vais sélectionner ce qui me semble le plus important et en profiter pour y intégrer mon point de vue (complètement personnel).

<!--more-->

## Que faut-il comprendre par HTML5 ?
Quand on entend parler d'HTML5 il est souvent sous-entendu HTML5 et ses amis. Il s'agit finalement d'un ensemble de techno/produits utilisés pour le Web dans les navigateurs '« moderne '». On y trouve :
-	Html5 : le langage de balisage (markup)
-	CSS3 : Feuille de Style
-	SVG 1.1 : graphisme vectoriel
-	WOFF : un format de police de caractère comprimée

## Ou en est-on ?

Avant de donner l'état d'avancement d'HTML5, un bref rappel sur ce qui s'est passé ces dernières années est nécessaire :

Le W3C, groupe connu de tous, qui s'occupent de spécifier les standards Web, travaillait depuis bien longtemps sur une version XHTML2 devant succédé à XHTML1.1 ou HTML4.

Malheureusement la direction choisie pour le développement de ces spécifications ne correspondait pas à la vision de l'ensemble, bien que je pense que cela ne sera jamais possible. Le problème majeur de cette nouvelle version étant la non-rétrocompatibilité avec les versions précédentes, sous-entendu '« ton site, tu le supprimes  et tu recommences '». Sur le principe je ne trouve pas ça déconnant, beaucoup de site son revu complètement au niveau front de toute façon. 
Le second problème c'est que le working group chargé y travaille depuis longtemps, bien trop longtemps.  C'est alors qu'un nouveau groupe (de rebelles) nommé le Web HyperText Application Technology Working Group (ou WHATWG) se forme pour travailler sur une nouvelle version de HTML. C'est finalement en avril 2007 que les spécifications de ce nouveau groupe sont adoptées par le W3C comme spécification de départ pour le HTML5 ! Mais l'histoire est loin d'être finie, le 2 juillet 2009 les crédits accordés pour le working group XHTML2 ne sont plus renouvelés, il est donc clair maintenant que l'avenir se tourne vers HTML5. Le compte de fée aurait pu finir ainsi en Happy End, mais c'était sans prend en compte que l'existence de deux groupes est toujours présente. Et c'est ainsi que l'on rentre dans une lutte acharné en le W3C et le WHATWG, dont la façon d'aborder la problématique est légèrement différente.

Le W3C c'est :
442 membres, dont pas mal de Microsoft.
La problématique actuelle de Microsoft c'est de réussir à faire migrer ses clients (PME et grand compte) vers des navigateurs actuels (IE9 pour ne pas le citer). Ils ont d'ailleurs lancé une initiative pour arriver à l'éradication d'IE6 <a href="http://ie6countdown.com/" target="_blank">http://ie6countdown.com/</a>. On comprend très bien cette problématique ou dans certaine boite des applications entières reposent sur l'utilisation de composant ActiveX ou d'autres bidouilles farfelues n'étant plus supportées dans nos navigateurs actuel. Ok, certes, mais y a un moment où il faut dire stop. On sait bien que IE6 à son lot de bugs, et qu'il n'est plus supporté, alors s'il vous plait messieurs ou mesdames les DSI, faites migrer votre parc, jetez vos applications mal développées qui ne sont pas ouvertes et qui vous contraigne sans arrêt.

De l'autre côté nous retrouvons le WHATWG, dont l'acteur principal est Ian Hickson qui est maintenant chez Google. Ian est accompagné de plusieurs personnes de chez Apple, Mozilla Foundation, et Opera Software. Le groupe est nettement plus petit. Et toutes les entreprises citées précédemment n'ont aucun complexe à mettre régulièrement leurs navigateurs à jours. Et c'est donc tout naturellement qu'ils ont créé une spécification HTML nommée '« living standard '», dont le principe est dévoluer constamment, c'est très agile dans le fond :p. (<a href="http://www.alsacreations.com/actu/lire/1171-ne-mappelez-plus-html-5.html" target="_blank">http://www.alsacreations.com/actu/lire/1171-ne-mappelez-plus-html-5.html</a>)


Conclusion on se retrouve avec 2 spécifications à 2 vitesses.

## Mais alors HTML5 concrètement c'est quoi ?

Concrètement HTML5 c'est principalement un gros buzz commercial pour vendre du navigateur. Les spécifications W3C sont toujours en Draft et peuvent encore évoluer, en face les spécifications WHATWG ne font que ça ! Au finale chaque navigateur décide d'implémenter les fonctionnalités qu'ils veulent et de la façon qu'ils pensent être correcte.
Même si certaines dates ont été annoncées, par exemple : version final du draft W3C pour mai 2011 (donc dans 2 mois) la réalité prouve le contraire, et MS pense à voir une version finale vers 2014, d'autres mauvaises langues (dont je fais partie) ont lancé un pavé dans la marre en annonçant une possible version finale en 2022.

## Bon alors on peut faire quoi ?

On peut commencer à regarder, et si l'on veut vraiment se lancer et créer un site compatible sur tous les navigateurs il faut faire le tri dans les fonctionnalités en regardant diverses matrices :

<a href="http://a.deveria.com/caniuse/" target="_blank"> http://a.deveria.com/caniuse/</a>
<a href="http://en.wikipedia.org/wiki/Comparison_of_layout_engines_(HTML_5)" target="_blank"> http://en.wikipedia.org/wiki/Comparison_of_layout_engines_(HTML_5)</a>
<a href="http://wiki.whatwg.org/wiki/Implementations_in_Web_browsers" target="_blank"> http://wiki.whatwg.org/wiki/Implementations_in_Web_browsers</a>
<a href="http://rgaucher.info/pub/whatwg_html5_implementations.html"> http://rgaucher.info/pub/whatwg_html5_implementations.html</a>
Pour vous donner une idée de l'état prenons une fonctionnalité en exemple :
La balise  :
Cette nouvelle balise permet d'afficher simplement un lecteur de vidéo directement géré par le navigateur. Génial ! Et au niveau des codecs supportés ? Arf la question qui fache. Le W3C ne donne aucune précision sur ce point, du coup on se retrouve avec trois codecs différents qui ne sont pas supportés par tous les navigateurs.
Au début Apple et les autres sont rapidement parti sur le codec H264, malheureusement ce codec pose le problème des royalties. Et nos amis de Mozilla ne sont pas pour payer le moindre centime, ils décident alors de partir sur Ogg Theora, puis Google nous sort son VP8 appelé maintenant WebM. Au final, pour avoir une vidéo supportée par tous, il faut l'encoder plusieurs fois. On retrouve un le même problème pour le côté audio, mp3 = royalties.

<a href="http://en.wikipedia.org/wiki/HTML5_video#cite_note-21" target="_blank"> http://en.wikipedia.org/wiki/HTML5_video#cite_note-21</a>
<a href="http://www.alsacreations.com/article/lire/1125-introduction-balise-video-html5-mp4-h264-webm-ogg-theora.html" target="_blank"> http://www.alsacreations.com/article/lire/1125-introduction-balise-video-html5-mp4-h264-webm-ogg-theora.html</a>
<a href="http://diveintohtml5.org/video.html" target="_blank"> http://diveintohtml5.org/video.html</a>
Se pose aussi le problème de la personnalisation du player, tous les navigateurs ne supportent pas exactement le même niveau de personnalisation. Et cela risque de demander un peu de JavaScript.
<a href="http://dev.opera.com/articles/view/custom-html5-video-player-with-css3-and-jquery/" target="_blank"> http://dev.opera.com/articles/view/custom-html5-video-player-with-css3-and-jquery/</a>

Et quid des performances ? Pour une video FullHD une accélération matérielle peut être intéressante, il semble actuellement qu'IE9 soit un peu en avance sur ce sujet.
La technologie avancées de streaming comme le Smooth Streaming de Microsoft ou encore la gestion des DRMs n'est pas supportée. Il est donc intéressant dans ce cas de faire un fallback de Silverlight ou Flash vers HTML5.
Vous l'aurez compris tout n'est pas si beau en HTML5 et l'on est loin du '« write once work everywere '». Mais il faut commencer à y aller pas à pas. Les nouvelles balises offertes par html5 peuvent donner une meilleure accessibilité et une meilleure indexation des moteurs de recherche

(&lt;nav&gt;,&lt;section&gt;,&lt;aside&gt;,&lt;header&gt;,&lt;footer&gt;,&lt;nav&gt;,&lt;dialog&gt;,&lt;figure&gt;)

<a href="http://www.evilznet.com/wp-content/uploads/2011/03/structure-html5.gif"><img class="aligncenter size-medium wp-image-931" title="structure-html5" src="http://www.evilznet.com/wp-content/uploads/2011/03/structure-html5-300x150.gif" alt="" width="300" height="150" /></a>

Les CSS3 donnent plus de possibilité de personnalisation du rendu visuel particulièrement via les média queries qui permet une adaptation accrue au support. C'est un peu moins de bidouille pour faire une ombre ou une bordure aux angles arrondis.

WOFF, qui est une enveloppe de polices devrait permettre rapidement de pourvoir utiliser n'importe quelle Font sur l'ensemble des navigateurs, j'attend de voir sur du mobile par exemple
<a href="http://people.mozilla.org/~jkew/woff/woff-spec-latest.html" target="_blank"> http://people.mozilla.org/~jkew/woff/woff-spec-latest.html</a>

## Les tests

Je vous ai donné des liens vers des matrices, mais finalement sont-elles justes ?
Bonne question c'est encore un point faible dans le processus du W3C. Actuellement ce sont les développeurs des navigateurs qui créer les tests. Et vous savez quoi, ils arrivent toujours à passer 100% des tests qu'ils fournissent.

<a href="http://ie.microsoft.com/testdrive/Benchmarks/SunSpider/Default.html">Webkit SunSpider Results</a>

<a href="http://ie.microsoft.com/testdrive/Benchmarks/Acid3/Default.html">ACID3 Results</a>

<a href="http://ie.microsoft.com/testdrive/Benchmarks/CSS3Info/Default.html">CSS3.info Selectors Test</a>

<a href="http://samples.msdn.microsoft.com/ietestcenter/">IE Testing Center</a>

<a href="http://html5test.com/">http://html5test.com</a>

Ils n'y a pas de bon ou mauvais tests dans la liste de ses liens, il y a surtout un manque de travail du côté du W3C, c'est à eux de fixer les règles et une règle peut donner plusieurs tests. Ils sembleraient que 100000 tests soit nécessaire uniquement pour la partie HTML. Pour l'instant Microsoft a fourni 5899 tests.

## L'outillage

J'ai appris une bonne nouvelle, le SP1 de Visual Studio 2010 permet le support de HTML5 ! Auto complétion, coloration et validation !
Dreamweaver CS5 a aussi le support
A par ça les outils sont encore rares, au pire il vous reste Notepad++ ;)

## Conclusion

Je vais terminer là-dessus.
HTML5 sera l'avenir mais pas encore le présent, on est encore dans l'innovation et sur des fonctionnalités instables, qui peuvent changer à tout moment (ex: les web socket).
Beaucoup de JavaScript est encore nécessaire et la compatibilité cross plateforme n'est toujours pas là.
On est donc loin de se séparer complètement de Silverlight ou de Flash, qui évoluent très très rapidement et qui seront deux techno certainement hallucinantes d'ici 2014. C'est finalement une guerre entre constructeurs au détriment des utilisateurs qui est encore en train de se dérouler, cela rappel le combat HD-DVD contre Blu-ray. La standardisation unique n'est peut-être tout simplement pas humainement atteignable.
