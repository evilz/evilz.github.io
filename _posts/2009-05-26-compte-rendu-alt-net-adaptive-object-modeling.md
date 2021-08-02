---
layout: post
title: Compte rendu Alt.net 'Adaptive Object Modeling'
date: 2009-05-26 12:09
author: evilz
comments: true
categories: [Alt.net, Informatique]
---

# Contexte

Malgré un changement d’horaire tardif, la communauté à une fois de plus répondu
présent à l’appel avec environ 15 à 20 personnes présentes. La présentation était
animé par **Sébastien Ros** de la société Evaluant.

# Systèmes Adaptables

> Tout le monde en fait mais personne ne le sait

Un système adaptable permet de répondre à différentes problématiques :

- Les règles métiers peuvent changer fréquemment
- Cycles de développement, test, déploiement couteux
- Réutiliser la même application mais adapter le domaine à chaque utilisation

Pour cela le système doit s’adapter au domaine manipulé et non l’inverse. Le domaine devient alors une variable de configuration de l’application, il est décrit. On ne va plus directement décrire chaque entités du domaine dans une classe, mais créer un modèle objet qui va permettre de décrire ce domaine, on parle alors de meta modèle. Le domaine peut  alors être « instancié » via une description fournie par l’utilisateur ou l’expert métier et pour chaque nouvelle application, on fournit une nouvelle configuration (le modèle métier). Le système pourra interpréter cette nouvelle configuration directement pendant l’exécution (modification en temps réel)

# Techniques d’implémentation

L’implémentation de cette architecture adaptable est souvent composée de petit design pattern comme le pattern TypeObject ou encore le pattern Strategy.

## TypeObject

![TypeObject](https://farm5.staticflickr.com/4685/27596216839_72ef83b68c.jpg)

Ce pattern permet de définir dynamiquement de nouvelles entité pour le système. `TypeObject` est utilisée pour séparer une Entité de son Type (`Entity` et `EntityType`). Les entités ont des attributs, qui sont mise en œuvre avec le pattern `Property`. TypeObject est réutilisé dans un deuxième temps en vue de définir les types d’attributs, appelés `AttributeTypes`. Dans les langages orientés objet la structure d’un programme est créé via un ensemble de classes. Une classe définit généralement la structure et le comportement de l’objet. Et donc généralement nous avons une par entité à représenter. Pour introduire une nouvelle entité il faut alors créer une nouvelle classe, c’est-à-dire programmer.

## Property

Une propriété est généralement définie par une variable dans une classe. Puisque nous n’avons pas de classe spécifique à un type ici, on va utiliser une liste qui contiendra tous les propriétés du type.

![Prperties](https://farm5.staticflickr.com/4729/27596216739_a332c36a8a_z.jpg)

Dans cet exemple, on utilise une classe `property` qui définit trois attributs : `name`, `type` et `value`. Pour que le modèle soit encore plus adaptable, il suffit de ré-appliquer le pattern `TypeObject` pour les propriétés. On va alors obtenir un nouveau pattern connu sous le nom de `TypeSquare`

![TypeSquare](https://farm5.staticflickr.com/4692/39372748051_28e80f6ced.jpg)

## Relation
Il ne reste plus qu’à rajouter une relation supplémentaire entre `EntityType` et `Entity` pour obtenir le modèle `ERA` : `Entités - Relations - Attributs`

## Comportements
Les comportements c’est un peu plus compliquer à généraliser autant que des entités, je ne vais donc pas développer autant, cependant deux solutions existent :

# Pattern Strategy
On va ce pattern strategy avec un peu d’IOC pour faire un système de plugin. Malheureusement, il va bien falloir mettre les mains dans le code.

# Pattern RuleObject
Ce pattern répond à la problématique précédente, on va ici pouvoir “composer” les règles avec divers opérateurs et faire des tests sur des valeurs de propriétés. Plutôt qu’un long discourt voici le diagramme final :

![RuleObject](https://farm5.staticflickr.com/4679/27596216989_3f8b41c932_z.jpg)

## Interpréteur
L’interpréteur est le cœur du système , c’est lui qui va charger toutes les métadonnées et si possible de façon dynamique, c’est-à-dire qu’une modification soit appliquée en direct.

## What’s next ?
Microsoft Oslo, avec la création de DSL graphiques et textuels.

On peut aussi ce demander si ce type de modèle sera toujours d’actualité avec le retour en force des langages dynamiques et la fameuse DLR

# Conclusion

Pour moi la meilleur représentation de ce type de système, c’est Sharepoint avec ses Content type, ses types de listes. Mais attention à vouloir faire du tout générique on arrive rapidement dans des usines à gaz, le plus dur c’est de bien placer le curseur entre le trop Spécifique et le tout générique. Finalement c’est à vous de créer votre modèle adaptable en fonction de vos besoins.