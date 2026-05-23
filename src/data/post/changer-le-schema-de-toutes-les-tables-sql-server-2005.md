---
title: Changer le schema de toutes les tables (sql server 2005)
publishDate: '2007-03-23T06:00:00'
excerpt: Dernièrement, j'ai eu besoin de modifier le schéma de toutes les tables d'une base Sql Server 2005.
image: /generated-covers/changer-le-schema-de-toutes-les-tables-sql-server-2005.svg
author: evilz
tags:
- database
- Informatique
---
Dernièrement, j'ai eu besoin de modifier le schéma de toutes les tables d'une base Sql Server 2005.

T-SQL fourni de quoi changer le schema pour pour un objet donné : `ALTER SCHEMA`
Il ne reste plus qu'a boucler sur les tables via la procédure `sp_MSforeachtable`
Voici la syntaxe complète (remplacez le "new_schema" par le nom désiré)

```sql
exec sp_MSforeachtable "ALTER SCHEMA new_schema TRANSFER ? PRINT '? modified' "
```
