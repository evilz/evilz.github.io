---
layout: post
title: Les génériques, premier pas vers le concept DRY
date: 2009-04-21 14:22
author: evilz
comments: true
categories: [Informatique, programmation]
---
Pour ceux qui ne sont pas familiers avec le terme DRY, voici ce que l'on peut trouver comme d&eacute;finition sur wikipedia :

Ne vous r&eacute;p&eacute;tez pas (Don't Repeat Yourself) est une philosophie en programmation informatique consistant &agrave; &eacute;viter la redondance de code au travers de l'ensemble d'une application afin de faciliter la maintenance, le test, le d&eacute;buggage et les &eacute;volutions de cette derni&egrave;re.

Et oui c'est un acronyme de plus ...

Bref, en quoi les g&eacute;n&eacute;riques ont un rapport avec DRY ? R&eacute;ponse tout !

Mais je vais parler d'un cas en particulier ici.

Disons que l'on a un Repository (une classe) qui doit contenir une m&eacute;thode qui renvoi un object d'un certain type ayant l'id sp&eacute;cifi&eacute;.

On pourrait &eacute;crire la m&eacute;thode suivante :

```csharp
public IDomainObject GetById(Type wantedType, object id)
{
    IDomainObject myObject = null;
    // do something
	return myObject;
}
```

Ce code est bien, mais pas top ! l'utilisateur fera un typeof() ou un GetType &agrave; chaque appel

La m&ecirc;me m&eacute;thode g&eacute;n&eacute;rique :

```csharp
public T GetById(object id) where T : class, IDomainObject
{
	T myObject = default(T);
	// do something
	return myObject;
}
```

Youpi ! un seul param&egrave;tre et en plus plus de typeof et de cast de partout !