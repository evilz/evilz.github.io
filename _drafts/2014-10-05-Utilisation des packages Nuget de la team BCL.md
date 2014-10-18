---
layout: post
title: Utilisation des packagse Nuget de la team BCL
---



## Rappel a propos de la BCL

La BCL : `Base Class Library` contient les types de base du framework .net qui sont necessaire au fonctionnement du Runtime. Son but a l'origine est d'implementer les specifications ECMA depose par Microsoft pour la `Common Language Infrastructure`. L'equipe en charge y a rapidement rajouter quelques autres types courament utilises (data, xml ...) et non specifie dans l'ECMA pour creer la version 1.1 du Framework.
Elle inclue par exemple les namespaces `System` , `System.Diagnostics` , `System.Globalization`, `System.Resources` , `System.Text` , `System.Runtime.Serialization`, `System.Data` ...

Pour faire simple, on peut dire que la BCL correspond pricipalement a la librarie `mscorlib.dll` completer de quelques classes se trouvant dans `System.dll` et `System.core.dll`.

Attention, il ne faut cependant pas confondre la BCL et FCL : `Framework Class librarie` qui est un sur-emsemble de classes bien plus large.
La FCL represente l'ensemble des classes du framework. On y retrouve notement Windows Forms, ADO.net, ASP.net, Language Integrated Query, Windows Presentation Foundation (WPF), Windows Communication Foundation (WCF)

### Les evolution de la BCL

La BCL etant etroitement liee au Runtime, sont contenu a evolue au fil du temps et des differentes versions des frameworks .net (.Net Core, SL, Windows phone, micro Framework... )

#### Framework 1.1

Comme dit precedement, la version 1.1 est la premiere version du framework vraiment utilisee. Elle a tres vite remplace en 2003, la version 1 qui n'avait qu'un an. Elle a apporte toutes les couches de base que l'on utilise encore (ou presque) aujourd'hui. Avec en bonus l'arrive d'un compact framework.

#### Framework 2

Le framwork 2 est la premier revolution apporte a .net. Parmis les grandes nouveautes on peut citer l'arrive des generiques (pas les medicaments) et des methodes annonymes. Le tout en utilisant un nouveau runtime 2.0, qui va etre en place pour de longue annees avant l'arrive de .net 4.0. 
En plus de l'evolution importante sur le Runtime et la BCL de nombreuses autre evolutions ont vu le jour du cote d'ASP.net (master page par exemple) ou de WinForm.
Pour plus d'infos rendez-vous ici : [http://msdn.microsoft.com/en-us/library/t357fb32(v=vs.90).aspx](http://msdn.microsoft.com/en-us/library/t357fb32(v=vs.90).aspx)

![.net fx 2.0 poster]({{ site.url }}/assets/dotnetfx20poster.jpg)

#### Framework 3

Cette version correspond a un ajout des 3 grosses briques toujours tres utilises aujourd'hui :

- Windows Communication Foundation
- Windows Presentation Foundation
- Windows Workflow Foundation

Une quatrimiere brique a fait une brieve apparission `Windows CardSpace`, mais n'a que tres peu ete utilise et vite oubliee.
Comme mentionne precedement ces trois composants s'appuie sur le runtime 2.0.

![framework30.jpg]({{ site.url }}/assets/framework30.jpg)


#### Framework 3.5

En novembre 2007 avec l'arrive de Visual Studio 2008, Microsoft introduit LINQ !
Un language de requetage directement integre dans le framework. 
Il devient donc possible de creer des requetes sur des objets et via des fournisseurs Linq de generer des sorties differente : sql, url, xml ...
A noter que si encore une fois le tout fonctionne sur le Runtime 2.0, un nouveau compilateur est necessaire a la compilation du linq.
Cependant avec quelques astuces, il est posible de faire fonctionner une application compilee en 3.5 sur un poste ne disposant que de la version 2.0 ou 3.0 installee.

![.net fx 3.5 poster]({{ site.url }}/assets/dotnetfx35poster.jpg)

#### Framework 4

En avril 2010 l'arrive de Visual Studio 2010 et du framework 4.0 apport enfin une nouvelle version du Runtime.
Cote nouveaute on peut noter :

