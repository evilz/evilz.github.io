---
layout: post
title: Alt.net FR #10 : Aspectize
date: 2009-02-19 09:04
author: evilz
comments: true
categories: [Alt.net, Informatique]
---
<p style="text-align: center;"><a href="http://aspectize.com/" target="_blank"><img class="img-shadow" src="http://aspectize.com/themes/aspectize/images/top-logo.png" alt="aspectize" width="500" /></a></p>
<p>Le Sujet &eacute;tait une suite d'outils pour d&eacute;veloppeur nomm&eacute; <strong>Aspectize</strong>, et &eacute;tait pr&eacute;sent&eacute; par ses deux cr&eacute;ateurs <strong>Nicolas Roux</strong> et <strong>Fr&eacute;d&eacute;ric Fadel</strong> dans les locaux de Winwise.</p>
<p>La philosophie qui &agrave; amen&eacute; nos deux amis &agrave; cr&eacute;er la soci&eacute;t&eacute; ainsi que le produit nous a &eacute;t&eacute; expliqu&eacute;e longuement, pour la r&eacute;sum&eacute; rapidement, je dirais que le but principal et de s&eacute;parer la partie technique de la partie m&eacute;tier.&nbsp;</p>
<p>La partie technique est souvent bien maitris&eacute;e par les d&eacute;veloppeurs, alors que la partie m&eacute;tier est plus ou moins inconnue et va varier durant le cycle de vie d&rsquo;un projet.</p>
<p>Aspectize &agrave; pour but d&rsquo;aider les d&eacute;veloppeurs via des api et des outils (GUI) bas&eacute; sur des best practice comme <strong>DRY</strong>, <strong>KISS</strong> &hellip;</p>
<p>Concr&egrave;tement, &nbsp;Aspectize comprend actuellement deux modules :&nbsp;</p>
<p>-<span style="white-space: pre;"> </span>la partie ORM (oui j&rsquo;ai bien dit ORM !) qui s&rsquo;appuie sur des DataSet non typ&eacute; en interne (donc invisible pour l&rsquo;utilisateur/d&eacute;veloppeur). Directement dans Visual Studio (2005/2008) via un DSL avanc&eacute; vous aller pouvoir cr&eacute;er votre mod&egrave;le. Le petit plus ici est la notion de Relation qui clairement sp&eacute;cifi&eacute;e et qui peut &ecirc;tre enrichie puisqu&rsquo;elle est repr&eacute;sent&eacute;e par une classe/DataTable. On peut aussi rajouter des validations sur les donn&eacute;es sur les propri&eacute;t&eacute;s des entit&eacute;s qui pourront directement remonter dans votre couche UI.</p>
<p>&nbsp;</p>
<p>-<span style="white-space: pre;"> </span>La partie DataMapping et CommandMapping : Pour utiliser cette partie vous allez devoir marquer avec des attributs vos UI et vos Services, puis en quelques cliques vous allez faire le lien entre vos m&eacute;thode et les &eacute;v&egrave;nements de votre UI, avec la m&ecirc;me simplicit&eacute; on fait le lien entre les propri&eacute;t&eacute;s des entit&eacute;s et les propri&eacute;t&eacute;s des contr&ocirc;les graphique.</p>
<p>&nbsp;</p>
<p>Pour conclure, le produit &agrave; amen&eacute; un long d&eacute;bat sur divers sujets comme la POO et les TEST. Pour ma part, je pense que ce produit &agrave; vraiment &ccedil;a place, car 90% des projets sont r&eacute;barbatifs et ne consiste qu&rsquo;a afficher du texte dans des textbox charg&eacute; depuis une base de donn&eacute;es pour ensuite le mettre &agrave; jour.&nbsp;</p>
<p>Les + : DSL assez avanc&eacute;. Outil simple</p>
<p>Les - : produit encore jeune, trop de code &agrave; &eacute;crire, manque quelques fonctionnalit&eacute;s</p>
<div><br /></div>
<p>&nbsp;</p>
