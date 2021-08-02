---
layout: post
title: Get Data Back !
date: 2009-01-02 03:13
author: evilz
comments: true
categories: [Informatique, outils]
---

Je viens de passer une semaine de folie à essayer de récupérer mes données.  
L’histoire commence avec un Ipod classic de 80Go complètement foireux, en gros écran blanc au démarrage, ensuite impossible de l’éteindre ou de détecter l’ipod sur le PC.  
Finalement je me décide à ne garder que le disque dur pour en faire un disque externe usb. Pour cela je m’achète un boitier **ICY BOX 1.8 Zif**.

![icybox18Zif](https://farm4.staticflickr.com/3234/3156511433_5a28f15f4c.jpg)


Je le reçois le 26, je commence à le monter, et là première surprise : le disque est trop gros (ou le boitier trop petit au choix). Déjà ça commence mal, au bout d’une heure je trouve une solution : Mettre dans le boiter dans la pochette de l’Ipod, ça maintient le tout correctement.  
Plus qu’à brancher ! Et mer… Je me suis trompé de sens pour la nappe du **Zif**. Les gars qui ont inventé la nappe n’ont pas pensé à mettre un détrompeur !  
Je redemonte, je rebranche, le disque apparait ! Mais il est marqué non initialisé sous mon vista. Clique droite sur le disque (je suis dans l’interface de gestion des disque de vista) puis initialiser. Vista me pette une erreur :

```
VDS ne peut pas écrire le code de démarrage sur un disque lors d'une opération de nettoyage. Code d'erreur : 8007045D@02070008 
```

Après une recherche sur google je ne trouve qu’un lien vers un forum…  
Bref J’ai tout essayé impossible de monter le disque, de fixer son MBR.  
Je décide d’abandonner l’hisutoire du dique externe, mais de récupérer mais données.

![getdataback](https://farm4.static.flickr.com/3086/3156512791_f0aeb3efeb_o.jpg)

Pour cela j’utilise **GetDataBack** (FAT) de [Runtime](http://www.runtime.org/french/index.html "Runtime software"). Ce logiciel tout léger est simplement excellent, je l’avais déjà utilisé auparavent, il est capable de retrouver des fichiers supprimé d’y a pas mal de temps, et même après un formatage.  
Lui aussi me pète plein d’erreurs de lecture du dique, mais j’arrive finallement à récupérer mes données ! Youpi !  
Sur ce Bonne Année !