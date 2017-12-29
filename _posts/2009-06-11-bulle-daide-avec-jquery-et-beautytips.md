---
layout: post
title: Bulle d'aide avec jQuery et BeautyTips
date: 2009-06-11 17:43
author: evilz
comments: true
categories: [asp.net, Informatique, jQuery]
---
<a href="http://www.lullabot.com/files/bt/bt-latest/DEMO/index.html"><img style="float:left" src="http://www.lullabot.com/files/bt/bt-latest/DEMO/demofiles/logo.png" alt="" /></a>Je suis actuellement en mission chez un client pour lequel je fais des développements Sharepoint 2007.
Une des webparts à développer devait contenir un genre de menu avec un tableau d'icon et lorsque l'utilisateur passe la souris sur un icon un sous menu apparait.

Une solution envisageable pour cette webpart est de simplement ajouter des contrôles de type Menu (asp.net) et de créer les menuitems nécéssaires. L'inconvénient majeur de cette solution c'est que ce pu*** de contrôle c'est de la m**** et qu'il génère plein de table dans le rendu html. Du coup pour customiser le designe c'est la misère. J'ai donc cherché un moyen de remplacer cela par quelque chose de plus propre, donc un bon petit plugin jQuery.

<a style="float:right" title="beautytipsMOSS2007 de evilz, sur Flickr" href="http://www.flickr.com/photos/evilznet/3616363917/"><img src="https://farm4.static.flickr.com/3610/3616363917_57a2c60c2e_o.png" alt="beautytipsMOSS2007" width="221" height="219" /></a>

J'ai finalement utilisé un plugin de <strong>jQuery</strong> nommé <strong>BeautyTips</strong> qui permet d'afficher des bulles d'aide style google map. Ce plugin est pas mal fait, et laisse une bonne liberté au niveau du rendu et des ses options. Je vous invite à aller voir les demos ici : <a href="http://www.lullabot.com/files/bt/bt-latest/DEMO/index.html">http://www.lullabot.com/files/bt/bt-latest/DEMO/index.html</a>

Pour finir voici une petit capture du rendu de ma webpart. A noté que la bulle a des angles arrondis, un petit dégradé jaunatre transparent et tout ça avec un html est très propre :
<pre class="brush:xml">
<div id="bulle">
<h1>Titre</h1>
<ul>
	<li>lien 1</li>
	<li>lien 2</li>
	<li>lien 3</li>
</ul>
</div></pre>
