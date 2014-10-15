---
layout: post
title: Faire un postback Asp.net dans une Dialog JQuery UI
date: 2010-12-13 13:22
author: evilz
comments: true
categories: [asp.net, dialog, Informatique, jQuery, programmation]
---


Peut être que parmi vous certains ont déjà rencontré ce problème :

Lorque l'on utilise une dialog JQuery UI (<a href="http://jqueryui.com/demos/dialog/">http://jqueryui.com/demos/dialog/</a>) et que l'on y place un bouton asp.net, au clic sur celui-ci un refresh de la page est bien effectué, mais ni de postback ni le déclenchement de l'évènement est apellé. Mais pourquoi donc ? WTF ?<!--more-->

Le problème est simple, JQuery va créer la dialog en dehors de votre formulaire (balise form). Et donc rien ne fonctionne comme on le voudrait.

Voilà comment résoudre simplement le problème :

[js]

// fonction qui est appelée pour afficher la dialog
function DisplayDialog() {

//supprime la dialog si elle existe déjï¿½
$(&quot;#dialog:ui-dialog&quot;).dialog(&quot;destroy&quot;);

// création de la nouvelle dialog et stockage de la référence dans un variable !          ï¿½
var dialog = $(&quot;#dialog&quot;).dialog({
                height: 150,
                modal: true
            });

// Correction pour le postback Asp.net
// Ajout de la dialog dans le premier formulaire de la page (en asp.net, y en a qu'un dans 99% des cas)
 dialog.parent().appendTo($(&quot;form:first&quot;));
}
[/js]

 </pre>
<img class="aligncenter" src="http://farm6.static.flickr.com/5128/5257134137_7ba84e944a_o.png" alt="" width="551" height="375" />
