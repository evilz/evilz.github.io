---
layout: post
title: Déplacer la base tempdb de sql server
date: 2005-11-09 06:00
author: evilz
comments: true
tags: [Database, Informatique]
---
Si vous utilisez SQL Server et que vous faites de très gros requêtes avec plein de jointure, la base Tempdb risque de grossir rapidement, et pour peu qu'elle soit installée sur le C : et qu'il n'y ai plus que 9Mo ça risque de poser des problèmes ('¦ Y en a qui ont essayé, ils ont eu des problème mais bon c'est vous qui voyez)

Donc voici la solution, dans l'analyseur de requêtes exécutez le code suivant :

```sql
use master
go

Alter database tempdb modify file (name = tempdev, filename = 'E:Sqldatatempdb.mdf')
go

Alter database tempdb modify file (name = templog, filename = 'E:Sqldatatemplog.ldf')
Go
```
