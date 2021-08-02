---
layout: post
title: Introduction à l'authentification OAuth2 avec ASPNET Core et GitHub
date: 2016-10-24
author: evilz
comments: true
tags: [dotnet, Informatique]
image: https://farm5.staticflickr.com/4597/27565105059_9daa9856aa_n.jpg
---

Dans cette série d’articles, nous allons voir comment mettre en place une authentification OAuth2 au travers d’une application **ASP.NET CORE**.

Après quelques rappels sur le protocole, nous aborderons la mise en place de notre application de gestion des Gists en trois étapes :

  - Une utilisation directe du middleware OAuth2 fourni par MS
  - Une utilisation d’un middleware spécifique à Github en utilisant le Aspnet Identity
  - Une petite application permettant de gérer vos gists

## OAuth2

Le protocole OAuth 2.0 est maintenant un standard pour l'authentification. Il permet à un utilisateur de donner l’accès à ses propres ressources détenues par un fournisseur comme Google, GitHub, Facebook...  à une application tierce.
Le plus souvent, il est utilisé pour se connecter à des applications en tant que simple fournisseur d'identité (SSO). Cela permet de se connecter sans créer un nouveau compte et sans exposer son mot de passe sur le site ou l'application.

##### Pour résumer OAuth2 permet
- De ne pas diffuser ses mots de passe à des sites sans confiance
- De contrôler ce que l’application tierce pourra faire et quelles données elle pourra utiliser
- De révoquer les autorisations quand bon vous semble
- Mettre à jour votre profil et surtout votre mot de passe à un seul endroit


##### Lorsque l'on parle de OAuth2, on distingue 4 rôles :
- L’utilisateur : propriétaire de la ressource
- Le serveur de ressources : qui héberge la/les ressources et expose des APIs
- Le client :  l'application qui invoque les APIs et est utilisée par l’utilisateur qui a besoin d’un token OAuth
- Le serveur d’autorisation : qui émet le jeton utilisé par le client
 
 Le flux des échanges OAuth2 se présente comme suit :
 
 
<amp-img src="https://farm9.staticflickr.com/8365/29088727302_3a39833a82_o_d.png"
  width="470"
  height="650"
  layout="responsive"
  alt="AMP"></amp-img>

1. Le client fait une demande d’autorisation au fournisseur de services
2. Le fournisseur de services authentifie l'utilisateur et demande à l’utilisateur son autorisation d'accès aux données
3. Si l'utilisateur autorise le client, le fournisseur de services initialise une redirection vers le site client avec un code d'accès temporaire.
4. Le client demande alors un jeton en utilisant le code d'accès temporaire
5. Le serveur d’autorisation accorde un jeton d'accès qui peut être utilisé pour authentifier les demandes ultérieures de ressources protégées

## Prérequis

