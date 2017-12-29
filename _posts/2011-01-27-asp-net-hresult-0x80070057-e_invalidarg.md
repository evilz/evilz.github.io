---
layout: post
title: ASP.net (HRESULT 0x80070057 (E_INVALIDARG))
date: 2011-01-27 10:41
author: evilz
comments: true
tags: [asp.net, erreur, Informatique]
share: true
---
Voilà l'histoire fantastique d'un développeur qui code et debug sa petit appli web tranquillement. Quand soudain, alors que notre dév Asp.net après avoir appuyé sur F5 s'attend à voir le site s'afficher, une erreur inf'me apparait à l'écran 

`(HRESULT: 0x80070057 (E_INVALIDARG))`

Après avoir fait des clears et des rebuilds, cette vilaine erreur est toujours présente !
Mais notre dév ne s'arrête pas là et utilise son outil le plus puissant créé à ce jour : GOOGLE

Il trouve finalement la solution :
Supprimer les fichiers temporaires ASP.net:
`C:\WINDOWS\Microsoft.NET\Frameworkv2.0.50727\Temporary ASP.NET Files`

- **Pour  Windows 7 :** `C:\Users\[username]\AppData\Local\Temp\Temporary ASP.NET Files`
- **et 64 bits :** `C:\WINDOWS\Microsoft.NET\Framework64\v2.0.50727\Temporary ASP.NET Files`
