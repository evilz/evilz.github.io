---
layout: post
title: Evilznet .net vers php
date: 2009-06-29 23:47
author: evilz
comments: true
categories: [Evilznet, php, WordPress]
---
<a title="wordpress-icon-512 de evilz, sur Flickr" href="http://www.flickr.com/photos/evilznet/3675031760/"><img class="alignleft" src="http://farm3.static.flickr.com/2628/3675031760_e543d75045_t.jpg" alt="wordpress-icon-512" width="100" height="100" /></a>Une fois n'est pas coutume, le site à encore changé de design. Mais ce n'est que la partie visible de l'iceberg. Certain l'ont déjà remarqué le blog tourne maintenant sur <strong><a href="http://wordpress.com/" target="_blank">WordPress</a></strong>. Non vous avez bien lu ! Pour les plus incultes <strong>WordPress</strong> est un moteur de blog très puissance et très largement utilisé, et le tout développé en PHP.
'« Quoi ! Un dev .net qui à un blog en PHP ! '» Ba oui, je ne suis pas forcement attaché à une techno. Il est vrai que j'ai longtemps critiqué le PHP, et je pense qu'il reste encore des progrès à faire surtout côté IDE (mais ce n'ai qu'un avis perso).

Je ne suis pas passé sur WordPress par hasard, c'est un peu gr'ce à Julien (merci) et au site <a href="http://www.altnetfr.org" target="_blank">Alt.net FR </a>que j'ai découvert l'application. L'interface m'a tout de suite séduit. En quelques mots c'est simple et efficace. Elle est facile à prendre en main, et l'Ajax qui ce promène un peu partout y est pour quelque chose. <strong>WordPress</strong> c'est aussi une grosse communauté. On trouve des milliers de thèmes, et plugins qui s'installent très simplement en quelques cliques et ce directement via l'interface web. Cela rappelle d'ailleurs le système de plugin de Firefox, avec un petit moteur de recherche et les notations. Au niveau extensibilité <strong>WordPress</strong> ne fait pas les choses à moitié, les extensions sont visibles du côté du site final comme sur le site d'admin (dans les menus et/ou les pages supplémentaires)
<p style="text-align: center;"><a title="Admin wordpress de evilz, sur Flickr" href="http://www.flickr.com/photos/evilznet/3674785234/"><img class="aligncenter" src="http://farm3.static.flickr.com/2446/3674785234_779833a31a.jpg" alt="Admin wordpress" width="500" height="321" /></a></p>

C'est bien beau tout ça, mais côté migration comment ça ce passe ?
Cela c'est plutôt bien passé. J'ai d'abord exporté le contenu du blog en format <strong>BlogML</strong>. Et j'ai rajouté quelques fichiers pour permettre l'importation depuis ce format (plus d'infos <a href="http://balajiramesh.wordpress.com/2008/06/21/blogml-importer-for-wordpress-25/" target="_blank">ici</a>). Tout n'était pas parfait, surtout les catégories (le nom était en fait l'id), j'ai donc gérer manuellement le problème dans le fichier XML avec un simple chercher/remplacer et relancé l'import. Au bout de quelques essais je suis arrivé à un résultat satisfaisant.
J'ai profité de ce remaniement pour revoir mes catégories, j'ai réduit leur nombre à 5 : <strong>Informatique</strong>, <strong>evilznet</strong>, <strong>Films</strong>, <strong>Sports</strong> et <strong>Divers</strong>. Les tags permettront d'affiner les recherches si besoin.

Il y a quand même quelques points négatifs indirectement lié à WordPress. Ce sont des petits soucis d'ordre techniques que je ne vais pas pouvoir résoudre. Mon hébergeur (qui est très bon et pas cher) me permet de faire du <strong>.net 3.5</strong> le tout sur un <strong>IIS 7</strong>, mais les fonctionnalités de rewriting de Worpress sont prévues pour <strong>apache</strong>. Du coup fini les friendly url. De même certain plugin qui devrait me permettre de gérer les 404 ne fonctionne pas, en conséquence beaucoup de liens Google seront casés.

N'hésité pas à me laisser un petit commentaire pour me donner votre avis sur le nouveau design ou sur WordPress.
