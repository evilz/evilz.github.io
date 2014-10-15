---
layout: post
title: Modifier un le mot de passe d'un utilisateur AD en C# et PowerShell
date: 2011-01-20 10:53
author: evilz
comments: true
categories: [active directory, c#, Informatique, powershell]
---
Voici un bout de code permettant de récupérer un compte utilisateur dans l'Active Directory et de faire un reset de son mot de passe.


```csharp
public static void SetPassword(string distinguishedName, string password)
        {
            DirectoryEntry oUser = new DirectoryEntry(&quot;LDAP://&quot;+distinguishedName);
            oUser.Invoke(&quot;SetPassword&quot;,password);
            oUser.CommitChanges();
            oUser.Dispose();
        }
```


```ps
Function SetPassword($distinguishedName, $password)
{
           $ldap = &quot;LDAP://$distinguishedName&quot;
           $oUser = $ldap;
           $ouser.psbase.invoke(&quot;SetPassword&quot;,$password)
           $ouser.psbase.CommitChanges()
}
```

Ce qui est intéressant c'est la sélection de l'utilisateur directement par son distinguishedName qui contient toutes les infos nécessaires.
Et aussi, on voit nettement que PowerShell c'est la version Shell de .net :p
