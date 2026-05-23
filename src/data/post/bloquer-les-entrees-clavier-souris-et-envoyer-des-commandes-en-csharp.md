---
title: Bloquer les entrées clavier souris, et envoyer des commandes en csharp
publishDate: '2006-10-23T06:00:00'
excerpt: Si comme moi vous vous demandiez si il est possible de bloquer le clavier et la souris d'un utilisateur en .net, la réponse est oui !
image: /generated-covers/bloquer-les-entrees-clavier-souris-et-envoyer-des-commandes-en-csharp.svg
author: evilz
tags:
- csharp
- Informatique
- interop
---
Si comme moi vous vous demandiez si il est possible de bloquer le clavier et la souris d'un utilisateur en .net, la réponse est oui !

Pour cela il faut utiliser une API de windows et donc faire un petit `DllImport`

```csharp
[DllImport("user32.dll")]
public static extern bool BlockInput(bool fBlockIt);
Attention cela ne bloque pas le Ctrl + Alt + Suppr heureusement...
Maintenant si vous voulez envoyer des commandes à une application pas de problème il faut utiliser la classe SendKeys qui se trouve System.Windows.Forms.
Bon voilà un petit exemple avec la Calculatrice de windows
//Bloc les entrées
BlockInput(true);

//Démarre la calculatrice
Process.Start("calc");

// Ajoutez la référence a Microsoft.VisualBasic.dll
Interaction.AppActivate("Calculatrice");

// Exécute un calcule
SendKeys.SendWait("20*20{enter}");

//débloc les entrées
BlockInput(false);
```
