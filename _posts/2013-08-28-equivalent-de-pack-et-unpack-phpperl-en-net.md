---
layout: post
title: Équivalent de Pack et Unpack (php,perl) en .net
date: 2013-08-28 07:21
author: evilz
comments: true
categories: [dataconvert, Informatique, Mono, perl, php, programmation]
image: https://farm5.staticflickr.com/4638/39310213012_aab9c69b7e_b.jpg
---
Je me suis lancer dans la conversion d'un petit projet PHP vers C#, et je suis tombé sur une fonction qui m'était totalement inconnue à savoir `unpack()`.
Je vais vous partager le résultat de mes recherches sur ce sujet.


Il s'agit en fait de deux fonctions `pack()` qui compacte les arguments args dans un tableau d'octet binaire et `unpack()` qui fait l'inverse.
Ces deux fonctions proviennent à la base de perl mais sont implémentées partiellement en php, (certain format ne sont pas supportés).

Vous pouvez chercher sur la MSDN vous ne trouverez aucun équivalent complet de ces deux fonctions.
J'ai donc demandé à ma bible .net, Mister Jb Evain, si il en avait déjà entendu parlé et en deux minutes m'a sortie une classe existante dans le framework Mono   [Mono_DataConvert](http://www.mono-project.com/Mono_DataConvert). Merci Jb :)
Même si Miguel de Icaza et son équipe à fait du bon boulot, son implémentation reste cependant elle aussi incomplete.

Je vais essaye de vous donner un ensemble d'exemples avec le code php et sont équivalent .net.

### Une chaîne complétée avec NULL


``` php?start_inline=1
// PHP
$packed = pack("a10","fox" );
$unpacked = unpack("a10",$packed);
```


``` csharp
// C#
var packed = "fox".PadRight(10, '');
var unpacked = ASCIIEncoding.ASCII.GetString(pack, 0, 4);
```


Notez que la distinction entre signé et non signé n'affecte que la fonction unpack , tandis que la fonction pack fournira le même résultat pour les deux formats.
De plus, notez que PHP enregistre de manière interne et intégrale les valeurs : cette représentation dépend de la machine. Si vous essayez d'enregistrer une valeur trop grande, elle risque d'être convertie et de donner lieu à des effets de bords vicieux.
