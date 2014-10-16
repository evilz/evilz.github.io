---
layout: post
title: Livre, Professional ASP.NET MVC 1.0
date: 2009-10-15 12:30
author: evilz
comments: true
categories: [asp.net, Informatique, Livre, MVC, Phil Haack, Rob Conery, Scott Guthrie, Scott Hanselman]
---
[![](http://farm3.static.flickr.com/2427/4004407237_00f0dd47c3_m.jpg) Professional ASP.NET MVC 1.0](http://www.wrox.com/WileyCDA/WroxTitle/Professional-ASP-NET-MVC-1-0.productCd-0470384611,descCd-tableOfContents.html)

J'ai terminé de lire ce bookin y a déjà un mois ... un mois que je dois écrire ce post.

Dans l'ensemble le livre est plutôt bon, même si je le conseil plutôt à des débutant en ASP.NET MVC.
J'ai bien aimé le premier chapitre qui est un step by step de la création de [http://www.nerddinner.com/](http://www.nerddinner.com/).
le Chapitre 9 à aussi sont importance, c'est l'essentiel de la sécurité d'une app MVC. Il faut le lire car beaucoup de résponsabilité sont maintenant délégué à/aux développeur(s).

Ma note : 3.5/5

Voici une rapide liste des points important que j'en ai tiré :

* Toujours faire une redirection après un post d'un formulaire (pattern PRG , post redirect get)

```csharp
AcceptVerbs(HttpVerbs.Post)]
public ActionResult Edit(int id, FormCollection formValues)
{
    // code to Retrieve
    // code to Update with form posted values
    // Persist changes back to database

    // Perform HTTP redirect to details page
	return RedirectToAction("Details", id);
}
```

* Utiliser la même url pour l'édition et l'ajout d'une entité (même route)
ex : `/Product/Edit/{id}`
si l'id est null c'est une création sinon c'est une édition

* Utiliser la méthode UpdateModel() ou TryUpdateModel() en spécifiant les champs à mettre à jour
* Gérer les exceptions au niveau du controller et rediriger vers une autre action si nécessaire
*  Pour une action dans le controller qui supprime ou met à jour une entité utiliser la méthode HTTP POST ou mieux DELETE et PUT

```csharp
[AcceptVerbs(HttpVerbs.Post)]
public ActionResult Edit(int id, FormCollection formValues)
{
    Product product = productRepository.GetProduct(id);
    try
    {
        UpdateModel(product);
        productRepository.Save();
        return RedirectToAction("Details", new { id=product.ID });
    }
    catch
    {
        foreach (var issue in product.GetRuleViolations()) {
        ModelState.AddModelError(issue.PropertyName, issue.ErrorMessage);
    	}
    return View(dinner);
	}
}
```

* Ajouter l'attribut Bind sur les actions qui mettent à jour des entitée (même fonctionnement que le UpdateModel())

```csharp
[AcceptVerbs(HttpVerbs.Post)]
public ActionResult Create([Bind(Include="Name,Description")] Product product)
{
	//...
}
```

* créer un model dédié à l'affichage : ViewModel. Plus sécurisé et moins gourmand, on ne revoit que ce qu'il y a besoin

```csharp
public class ProductFormViewModel
{

    // Properties
    public Product Product { get; private set; }
    public SelectList Categories { get; private set; }

    // Constructor
    public ProductFormViewModel(Dinner dinner)
    {
        Product = product;
        Categories = new SelectList(allCategories, Product.Category);
	}
}
```

* Utiliser un int? comme paramètre pour une pagination et utiliser ?? pour le tester

```csharp
public ActionResult Index(int? page) {

const int pageSize = 10;

var products = productRepository.FindAll();

var paginatedProducts = products.Skip((page ?? 0) * pageSize)
.Take(pageSize)
.ToList();

return View(paginatedProducts);
}
```

* Ajouter l'attribut [Authorize(Roles="admin")] pour sécuriser les action des controller

```csharp
[Authorize(Roles="admin")]
public ActionResult Create() {
...
}
```

* User.Identity.Name permet de récupérer l'identité de l'utilisateur actuel

```csharp
[AcceptVerbs(HttpVerbs.Post), Authorize]
public ActionResult Edit(Product product)
{
...
product.EditedBy = User.Identity.Name;
...
}
```

* Ajouter des méthodes "simple" dans le modèle, qui n'agit que sur le modèle

* Ajouter des fonctionnement ajax sur des action basic
* Utiliser jQuery pour animer visuellement la partie mise à jour depuis un appel Ajax

```csharp
// In Controller
[Authorize, AcceptVerbs(HttpVerbs.Post)]
public ActionResult Alert(int id)
{
// code here...
return Content("Thanks - we'll be alerted!");
}

// In view
&lt;%= Ajax.ActionLink( "Alert me when product price change",
"Alert", "Product",
new { id=Model.ID },
new AjaxOptions { UpdateTargetId="idDIV",OnSuccess="AnimateMessage"})
%&gt;

&lt;script type="text/javascript"&gt;

function AnimateMessage() {
$("#idDIV").animate({fontSize: "1.5em"},400);
}

&lt;/script&gt;
```

* Pour retourner un contenu au format json faire appel à JSon(something) dans l'action

```csharp
[AcceptVerbs(HttpVerbs.Post)]
public ActionResult SearchByLocation(float longitude, float latitude)
{
var products = ProductRepository.FindByLocation(latitude,longitude);
//.. can add a select here or use viewmodel
return Json(products.ToList());
}
```

* Créer des tests unitaire avec un nommage du type `Noun_Should_Verbs()`
* Tester les validation
* Tester la sécurité via des mock
* Tester la mise à jour des modèles `UpdateModel()`
* Tester les routes
* Les routes ont un ordre !!
* Ajouter des contraintes de type expression régulière sur les routes
*  \* dans une route récupère tous les paramètres
* Ajouter des routes a ignorer `IgnoreRoute()` pour des scripts ou des fichiers
* Vérifier si c'est un appel AJAX en utilisant `Request.IsAjaxRequest()`
* Gérer les exceptions via l'attribut `HandleError`

```csharp
[HandleError(ExceptionType = typeof(NullReferenceException),
View = "NullError")]
[HandleError(ExceptionType = typeof(SecurityException),
View = "SecurityError")]
public class HomeController : Controller
{
public ActionResult Index()
{
throw new NullReferenceException();
}

public ActionResult About()
{
return View();
}
}
```

* Sécuriser les méthode public des controller qui ne sont pas des Action avec `[NoAction]`

Bon je m'arrête là, ça fait déjà pas mal !
Peut être un prochain post sur la sécurité avec MVC.