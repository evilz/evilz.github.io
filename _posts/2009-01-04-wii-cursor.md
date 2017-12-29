---
layout: post
title: Wii Cursor
date: 2009-01-04 00:48
author: evilz
comments: true
categories: [Codeplex, Informatique, outils, Wii]
---
<a style="float: left" href="http://www.codeplex.com/WiiCursor" title="wc256 de evilz, sur Flickr" class="img-shadow"><img src="https://farm4.static.flickr.com/3095/3162203921_873d959437_o.jpg" alt="wc256" width="100" height="100" /></a>
<p>
Un des projets que j&rsquo;attendais depuis pas mal de temps vient de faire son apparition sur Codeplex (le 31/12/2008). <br />
Il s&rsquo;agit de <strong>Wii Cursor</strong>. Comme son nom l&rsquo;indique l&rsquo;application permet de manipuler la souris avec&nbsp; votre Wiimote. Peut &ecirc;tre aviez vous d&eacute;j&agrave; essay&eacute; d&rsquo;utiliser votre <strong>Wiimote</strong> sur votre PC via les logiciels <strong>BlueSoleil</strong> et <strong>GlovePIE</strong>, dans le cas contraire une petite recherche sur Google vous permettra de les d&eacute;couvrir parmi les centaines de tutoriaux qui sont &agrave; disposition sur le net.
</p>
<p>
Mais alors qu&rsquo;apporte ce nouveau logiciel ?<br />
Plusieurs choses !
</p>
<ol>
	<li>Le couple <strong>BlueSoleil/GlovePIE</strong> ne permet pas de reproduire le fonctionnement exacte du pointeur comme sur la <strong>Wii</strong>. Je m&rsquo;explique, avec <strong>BlueSoleil</strong> et <strong>GlovePIE</strong> vous pourrez faire bouger votre curseur en inclinant la <strong>Wiimote</strong>, c&#39;est-&agrave;-dire en utilisant l&rsquo;acc&eacute;l&eacute;rom&egrave;tre de la Wiimote.<br />
	<strong>WiiCursor</strong>, lui, utilise l&rsquo;infrarouge de la Sensor Bar comme sur la Wii ! Donc le contr&ocirc;le est beaucoup plus simple et plus pr&eacute;cis. Par contre l&rsquo;inconv&eacute;nient c&rsquo;est qu&rsquo;il faut avoir une Sensor Bar &agrave; disposition. Une recherche sur Google vous permetra de trouver une Sensor Bar sans fil ou une fabrication maison.</li>
	<li>C&rsquo;est un programme Full .net ! <strong>WiiCursor</strong> s&rsquo;appuit sur une librairie d&eacute;j&agrave; bien connue <strong>WiiMoteLib</strong> qui avait commenc&eacute; sur Coding4Fun et qui est maintenant disponible sur codeplex.<br />
	</li>
</ol>
<p>
Je n&rsquo;ai donc pas pu r&eacute;sister plus longtemps, j&rsquo;ai tout de suite test&eacute; ! Voici les &eacute;tapes &agrave; suivre :
</p>
<ol>
	<li>Il faut en premier connecter sa Wiimote en bluetooth. <br />
	Pour ceux qui ne l&rsquo;on jamais fait :<br />
	- Appuyez et Maintenez les boutons 1 et 2 de votre Wiimote, elle est maintenant d&eacute;tectable<br />
	- Allez dans la gestion des p&eacute;riph&eacute;riques Bluetooth (paneau de configuration-&gt; P&eacute;rif&eacute;riques bluetooth), cliquez sur ajoutez, cochez la case et faites Suivant.<br />
	- Le p&eacute;ripherique Nintendo RVL-CNT-01 est d&eacute;tect&eacute;<br />
	- ajoutez le sans cl&eacute; de s&eacute;curit&eacute;.</li>
	<li>Positionnez votre SensorBar haut dessus de votre &eacute;cran.</li>
	<li>T&eacute;l&eacute;charger WiiCursor sur codeplex <a href="http://www.codeplex.com/WiiCursor" target="_blank" title="Wii Cursor">ici</a>.</li>
	<li>Installer l&rsquo;application, et lancez-la.</li>
</ol>
<p>
Ca y est votre cursor est contr&ocirc;l&eacute; par votre Wiimote. Il est maintenant impossible d&rsquo;utiliser la souris !
</p>
<p>
Mais comment &ccedil;a marche, que font les boutons ? <br />
C&rsquo;est tr&egrave;s bien pens&eacute;, on peut tout configurer, et de fa&ccedil;on tr&egrave;s simple.<br />
Dans le r&eacute;pertoire de l&rsquo;application (par d&eacute;faut<em><strong> C:Program FilesJERNWiiCursor</strong></em>) vous allez trouver un sous r&eacute;pertoire <strong>WCXML</strong>. <br />
Pour chaque application que vous souhaitez configurer, il faut cr&eacute;er un fichier xml associ&eacute;. Vous trouverez trois exemples fournis de base, plus le sch&eacute;ma XML correspondant. Toutes les infos sont de toute fa&ccedil;on fournies sur le site <a href="http://www.codeplex.com/WiiCursor" target="_blank" title="Wii Cursor">ici</a>.
</p>
<a href="http://allewun.deviantart.com/art/Wii-Cursors-49355744" title="Wii_Cursors_by_allewun de evilz, sur Flickr" class="img-shadow"><img src="https://farm4.static.flickr.com/3087/3162204021_c4811026c4_o.jpg" alt="Wii_Cursors_by_allewun" width="450" height="150" /></a> <br />
<p style="clear: both">
Pour le fun (pour les vrais geeks) voici un <a href="http://allewun.deviantart.com/art/Wii-Cursors-49355744" target="_blank" title="Wii Cursors">lien </a>vers des curseurs&nbsp;windows&nbsp;au style Wii. Merci &agrave; <strong>~allewun</strong><br />
Pour les installer, d&eacute;compressez l&rsquo;archive dans un r&eacute;pertoire (exemple <strong><em>c:windowscursorsWii</em></strong>)<br />
Puis via le <strong>panneau de configuration-&gt;souris</strong>, dans l&rsquo;onglet <strong>pointeur</strong>, configurez un par un les pointeurs, et enfin enregistrez la configuration dans un nouveau th&egrave;me.
</p>
