---
layout: post
title: Changer le schema de toutes les tables (sql server 2005)
date: 2007-03-23 06:00
author: evilz
comments: true
tags: [database, Informatique]
---
Dernièrement, j'ai eu besoin de modifier le schéma de toutes les tables d'une base Sql Server 2005.

T-SQL fourni de quoi changer le schema pour pour un objet donné : `ALTER SCHEMA`
Il ne reste plus qu'a boucler sur les tables via la procédure `sp_MSforeachtable`
Voici la syntaxe complète (remplacez le "new_schema" par le nom désiré)

```sql
exec sp_MSforeachtable "ALTER SCHEMA new_schema TRANSFER ? PRINT '? modified' "
```