Avant de continuer, vérifiez que vous avez correctement installé .net Core et Visual Studio 2015 Update 3 si besoin.
Si cela n’est pas le cas, merci de suivre les [étapes d'installation fournies par Microsoft](https://www.microsoft.com/net/core#windows).

Dans cette série d’articles, je vais utiliser Visual Studio 2015, mais il est tout à fait possible d’utiliser un autre éditeur (VS Code, Sublime, Atom…).

## Mise en place du middleware OAuth2

Dans ce premier article, nous allons créer une application permettant de se connecter avec compte GitHub, afficher les informations des Claims et des Tokens puis de se déconnecter.
Voici le scénario final : 

**Home page sans être authentifié**
<amp-img src="https://farm9.staticflickr.com/8060/29088734012_da6cd90c25_o_d.png"
  width="620"
  height="460"
  layout="responsive"
  alt="Home page sans être authentifié"></amp-img>

**Login via Github**
<amp-img src="https://farm9.staticflickr.com/8480/29117135511_2ff54e2bd5_o_d.png"
  width="620"
  height="460"
  layout="responsive"
  alt="Login via Github"></amp-img>

**Home page en étant authentifié avec GitHub**
<amp-img src="https://farm9.staticflickr.com/8541/29161391346_47d44b4312_o_d.png"
  width="620"
  height="460"
  layout="responsive"
  alt="Home page en étant authentifié avec GitHub"></amp-img>


### Création de l’application dans GitHub

Avant de nous lancer dans l’écriture de code C#, commençons par créer une application sur GitHub.
Connectez-vous sur Github, éditez votre profil puis rendez-vous sur la page OAuth applications.
L’onglet affiché par défaut liste toutes les applications autorisées à accéder à vos données Github : c’est ici que l’on peut révoquer une autorisation pour une application.
Cependant, c’est le second onglet “Développer applications” qui nous intéresse.
Cliquez sur *Register a new application* et remplissez le formulaire comme suit :

<amp-img src="https://farm9.staticflickr.com/8100/29161391106_8337809ac1_o_d.png"
  width="620"
  height="460"
  layout="responsive"
  alt="Création de l’application dans GitHub"></amp-img>

Vous pourrez, en cas de besoin, modifier les informations ultérieurement.

Quelques remarques concernant les URLs :
- Je vais utiliser un site en HTTPS
- L’URL concerne évidemment un site en cours de développement “localhost”
- J’utilise un port libre !
- Le path `/signin-github` sera la partie de notre application qui exécute notre middleware Oauth

Une fois l’application créée, Github va vous fournir deux clés : le **clientId** et le **ClientSecret** qui sont nécessaires à la configuration du middleware.

Certains peuvent se demander pourquoi utiliser un site ou une page en HTTPS.
La réponse simple est que l'on veut éviter de faire circuler des informations en clair sur le réseau et encore plus lorsque qu'il s'agit d'informations d'authentification.
On pourrait alors me répondre que Github s'occupe de la partie authentification et est déjà en HTTPS. 
C'est vrai, mais Github va aussi renvoyer des tokens à la suite de cette authentification. Même si ces tokens ne sont valides que pour une durée limitée, il est préférable de les protéger d'un bon vieux "man in the middle". De plus, à l'heure où j'écris, les certificats SSL sont devenus très accessibles et certains sont gratuits !

<amp-img src="https://farm9.staticflickr.com/8734/29161392566_c623d6519d_o_d.png"
  width="620"
  height="460"
  layout="responsive"
  alt="secret"></amp-img>


### Création de l’application Aspnet Core

Depuis Visual Studio 2015, faites :
`File` =&gt; `New` =&gt; `Project`
Sélectionnez `ASP.NET Core Web Application`

<amp-img src="https://farm9.staticflickr.com/8255/29088734792_91574f465a_o_d.png"
  width="620"
  height="460"
  layout="responsive"
  alt="Création de l’application Aspnet Core"></amp-img>

Entrez les noms pour le projet et la solution :
**Projet** : AllInOne
**Solution** Aspnet-OAuth2

Créez un projet web vide
<amp-img src="https://farm9.staticflickr.com/8317/28573011224_842b3780f5_o_d.png"
  width="620"
  height="460"
  layout="responsive"
  alt="Création de l’application Aspnet Core"></amp-img>


SI vous n'utilisez pas VS2015, créez vous-mêmes la structure des dossiers et utilisez la commande suivante pour créer le projet :

```shell
dotnet new
```

### Configuration

#### Global.json

Le fichier `global.json` définit les paramètres globaux à votre solution.
Dans mon cas (par défaut), les chemins vers les projets et la version du SDK utilisé sont :

```js
{
  "projects": [ "src", "test" ],
  "sdk": {
    "version": "1.0.0-preview2-003121"
  }
}
```

#### Références et Packages nuget

Si vous démarrez avec .net Core et que vous n’avez pas encore l’habitude des packages nuget (oui ça arrive encore …), sachez que pour réaliser le framework de façon vraiment modulaire, l’équipe de Microsoft a découpé chaque petite fonctionnalité en packages. Et nous allons devoir les référencer via le fichier `project.json`, dans l’objet `dependencies`
Nous allons ajouter les packages qui permettent l’authentification et l’OAuth ainsi que la configuration.
Modifiez l’objet comme cela :

```js
"dependencies": {
    "Microsoft.NETCore.App": {
      "version": "1.0.0",
      "type": "platform"
    },
    "Microsoft.AspNetCore.Diagnostics": "1.0.0",
   
    "Microsoft.AspNetCore.Server.IISIntegration": "1.0.0",
    "Microsoft.AspNetCore.Server.Kestrel": "1.0.0",
    "Microsoft.Extensions.Logging.Console": "1.0.0",
    "Microsoft.AspNetCore.Authentication.Cookies": "1.0.0",
    "Microsoft.AspNetCore.Authentication.OAuth": "1.0.0",
    "Microsoft.AspNetCore.DataProtection": "1.0.0",
    "Microsoft.Extensions.Configuration.UserSecrets": "1.0.0",
    "Microsoft.Extensions.FileProviders.Embedded": "1.0.0",
    "Microsoft.Extensions.Configuration.EnvironmentVariables": "1.0.0"
  },
```

Sauvegardez le fichier ou exécutez la commande suivante, ce qui aura pour effet de lancer une restauration des packages dans VS2015 :

```shell
dotnet restore
```

#### User Secret

Nous allons maintenant configurer les paramètres OAuth récupérés précédemment sur Github.
Ces paramètres doivent rester au maximum confidentiels, pour éviter qu’une application lambda se fasse passer pour la vôtre. Il ne faut donc pas commiter ces informations sur un VCS.
Pour éviter tout commit par inadvertance, nous allons utiliser le système des `user secrets`.
Depuis Visual Studio, faites un clic-droit sur le projet puis allez sur manage User Secrets. Cela va vous créer un fichier `secrets.json` vide.

<amp-img src="https://farm9.staticflickr.com/8292/28573005474_1a5d7501bd_o_d.png"
  width="457"
  height="97"
  layout="responsive"
  alt="Création de l’application Aspnet Core"></amp-img>

> 	**Si vous n'utilisez pas Visual Studio, créez un fichier à la main à l'emplacement suivant**
> Windows: `%APPDATA%\microsoft\UserSecrets\{userSecretsId}\secrets.json`
> Linux: `~/.microsoft/usersecrets/{userSecretsId}/secrets.json`
> Mac: `~/.microsoft/usersecrets/{userSecretsId}/secrets.json`
> Le paramètre userSecretsId se trouve dans le fichier projects.json. Si vous utilisez Visual Studio il est rajouter pour vous, sinon ajoutez le à la main.
> Pour moi la valeur est la suivante :
>  "userSecretsId": "aspnet-AllInOne-20160819103237"
	
	
Ajoutez les 2 valeurs récupérées sur Github
```js
{
  "github:clientid": "1234567890123456789",
  "github:clientsecret": "12345678901234567891234567890123456789"
}
```

Nous allons voir par la suite comment facilement récupérer les valeurs de ces paramètres dans notre code.

> **Remarque :**
> Lors de la mise en production, on va généralement utiliser des variables d'environnement qui sont faciles à ajouter et cross-platform y compris Docker ! Cependant, ces valeurs seront toujours en clair. Pour des informations devant être cryptées, il est recommandé d'utiliser un système comme Vault de HashiCorp (https://www.vaultproject.io/) ou un équivalent. Ensuite, un simple fournisseur de configuration vous permettra de récupérer les paramètres.

#### launchSettings

Allez, courage, encore un peu de config !

Nous allons éditer le fichier `launchSettings.json` qui se trouve dans le répertoire `Properties` de votre projet.
Ce fichier définit les configurations de lancement de l’application. Il y a deux profils par défaut : un pour le lancement via IIS express et l’autre pour le lancement en ligne de commande lorsque que l’on fait un *dotnet run*.

Nous allons modifier les ports utilisés pour matcher ceux définis lors de l’enregistrement de l’application dans Github, et mettre le protocole HTTPS en place.

Après modification, j’obtiens le fichier suivant :

```js
{
  "iisSettings": {
    "windowsAuthentication": false,
    "anonymousAuthentication": true,
    "iisExpress": {
      "applicationUrl": "https://localhost:44367/",
      "sslPort": 44367
    }
  },
  "profiles": {
    "IIS Express": {
      "commandName": "IISExpress",
      "launchBrowser": true,
      "launchUrl": "https://localhost:44367/",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    "AllInOne": {
      "commandName": "Project",
      "launchBrowser": true,
      "launchUrl": "https://localhost:44367/",
      "environmentVariables": {
        "ASPNETCORE_URLS": "https://*:44367",
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
```

Notez que le paramètre `launchUrl` n’est pas l’URL de votre serveur mais celle utilisée par le navigateur à son lancement.
J’ai rajouté une variable d'environnement magique (ou presque) ASPNETCORE_URLS qui définit les URLs utilisées par Kestrel.
Aspnet core utilise plusieurs variables d'environnement prédéfinies permettant de facilement configurer vos environnements.

#### SSL

SSL c’est bien, mais encore faudrait-il un certificat ! 
Si tout va bien, au premier lancement avec IIS express, une popup va vous proposer de créer un certificat local pour IIS express. Sinon, c’est sûrement que vous l’avez déjà.
Nous allons utiliser ce même certificat pour le mode sans IIS express. 

Cela concerne uniquement les gens sous Windows et pour l'environnement de développement : 
1. Via le menu démarrer, lancez un mmc.
2. Cliquez sur  Fichier &gt; Ajouter/Supprimer un composant.
3. Cliquez sur Certificates &gt; Ajouter.
4. Sélectionnez un compte d’ordinateur et cliquez sur Suivant. Sélectionnez l’ordinateur local puis cliquez sur Terminer et Ok.
5. Sélectionnez le certificat qui se trouve dans Certificats &gt; Personnel &gt; Certificats. Faîtes un clic-droit sur le certificat localhost puis Toutes les tâches &gt; Exporter.

<amp-img src="https://farm9.staticflickr.com/8236/29088730012_34403e01e2_o_d.png"
  width="427"
  height="174"
  layout="responsive"
  alt="folder"></amp-img>


6. Choisissez Oui, exportez la clé privée et incluez tous les certificats dans le chemin d’accès de certification
7. Entrez un mot de passe, je vais utiliser “dev” pour ce projet
8. Enregistrez les fichiers dans le sous-répertoire suivant de votre projet “compiler\resources\iiCert.pfx”

<amp-img src="https://farm9.staticflickr.com/8111/28575032573_c8ff54a06e_o_d.png"
  width="611"
  height="433"
  layout="responsive"
  alt="folder"></amp-img>

_Ce dossier est un dossier spécial, tous les fichiers déposés ici seront compilés en ressources embarquées._

#### Point d’entrée

Dans les applications .core, le point d’entrée d’une application est la méthode statique main. Rien d'étonnant, sauf que pour Aspnet Core c’est pareil, donc fini les global.asax : tout le monde à la même enseigne.

Nous allons faire quelques modifications simples dans le fichier Program.cs pour prendre en compte notre certificat pour notre serveur Kestrel.

#### Kestrel

Un petit mot sur Kestrel pour ceux qui ne connaîtraient pas encore. Il s’agit d’un nouveau serveur web cross-platform basé sur Libuv, une librairie cross-platforme d’asynchronisme, comme le serveur NodeJS.
Cependant, Kestrel n’est pas prévu pour être le serveur web exposé, il est préconisé d'utiliser un mécanisme de proxy en utilisant IIS ou Nginx.


```csharp
using System.IO;
using System.Reflection;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;
namespace AllInOne
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                .UseKestrel(
                options =>
                {
                    //Configure SSL
                    var serverCertificate = LoadCertificate();
                    options.UseHttps(serverCertificate);
                })
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup()
                .Build();
            host.Run();
        }
        private static X509Certificate2 LoadCertificate()
        {
            var assembly = typeof(Startup).GetTypeInfo().Assembly;
            var embeddedFileProvider = new EmbeddedFileProvider(assembly, "AllInOne");
            var certificateFileInfo = embeddedFileProvider.GetFileInfo("compiler/resources/iisCert.pfx");
            using (var certificateStream = certificateFileInfo.CreateReadStream())
            {
                byte[] certificatePayload;
                using (var memoryStream = new MemoryStream())
                {
                    certificateStream.CopyTo(memoryStream);
                    certificatePayload = memoryStream.ToArray();
                }
                return new X509Certificate2(certificatePayload, "dev");
            }
        }
    }
}
```

La modification est très simple : on ajoute des options pour le lancement du serveur Kestrel qui charge le certificat.
La méthode LoadCertificate va chercher le certificat qui est en ressource embarquée, lit le contenu brut et retourne un certificat X509 en utilisant le mot de passe spécifié lors de l’export.

Il ne reste plus qu’à appeler l'extension UseHttps en passant le certificat.
Pour pouvoir utiliser cette extension, il nous faut ajouter un package supplémentaire dans notre ficher `project.json`

Ajoutez le package
"Microsoft.AspNetCore.Server.Kestrel.Https": "1.0.0",
 
Vous pouvez maintenant exécuter l’application pour vérifier toute la configuration. Vous devriez voir un joli Hello world !

<amp-img src="https://farm9.staticflickr.com/8875/29195124075_65b8930a33_o_d.png"
  width="499"
  height="332"
  layout="responsive"
  alt="dev"></amp-img>

#### Middlewares

Nous allons enfin passer au code source. Nous allons, dans le fichier startup.cs, mettre en place les middleware nécessaires pour le bon fonctionnement de notre authentification.

##### Chargement de la configuration

Avant d'oublier, nous allons ajouter un constructeur à notre startup, qui va s'occuper de construire un objet de configuration à partir des différents éléments qui la compose et stocker le résultat dans une propriété.

```csharp
public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath);
            if (env.IsDevelopment())
            {
                builder.AddUserSecrets();
            }
            Configuration = builder.Build();
        }
        public IConfiguration Configuration { get; set; }
```

#### Cookies Middleware

Nous allons, dans un premier temps, mettre en place le middleware responsable des cookies.
Ce middleware permet de sérialiser le principal de l’utilisateur dans un cookie encrypté.
Pour chaque requête ultérieure, le cookie sera validé et désérialisé pour recréer le principal de l’utilisateur qui est assigné au HttpContext.
Modifiez le code de la méthode ConfigureServices pour activer l’authentification par cookie.

```csharp
using Microsoft.AspNetCore.Authentication.Cookies;
….
public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(options => options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme);
        }
```

Ce code permet de définir le middleware qui sera responsable de la persistance de l’identité de l’utilisateur suite à une authentification réussie.

##### Authentification Scheme

Nous avons ici utilisé une constante `CookieAuthenticationDefaults.AuthenticationScheme` qui permet d’identifier le middleware de Cookie. Chaque middleware d’authentification aura donc son propre scheme, un identifiant unique permettant d’y accéder par la suite si plusieurs middlewares sont mis en place.
Il est même possible de limiter les autorisations à un ou plusieurs middlewares précis lorsque l’on utilise MVC
`[Authorize(ActiveAuthenticationSchemes = "Cookie,Github")]`

Il nous faut maintenant dire d’utiliser le middleware de cookie.
Ajoutez ce code juste apres le  if (env.IsDevelopment())

```csharp
app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AutomaticAuthenticate = true,
                LoginPath = new PathString("/login")
            });
```

On active le middleware avec deux options :
- AutomaticAuthenticate : ce flag indique que le middleware doit s’exécuter à chaque requête et tenter de valider et de reconstruire tout principal sérialisé dans un cookie
- LoginPath : le chemin relatif où seront redirigés les requêtes lorsqu'un utilisateur tente d'accéder à une ressource, mais n'a pas été authentifié.

Puisque que l’on a précisé que le chemin relatif pour se connecter est `/login`, il faut définir une action à exécuter pour cet appel. Nul besoin de MVC pour ça ! Il suffit simplement d'enregistrer une action à exécuter pour le chemin en question.
Pour notre exemple, nous allons simplement simuler une authentification réussie.

```csharp
app.Map("/login", x =>
            {
                x.Run(async context =>
                {
                    var name = new Claim(ClaimTypes.Name, "toto");
                    var identity = new ClaimsIdentity(new[] {name }, CookieAuthenticationDefaults.AuthenticationScheme);
                    var principal = new ClaimsPrincipal(identity);
                    await context.Authentication.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);
                    context.Response.Redirect("/");
                });
            });
```

On crée un principal à partir d’un claims de type Name, puis on se connecte sur le middleware de cookie avec ce nouveau principal.
Si vous lancez l’application et que vous vous rendez sur le path “/login”. Vous devriez voir qu'un cookie nommé .AspNetCore.Cookies a été créé.

<amp-img src="https://farm9.staticflickr.com/8497/29088734152_3a68d0564d_o_d.png"
  width="445"
  height="58"
  layout="responsive"
  alt="cookie"></amp-img>

Ajoutons tout de suite un page pour se déconnecter

```csharp
 app.Map("/logout", x =>
            {
                x.Run(async context =>
                {
                    await context.Authentication.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
                    context.Response.Redirect("/");
                });
            });
```

Et pour nous éviter d’aller regarder les cookies à la main, modifions aussi l’action principale pour afficher un peu plus qu’un hello world.

```csharp
app.Run(async (context) =>
            {
                var user = context.User;
                context.Response.ContentType = "text/html";
                await context.Response.WriteAsync("");
                if (user == null || !user.Identities.Any(identity => identity.IsAuthenticated))
                {
                    await context.Response.WriteAsync("<h1>Hello anonymous</h1>");
                    await context.Response.WriteAsync("<a href="/login"> Login</a>");
                }
                else
                {
                    await context.Response.WriteAsync($"<h1>Hello {context.User.Identity.Name}</h1>");
                    foreach (var claim in context.User.Claims)
                    {
                        await context.Response.WriteAsync($"{claim.Type}: {claim.Value}<br>");
                    }
                    await context.Response.WriteAsync("<a href="/logout">Logout</a><br>");
                }
                await context.Response.WriteAsync("");
            });
```

Et voilà, on peut se connecter en tant que toto !

<amp-img src="https://farm9.staticflickr.com/8204/29161391556_70c7a61a58_o_d.png"
  width="458"
  height="240"
  layout="responsive"
  alt="cookie"></amp-img>

##### Oauth middleware

Bon c’est bien tout ça mais on est venu pour faire de l’OAuth nous !

Ajoutons notre middleware OAuth qui est fourni par Microsoft dans le package
`Microsoft.AspNetCore.Authentication.OAuth`

```csharp
app.UseOAuthAuthentication(new OAuthOptions
             {
                 AuthenticationScheme = "GitHub",
                 DisplayName = "Github",
                 ClientId = Configuration["github:clientid"],
                 ClientSecret = Configuration["github:clientsecret"],
                 CallbackPath = new PathString("/signin-github"),
                 AuthorizationEndpoint = "https://github.com/login/oauth/authorize",
                 TokenEndpoint = "https://github.com/login/oauth/access_token",
                 UserInformationEndpoint = "https://api.github.com/user",
                 ClaimsIssuer = "OAuth2-Github",
                 SaveTokens = true,
                 Events = new OAuthEvents
                 {
                     OnCreatingTicket = context =>
                     {
                         context.Identity.AddClaim(new Claim(
                              ClaimsIdentity.DefaultNameClaimType, "toto from git !",
                              ClaimValueTypes.String, context.Options.ClaimsIssuer));
                         return Task.FromResult(0);
                     },
                 }
             });
```

Rien de bien compliqué, on définit l’identifiant (le scheme) ainsi que son nom, puis on récupère les deux paramètres depuis la configuration pour le clientId et clientSecret stockés précédemment dans les user secrets.
Le CallbackPath doit correspondre à celui fourni pendant la création de l’application sur github et les endpoints sont ceux définis par Github.
Le paramètre SaveTokens permet d’enregistrer les tokens dans un objet spécifique mais nous y reviendrons plus tard.

Enfin, il est possible d'associer des fonctions exécutées pour les événements survenant pendant la discussion OAuth.
Celui qui nous intéresse particulièrement est OnCreatingTicket, qui survient lorsque le fournisseur a correctement authentifié l’utilisateur et que lui-même a validé les droits d’accès.
Pour cette fonction, je vais reprendre le code précédent qui va simple créer un claims en dur.
Comme la fonction attend en retour un Task, on utilisera simplement la méthode Task.FromResult pour en créer une.

Voilà, notre middleware est en place et il ne reste plus qu’à y faire appel. Pour cela, on va demander l’authentification sur le scheme Github.

Modifions la méthode exécute sur le chemin `/login`

```csharp
app.Map("/login", x =>
            {
                x.Run(async context =>
                {
                    await context.Authentication.ChallengeAsync("GitHub", new AuthenticationProperties() { RedirectUri = "/" });
                });
            });
```

Vous pouvez maintenant lancer l’application pour voir le resultat

<amp-img src="https://farm9.staticflickr.com/8060/29088734012_da6cd90c25_o_d.png"
  width="620"
  height="460"
  layout="responsive"
  alt="cookie"></amp-img>

<amp-img src="https://farm9.staticflickr.com/8480/29117135511_2ff54e2bd5_o_d.png"
  width="846"
  height="860"
  layout="responsive"
  alt="cookie"></amp-img>

<amp-img src="https://farm9.staticflickr.com/8344/29088712842_4bf831dd29_o_d.png"
  width="636"
  height="387"
  layout="responsive"
  alt="cookie"></amp-img>


Nous sommes maintenant authentifiés avec Github.
Il ne nous reste plus qu’une chose à faire, remplacer notre claim qui est en dur par de vrais claims correspondant à l’utilisateur réel.

Pour récupérer les informations qui nous intéressent, on va utiliser l’API Github concernant la ressource User.
L’utilisation de l’API nécessite un token valide pour être utilisée, et maintenant nous en avons un !

Remplaçons le code de OnCreatingTicket par celui-ci :

```csharp
OnCreatingTicket = async context =>
                    {
                        // Get the GitHub user
                        var request = new HttpRequestMessage(HttpMethod.Get, context.Options.UserInformationEndpoint);
                        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", context.AccessToken);
                        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                        var response = await context.Backchannel.SendAsync(request, context.HttpContext.RequestAborted);
                        response.EnsureSuccessStatusCode();
                        var user = JObject.Parse(await response.Content.ReadAsStringAsync());
                        var identifier = user.Value("id");
                        if (!string.IsNullOrEmpty(identifier))
                        {
                            context.Identity.AddClaim(new Claim(
                                ClaimTypes.NameIdentifier, identifier,
                                ClaimValueTypes.String, context.Options.ClaimsIssuer));
                        }
                        var userName = user.Value("login");
                        if (!string.IsNullOrEmpty(userName))
                        {
                            context.Identity.AddClaim(new Claim(
                                ClaimsIdentity.DefaultNameClaimType, userName,
                                ClaimValueTypes.String, context.Options.ClaimsIssuer));
                        }
                        var name = user.Value("name");
                        if (!string.IsNullOrEmpty(name))
                        {
                            context.Identity.AddClaim(new Claim(
                                "urn:github:name", name,
                                ClaimValueTypes.String, context.Options.ClaimsIssuer));
                        }
                        var email = user.Value("email");
                        if (!string.IsNullOrEmpty(email))
                        {
                            context.Identity.AddClaim(new Claim(
                                ClaimTypes.Email, email,
                                ClaimValueTypes.Email, context.Options.ClaimsIssuer));
                        }
                        var link = user.Value("url");
                        if (!string.IsNullOrEmpty(link))
                        {
                            context.Identity.AddClaim(new Claim(
                                "urn:github:url", link,
                                ClaimValueTypes.String, context.Options.ClaimsIssuer));
                        }
                    }
```

Première étape, on fait une requête sur cette url https://api.github.com/user en utilisant l’accesstoken qui est dans notre context actuel et donc valide.
La requête nous renvoie une réponse en json dans laquelle on va piocher les informations intéressantes :
- id
- login
- name
- email
- url

A partir de ces données, il ne reste plus qu’à créer des claims et les ajouter à l’identité de l’utilisateur de notre context.

Si vous relancez l’application et que vous vous déconnectez et reconnectez, vous pouvez voir maintenant apparaître les informations de l’utilisateur.

<amp-img src="https://farm9.staticflickr.com/8496/28573010054_bbe7ff587c_o_d.png"
  width="678"
  height="521"
  layout="responsive"
  alt="hello"></amp-img>


Dernier point avant de terminer cet article. Nous avons défini l’option SaveToken à true auparavant. Nous allons maintenant interroger l’objet contenant les tokens et les afficher pour vérifier le bon fonctionnement.

Ajoutez le code suivant à la suite de l’affichage des claims dans la fonction du middleware principal.

```csharp
await context.Response.WriteAsync("<br>");
                    await context.Response.WriteAsync("Tokens:<br>");
                    await context.Response.WriteAsync("Access Token: " + await context.Authentication.GetTokenAsync("access_token") + "<br>");
                    await context.Response.WriteAsync("Refresh Token: " + await context.Authentication.GetTokenAsync("refresh_token") + "<br>");
                    await context.Response.WriteAsync("Token Type: " + await context.Authentication.GetTokenAsync("token_type") + "<br>");
                    await context.Response.WriteAsync("expires_at: " + await context.Authentication.GetTokenAsync("expires_at") + "<br>");
```            

ALL DONE !

#### Conclusion

Dans cet article, nous avons pu voir comme il est simple de mettre en place une authentification OAuth en moins de 200 lignes de code. Il est tout de même rare d'utiliser ce code tel quel, notamment car le principe de Responsabilité unique (Single Responsibility Principle) n'est pas respecté. Dans le prochain article, nous utiliserons un middleware spécifique pour la connexion Github.

Retrouvez l'ensemble du code sur [le GitHub de SOAT](https://github.com/SoatGroup/aspnetcore-oauth2).