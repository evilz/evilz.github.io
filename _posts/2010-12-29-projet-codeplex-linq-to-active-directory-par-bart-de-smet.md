---
layout: post
title: Projet codeplex, LINQ to Active Directory par Bart De Smet
date: 2010-12-29 15:30
author: evilz
comments: true
tags: [c#, Cecil, Codeplex, csharp, Informatique, interop, linq, Microsoft, programmation]
---
Depuis l'été dernier je travaille sur un projet Web de provisioning du système d'information d'un gros groupe.
Il s'agit d'une application web ASP.net permettant de gérer l'Active Directory, Exchange et MOCS.
<!--more-->

A mon arrivée le projet était dans un sale état, par exemple :

```csharp
try
{
    // somecode
}
catch (Exception /*ex*/)
{
    try
    {
        Commun_App.RedirectionErreur(Session,
            Response,
            ex,
            "btnAfficherToutesLesAdresses_Click");
    }
    catch { }
}
finally
{
    try { }
    catch { }
}
```

Voilà pour la petite pointe d'humour pour ce post (enfin c'est marrant au début...)
Le vrai sujet c'est un projet disponible sur codeplex qui permet de faire des requête Linq sur un Active Directory.
[http://linqtoad.codeplex.com/](http://linqtoad.codeplex.com/)
Un petit exemple (cf: Codeplex) :

```csharp
var users = new DirectorySource&lt;User&gt;(ROOT, SearchScope.Subtree);
users.Log = Console.Out;
var res = from usr in users
          where usr.FirstName.StartsWith("B") && usr.Office == "2525"
          select new
          {
              Name = usr.FirstName + " " + usr.LastName,
              usr.Office,
              usr.LogonCount
          };

foreach (var u in res)
{
    Console.WriteLine(u);
    u.Office = "5252";
    u.SetPassword(pwd);
}

users.Update();
```

Je pense que vous avez tous compris cet exemple, en quelques lignes il montre toute la puissance de l'API.
On commence par rechercher les utilisateurs de l'AD dont le prénom commence par un 'B' et le bureau est le '2525'. Facile non ?

> Mais là classe User elle vient d'où ?
> j'y viens.

La classe user est une classe que vous allez coder avec vos petites mimines. Dans cette classe on va créer le mapping entre les attributs de l'AD et les propriétés de la classe elle-même. Pour créer ces mappings, mister Bart De Smet met à notre disposition des attributs csharp.

exemple :

```csharp
[DirectorySchema("user", typeof(IADsUser))]
class User
{
    [DirectoryAttribute("objectGUID")]
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int LogonCount { get; set; }
    [DirectoryAttribute("PasswordLastChanged", DirectoryAttributeType.ActiveDs)]
    public DateTime PasswordLastSet { get; set; }
    [DirectoryAttribute("distinguishedName")]
    public string Dn { get; set; }
    [DirectoryAttribute("memberOf")]
    public string[] Groups { get; set; }
}
```

Cette classe utilise deux attributs:
- DirectorySchema permet de définir le type d'objet de l'AD sur lequel on travaille (plus d'infos [ici]( http://msdn.microsoft.com/en-us/library/cc245665(v=PROT.10).aspx))
- DirectoryAttribute permet de créer le mapping sur un attribut de l'AD

J'ai pas mal travaillé les classes concernant les groupes et utilisateurs, je vais les mettre en pièces jointes à la fin du post.

La seconde partie de l'exemple boucle sur les utilisateurs sélectionné et modifie le numéro de bureau et appelle une méthode SetPassword(). A la suite de cela un Update est appelée sur l'objet sources.
Cette manifique API nous permet non seulement de requeté sur l'AD mais aussi de manipulé les données !
Petite remarque, pour que la mise à jour fonctionne il faut implémenter le style OnPropertyChanged() sur chacune des propriétés.
La méthode SetPAssword est quant à elle une méthode disponible dans les DirectoryEntry du framework de base.

```csharp
public bool SetPassword(string password)
{
    return this.DirectoryEntry.Invoke("SetPassword", new object[] { password }) == null;
}
```

C'est bien beau tout ça, mais moi j'ai besoin de faire des requêtes dynamiques.
Par exemple depuis un formulaire je peux rechercher sur le prénom, le nom ou bien l'email d'un user.
Pour créer ce type de requêtes je me tourne vers une classe bien connue **PredicateBuilder **disponible [ici](http://www.albahari.com/nutshell/predicatebuilder.aspx).
Sauf que voilà impossible de faire fonctionner mes requêtes !

J'ai le choix entre le 50 - 50, l'avis du public ou l'appel à un ami.

Je decide de faire apelle à mon Guru **Mister Jb Evain**.
En deux, trois minutes il me dit que cette implémentation est foireuse et me code un nouveau PredicateBuilder voir [ici](http://evain.net/blog/articles/2010/07/20/predicatebuilder-revisited).

Et voilou tout fonctionne à merveille ! Elle n'est pas belle la vie

[Sources sur github](https://gist.github.com/evilz/efd870e095cc21cd92ae)