---
layout: post
title: Web garden
date: 2011-02-07 16:27
author: evilz
comments: true
tags: [IIS, Informatique, Web garden]
---
Par défaut, une application Web est représentée par un seul processus dit Worker Process. Toutes les requêtes clientes reçues par IIS sont acheminées vers le Worker Process par le noyau http.sys. Les requêtes sont alors réparties sur les différents threads du processus.<!--more-->

Ce mécanisme par défaut couvre la majorité des besoins mais n'est pas forcément adapté pour un grand volume de transactions. La limite de requêtes traitées par une application Web dépend du temps de traitement et du nombre de threads disponibles. Dans certains cas, il convient de disposer d'un plus grand nombre de threads. Une des solutions est de définir un `Web Garden`, c'est-à-dire d'allouer plus d'un processus pour une application Web.

Pour cela, il convient de modifier la valeur spécifiée dans l'onglet Pool des propriétés d'un pool d'applications. Il n'y a pas de règle précise car ce paramétrage dépend du fonctionnel de l'application Web. Cependant, une bonne règle consiste à définir autant de `Worker Process` dans un `Web Garden` que le système dispose de processeurs physiques.

## Sur IIS 6
![](http://farm6.static.flickr.com/5257/5424899393_1e37b88eb9_o.png)

## Sur IIS 7
![](http://farm6.static.flickr.com/5131/5425500502_05209b5cd2_o.png)

Plus d'infos [ici](http://msdn.microsoft.com/fr-fr/library/bb469822.aspx)