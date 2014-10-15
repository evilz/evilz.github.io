---
layout: post
title: Nouveau projet 'nPress'
date: 2009-07-06 22:37
author: evilz
comments: true
categories: [Informatique, nPress, programmation, projet]
---
[![NPress](http://farm3.static.flickr.com/2513/3694651771_b4c99012f6_t.jpg)](http://www.flickr.com/photos/evilznet/3694651771/ "NPress de evilz, sur Flickr")Via ce post, je vous annonce que j'ai entrepris de coder une conversion de WordPress en C#.

Après un rapide coup d'oeil aux sources de WordPress, j'ai les yeux qui piquent !
Plus sérieusement il est bien sûr impossible d'écrire un code mot à mot équivalents au code PHP.
Je me fixe donc d'autres objectifs :

*   Avoir le même fonctionnement
*   Avoir le même visuel / rendu
*   Utiliser la même base, je veux pouvoir faire tourner nPress sur une base WordPress
*   Que ça tourne sur mono (apache/XSP)
Mais le plus interessant la dedans c'est que je vais écrire une suite de post pour partager mes points de vue et mon avancement du projet. J'attends de vous un maximum de retour. N'oubliez pas que toute critique est bonne à prendre, alors n'hésitez pas. Je risque même d'en choquer certain au début, car je vais me coller au plus proche des sources PHP.

Voici les techno/outils que je compte utiliser :

*   asp.net MVC : cela va me permettre d'avoir un rendu identique à celui de WordPress ou presque
*   NHibernate
*   Fluent Nhibernate
*   MySql ou Sqllite
*   Test unitaire Visual Studio