- les Portable Class Librarie
- Code Contract
- PLinq (Parallel LINQ) qui permet de paralliser sur plusieurs thread et coeurs des requetes linq sur les objects
- La DLR
- et quelques types comme : `BigInteger`, `Tuples` ...

http://abdulmoniem.files.wordpress.com/2010/03/pdc2008-netfx4.pdf

toutes les infos ici

#### Framework 4.5
> http://www.heikniemi.net/hardcoded/wp-content/uploads/2011/10/WhatsNewNET45-en.png
http://msdn.microsoft.com/en-us/magazine/jj133817.aspx

- Windows store App (WinRT)
- Async/Await

http://download.microsoft.com/download/3/F/5/3F55BF07-EA45-4DB7-A056-3F68F1CC5FB0/poster2014_.pdf

Pour resumer plus simplement sur un unique diagrame :

![framework dotnet]({{ site.url }}/assets/DotNet.svg)


## Les Packages nuget

Dans cet article nous aborderont uniquement les packages fourni par la team BCL bien que Microsoft en fournissent un bon nombre maintenant.
Nous verons se qu'ils peuvent nous apporter et comment les utiliser au sein d'une petite application d'exemple.

### Pourquoi utiliser les packages ?

Le principal avantage des packages de la BCL est de mettre certaines versions des frameworks a un niveau commun le plus eleve possible et proche de 4.5. Dans la pluspart des cas ils seront utilises au travers des libraries portable.
Au dela de combler certaine briques manquantes, certain packages permette de tester des fonctionnalite future qui ne sont pas encore publie officiellement dans une nouvelle version de framework. Cela permet a microsoft de faire participe la communaute en amont et d'integrer rapidement des retours avant une release finale.

