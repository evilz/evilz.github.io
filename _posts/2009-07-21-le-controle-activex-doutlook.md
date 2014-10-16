---
layout: post
title: Le contrôle activeX d'outlook
date: 2009-07-21 14:47
author: evilz
comments: true
categories: [activeX, Informatique, Office, Outlook]
---
C'est ma petite découverte du jour, un contrôle activeX d'outlook qui permet d'afficher au choix :

- un répertoire de mail
- vos contacts
- votre calendrier

Le rendu est exactement le même que celui d'outlook.
![http://www.flickr.com/photos/evilznet/3742702358/](http://farm3.static.flickr.com/2620/3742702358_e242abe1e1_o.png)

Cependant le contrôle n'a pas une foulle de possibilités et peut même entrainer des failles de sécurités.
Si Outlook est actuellement installé sur votre système, vous pouvez visualiser quelques démos [http://www.outlookcode.com/d/OVCViewDemo.htm](ici)

Voici le code qui m'a permis d'afficher mes contacts comme dans la capture.

``` html
<html>
	<head>
		<script>
			function showContacts() {
				var contactDiv = document.getElementById('contacts');
				var button = document.getElementById('button');

				if(contactDiv.style.display == 'none') {
					contactDiv.style.display = 'block';
					button.value = "-";
				} else {
					contactDiv.style.display = 'none';
					button.value = "+";
				}
			}
		</script>
	</head>
	<body>
		<input id="button" type="button" value="+" onclick="showContacts()" />
		<div style="display:none" id="contacts">
			<object classid="CLSID:0006F063-0000-0000-C000-000000000046"
					id="ViewCtlFolder"
					width="610"
					height="195" codebase="http://activex.microsoft.com/activex/controls/office/outlctlx.CAB#ver=9,0,0,3203">
			   <param name="Namespace" value="MAPI">
			   <param name="Folder" value="Contacts">
			   <param name="Restriction" value="">
			</object>
		</div>
	</body>
</html>
```