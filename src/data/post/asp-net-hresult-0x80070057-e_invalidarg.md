---
title: ASP.net (HRESULT 0x80070057 (E_INVALIDARG))
publishDate: '2011-01-27T10:41:00'
excerpt: Voilà l'histoire fantastique d'un développeur qui code et debug sa petit appli web tranquillement. Quand soudain, alors que notre dév Asp.net après avoir appuyé sur F5 s'attend à voir le site s'afficher, une erreur inf'm
image: /generated-covers/asp-net-hresult-0x80070057-e_invalidarg.svg
author: evilz
tags:
- asp.net
- erreur
- Informatique
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