> Je vais mettre le focus sur les PCL car c'est le mode de programmation .net a preconiser pour rendre votre code reutilisable et ceux peu importe la plateforme. Pour rappel il est maintenant possible 'legalement' d'utiliser les PCL sur n'importe quel environement :
[http://blogs.msdn.com/b/dotnet/archive/2013/10/14/portable-class-library-pcl-now-available-on-all-platforms.aspx](http://blogs.msdn.com/b/dotnet/archive/2013/10/14/portable-class-library-pcl-now-available-on-all-platforms.aspx)

### Ou trouver les package ?

Microsoft a publiee une liste complete de packages nuget supporte ici : [http://blogs.msdn.com/b/dotnet/p/nugetpackages.aspx](http://blogs.msdn.com/b/dotnet/p/nugetpackages.aspx)

Pour les packages qui nous interesse ici, une simple recherche sur du mot cle `BCL` suffit pour les retrouver soit sur la page web [https://www.nuget.org/packages?q=bcl](https://www.nuget.org/packages?q=bcl) soit directement dans Visual Studio (ou Xamarin studio)

### Utilisation des packages principaux

#### Microsoft BCL Build Components

Ce package est la brique principal sur laquelle repose la plus part des autres. Il va modifier/completer l'infrastructure du systeme de build, c'est a dire modifier votre projet C# ou VB pour utiliser les paramettres specifies dans `Microsoft.Bcl.Build.targets`.

Ce package est disponible ici : [https://www.nuget.org/packages/Microsoft.Bcl.Build/](https://www.nuget.org/packages/Microsoft.Bcl.Build/)

#### Microsoft BCL Portability Pack 

Ce package ajoute quelques types de base manquant sur certains frameworks telque :
 
 - .NET Framework 4 (with KB2468871)
 - Windows 8
 - Windows Phone 8.1
 - Windows Phone Silverlight 7.5
 - Silverlight 4
 - Portable Class Libraries

On y retrouve notament :
 
 - CallerMemberNameAttribute
 - CallerLineNumberAttribute
 - CallerFilePathAttribute
 - Tuple<T1, T2, ...>
 - IProgress<T>
 - IStructuralComparable
 - IStructuralEquatable
 - Task
 - InvalidDataException

L'implementation fourni est l'equivalente de de celle livree dans une version ulterieur du framework. 
Il n'est donc pas necessaire d'utiliser le package dans le cas ou vous utilisez une version recente du framework comme la 4.5. Cependant cela devient rapidement essentiel dans le cas ou l'on utilise des library multi-framework via les PCL.
A note que lorsque ce package est utilise et qu'une implementation est deja presente sur le framework, celle du framework sera utilisee.


Ce package est disponible ici : [https://www.nuget.org/packages/Microsoft.Bcl/](https://www.nuget.org/packages/Microsoft.Bcl/)

#### Microsoft BCL Async

Un des changements mageur du framework 4.5 est l'arrive du nouveau model de programmation asynchrone base sur les `Task` et `Task<T>`. Cela s'acompagne notement de l'ajout des mots cles `async` et `await`.
Ce model permet entre autre de simplifier l'ecriture et la lecture par rapport au model precedent `Asynchronous Programming Model` utilisant les callback.

Plus d'info ici :
[http://blogs.msdn.com/b/bclteam/archive/2012/10/22/using-async-await-without-net-framework-4-5.aspx](http://blogs.msdn.com/b/bclteam/archive/2012/10/22/using-async-await-without-net-framework-4-5.aspx)

Il devient donc possible d'utiliser await/async depuis Visual Studio 2012 sur un framework 4.0, ou Windows Phone 7 par exemple en utilisant des Task. Et comme toujours la fonctionnalite est aussi possible sur les PCL!

Ce package est disponible ici : [https://www.nuget.org/packages/Microsoft.Bcl.Async/](https://www.nuget.org/packages/Microsoft.Bcl.Async/)

#### Microsoft HTTP Client Libraries

Ce package contient l'implementation du dernier `HttpClient` ainsi que `HttpRequestMessage` et `HttpResponseMessage` ce qui permet de facilement interoger des service Web sur HTTP.
La gestion des headers, cookie, compression est disponible.

Ce package est disponible ici : [https://www.nuget.org/packages/Microsoft.Net.Http/](https://www.nuget.org/packages/Microsoft.Net.Http/)

#### Microsoft Compression

Ce package est le petit dernier lot, il gere la compression et la decompression au format zip et gzip. Il a ete cree pour casser la dependance qu'il y avait notement au niveau du HttpClient.
    
Ce package est disponible ici : [https://www.nuget.org/packages/Microsoft.Bcl.Compression/](https://www.nuget.org/packages/Microsoft.Bcl.Compression/)

#### Encore en beta/alpha

Comme mentionne precedement, certain packages sont disponible avant les releases finale pour pouvoir tester et retourner des feedback a Microsoft.
On y retrouve notement :

[https://www.nuget.org/packages/Microsoft.Bcl.Simd/1.0.2-beta](https://www.nuget.org/packages/Microsoft.Bcl.Simd/1.0.2-beta)
[https://www.nuget.org/packages/Microsoft.Bcl.Immutable/1.1.29-beta](https://www.nuget.org/packages/Microsoft.Bcl.Immutable/1.1.29-beta)
[https://www.nuget.org/packages/Microsoft.Bcl.Metadata/1.0.12-alpha](https://www.nuget.org/packages/Microsoft.Bcl.Metadata/1.0.12-alpha)

## Utilisation dans un exemple d'API 

## AllocineClient.Secure

Nous allons voir comment utiliser les differents packages au sein d'une librarie de type PCL. La realisation d'une interface graphique sera aborde au sein d'autres articles.
Les developpements vont se faire en mode `TDD` avec `Nunit`.
Pour cette exemple nous allons creer un simple client de l'API Allocine permettant de seconnecter avec un compte et de noter des films et series.

### Creation de la solution

- nouveau projet => blank solution : AllocineSecureApiClient
- ajout d un projet portable : AllocineSecureApiClient => .net 4 win8 sl5 xamarin
- ajout d un projet de test unitaire, class library 4.5.1 : AllocineSecureApiClient.Tests

### Ajout des packages Nuget
- ajout des packages BCL sur la PCL : 
	- Http
	- async
- ajout de Json et nunit sur les tests

### Methode d'authentification
- creation d'un fichier de test unitaire 
#### test Logon_Should_Return_True_When_AuthentificationSuccessed

`code`

explication
genererer la classe minimum pour que le code compile
test fail

`code`


- test Logon_Should_Return_False_When_AuthentificationFailed

### Methode GetSpeedRatingFeed 

### Methode Rate


Conclusion
