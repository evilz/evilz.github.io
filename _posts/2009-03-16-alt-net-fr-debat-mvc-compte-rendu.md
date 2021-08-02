---
layout: post
title: ALT.Net FR #10′ : Débat MVC, compte rendu par Moi
date: 2009-03-16 10:04
author: evilz
comments: true
categories: [Alt.net, Informatique]
feature: https://farm5.staticflickr.com/4595/39343357032_fca666ce6b.jpg
---

C’est jeudi que notre petit débat Alt.net FR sur MVC avait lieu. Nous nous sommes donc retrouvé à environ une bonne vingtaine de personnes dans le 8ème arrondissement, avec pas mal de nouvelles têtes.
Pour un sujet qui n’occupait que 4, 5 personnes au début sur les discussions google, il a finalement fait déplacer des foules (plus grosse réunion depuis les débuts de Alt.net France). Il nous à fallut revoir la disposition de la salle, avec plus de chaises pour ainsi former un grand cercle. La séance c’est déroulée sans projecteur et n’a malheureusement pas pu être enregistrée.

![debat mvc](https://farm5.staticflickr.com/4595/39343357032_fca666ce6b.jpg)


# Introduction au MVC ?

Après une rapide présentation de chacun des participants, et un rappel par Julien, de l’esprit Alt.net, j’ai commencé en posant quelques questions d’ordre général pour permettre de mieux cibler les différents niveaux avec Asp.net MVC :

A peine une dizaine de personnes ont déjà utilisé MVC, et la majorité d’entre eux ont commencé le développement web il y a assez longtemps (au moins avec du php/asp). La grande partie des personnes restantes était venues pour découvrir ou chercher un peu plus que la brève introduction des Techdays.
Justement combien ont assisté à la séance des TechDays ? 5 à 6 personnes donc pas énormément de monde. Apparemment cette présentation aux TechDays n’a convaincue personne et les retours ne sont pas glorieux.
Combien on déjà fait du WebForm ? Une bonne majorité environ 15 personnes (ouf ! )
Nous proposons donc à Gauthier, qui a le plus d’expérience avec ce Design (compte tenu de l’absence de Symon), de refaire un récapitulatif du fonctionnement :

- M : Model => entités métier, couche de service (WCF, etc.)
- V : View => l’interface utilisateur
- C : Controller => le point d’entrée unique qui décide quel modèle utiliser et dans quel vue.

Julien complète ces explications par un schéma d’interaction entre ces différents tiers :
CMV serait donc le nom le plus approprié en fait. Une Action du Controller est appelée grâce au nouveau module de Routing d’asp.net (une Action est par défaut une méthode public du controller). Cette méthode va récuperer les données de façon classique via vos services d’acces aux données puis les passer à la vue. Pour finir la méthode demande le rendu de la vue désirée.

# Pourquoi MVC ?
Alors que notre introduction aura pris un quart d’heure. La question de « pourquoi MVC ?» est rapidement venue sur le tapis. Un petit groupe (les dev Web) essayait de justifier l’utilisation de ce Design face au design WebForm d’asp.net. Je ne vais pas refaire le débat ici mais un avantage vu par quelqu’un pouvait être considéré comme un inconvénient pour un autre. Voici une petite liste des points évoqués (à vous de vous faire votre opinion)

- Gestion de l’état (viewstate)
- Postback
- Le cycle de vie
- Le debug
- Les tests
- Le html et js
- Les contrôles

# Conclusion :

Je vais reprendre le compte rendu de Robert pour conclure :

> J’ai trouvez que le débat était très passionnant, mais un peu trop focalisé sûr l’aspect WebForms contre MVC (un débat un peu « troll » selon quelqu’un dont je ne dit pas le nom). Pour ma part, comme quelqu’un qui a jamais fait du ASP.NET MVC (ou autre MVC), mais qui a fait du ASP classique et WebForms, j’ai trouvé les arguments du côté MVC bon, mais je ne suis pas complètement convaincu. J’étais absolument d’accord avec la déclaration « on peut faire un logiciel merdique avec des WebForms et l’MVC », en revanche je pense qu’on peut faire un bon logiciel en utilisant MVC ou WebForms (je trouve que Subtext est un très bon « codebase », même si c’est en WebForms).
J’étais un peu déçu que l’on n’ai pas parlé des view engines. Je cois que je arriverais à facilement comprendre les couches en C# sur le serveur, mais que les rendu du HTML risque de rapidement devenir bordelique. Même si l’HTML n’est pas un sujet très dure à comprendre je cois que ce n’est pas facile d’avoir une bonne organisation du code pour générer du HTML.
J’étais étonné de voir au tant de monde, comme on a tout organisé à la dernière minute. J’étais un peu déçu qu’on n’ait pas vu Yann qui a animé notre forum.

Il serait peut être bon de refaire une vraie réunion, avec présentation, pour rentrer dans la technique avec de bonnes démos, à vous de nous dire !