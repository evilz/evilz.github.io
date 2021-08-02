---
layout: post
title: nPress Architecture & Design
date: 2009-07-30 13:05
author: evilz
comments: true
categories: [Informatique, nPress]
---
<h2>Architecture</h2>
<a title="nPress SLN de evilz, sur Flickr" href="http://www.flickr.com/photos/evilznet/3770379558/"><img class="alignright" alt="nPress SLN" src="https://farm4.static.flickr.com/3439/3770379558_1d29b9aaa3_o.png" width="250" height="642" /></a>La solution nPress est composée de trois projets :
<ul>
	<li>nPress.Core : contient tout ! En gros pour l'instant je ne cherche pas à multiplier les dll, et je ne découpe qu'en namespace/répertoire.
<ul>
	<li>Controller : classes en rapport avec <strong>System.Web.Mvc.<span style="color: #2b91af;">Controller</span></strong></li>
	<li>Entities : classes POCO qui représentent les entités du domain</li>
	<li>Interfaces : différentes interfaces</li>
	<li>Mapping : Mapping Fluent Nhibernate</li>
	<li>Repositories : implémentations de IRepository</li>
	<li>Routes : les Routes de <strong>System.Web.Routing</strong></li>
	<li>Services : Services du domaine</li>
	<li>View : contrôles, helper, page, master page ... les vues MVC</li>
</ul>
</li>
	<li>nPress.Tests : Contient les tests Nunit. L'organisation se rapprochera de celle de nPress.Core. Tous les tests devront passer sous Monodevelop ;)</li>
	<li>nPress.Web : Le site web de type MVC. A noter que tous les répertoires on été renommés sont Majuscule.
<ul>
	<li>content : correspondra quasiment au répertoire wp-content de WordPress.</li>
	<li>controllers : Les controllers MVC</li>
	<li>les vues sont dans le répertoire themes.</li>
</ul>
</li>
</ul>
<h2>Design</h2>
Je ne vais pas utiliser <strong><em>DDD</em></strong> dans ce projet. Il y a bien un <em><strong>repository</strong></em> mais, il ne correspond pas à celui que l'on trouve habituellement dans <em><strong>DDD</strong></em>.
Le <strong><em>repository</em></strong> utilisé, sert d'abstraction sur la <strong><em>DAL</em></strong>. La <strong><em>DAL</em></strong> étant représentée par l'<em><strong>ORM</strong></em> ou un autre système (<em><strong>db4o</strong></em>) que l'on souhaite mettre en œuvre.
<p style="text-align: center;"><a title="NPress Diagram1 de evilz, sur Flickr" href="http://www.flickr.com/photos/evilznet/3771031671/"><img class="aligncenter" alt="NPress Diagram1" src="https://farm3.static.flickr.com/2592/3771031671_78ee4df2c8.jpg" width="500" height="110" /></a></p>
Le point d'entrée de l'application web MVC est le <strong><em>controller</em></strong> (je passe sur les <em><strong>routes</strong></em>). Le <em><strong>controller</strong></em> si il en a besoin, va faire appel à un <em><strong>service</strong></em> métier qui lui-même fera appel à un <em><strong>repository</strong></em> pour récupérer ou mettre à jour des données persistées.
Le <em><strong>controller</strong></em> sélectionne ensuite une <em><strong>vue</strong></em> et l'affiche.
<h3><span style="color: #000000;">Ioc/DI </span></h3>
Pour casser la dépendance entre les <strong><em>services</em></strong> et le <strong><em>repository</em></strong> concret. Chaque <em><strong>repository</strong></em> devra implémenter une interface <em><strong><span style="color: #333333;">IRepository</span></strong></em>. Le <em><strong>repository</strong></em> concret utilisé sera ensuite chargé par le biais d'un moteur d'<strong><em>injection de dépendance</em></strong>. J'utilise ici <strong>AutoFac</strong>. Je devais utiliser <strong>StructureMap</strong>, mais suite à la mise à jour de <strong>Nhibernate</strong> en version 2.1, une erreur est apparu. Je n'ai pas vraiment le temps de déboguer les sources de <strong>StructureMap</strong>, j'ai donc simplement changé le moteur pour un autre tout aussi bon.

<strong>AutoFac</strong> peut être configuré par code ou par fichier XML. La configuration par code est précunisée dans le cas ou l'on connait à l'avance les dépendances à injecter, ce qui est mon cas puisque je ne vais utiliser que Nhibernate.

Voici le code de mon test unitaire AutoFac

[csharp]
[Test]
public void TestConfiguration()
{
var builder = new ContainerBuilder();
builder.Register&lt;NHibernateRepository&gt;().As&lt;IRepository&gt;();
var container = builder.Build();
var rep = container.Resolve&lt;IRepository&gt;();

Assert.IsAssignableFrom(typeof(NHibernateRepository),rep);
}
[/csharp]
<h2>Conventions</h2>
<ul>
	<li><a href="http://msdn2.microsoft.com/fr-fr/library/ms229043.aspx"><strong>Conventions de mise en majuscules</strong></a><strong> : Décrit les différents systèmes de casse et les modalités d'utilisation de chaque système.
</strong><em>"La plupart des conventions d'affectation de noms sont liées à la casse des identificateurs. Il est important de noter que le Common Language Runtime (CLR) prend en charge des langages qui respectent ou non la casse. Les conventions de mise en majuscules décrites dans cette rubrique aident les développeurs à comprendre et à utiliser une bibliothèque."</em></li>
	<li><a href="http://msdn2.microsoft.com/fr-fr/library/ms229045.aspx"><strong>Conventions générales d'affectation de noms</strong></a><strong> : Décrit les règles générales permettant de sélectionner des noms clairs et lisibles.</strong>
<em>"Les conventions générales d'affectation de noms expliquent comment choisir les noms les plus appropriés pour les éléments de vos bibliothèques. Ces instructions s'appliquent à tous les identificateurs. Les sections suivantes traitent des noms choisis pour des éléments spécifiques, tels que les espaces de noms ou les propriétés."</em></li>
	<li><a href="http://msdn2.microsoft.com/fr-fr/library/ms229048.aspx"><strong>Noms d'assemblys et de DLL</strong></a><strong> : Décrit les conventions d'affectation de noms aux assemblys managés.</strong>
<em>"Dans la plupart des scénarios, un assembly comprend l'intégralité ou une partie d'une bibliothèque réutilisable et est contenu dans une seule bibliothèque de liens dynamiques (DLL). Un assembly peut être fractionné entre plusieurs DLL mais il s'agit d'un cas très rare qui n'est pas abordé dans cette instruction."</em></li>
	<li><a href="http://msdn2.microsoft.com/fr-fr/library/ms229026.aspx"><strong>Noms d'espaces de noms</strong></a><strong> : Décrit les conventions utilisées pour les noms d'espaces de noms et explique comment limiter les conflits entre espaces de noms.
</strong><em>"Le nom choisi pour un espace de noms doit indiquer les fonctionnalités offertes par les types de l'espace de noms. Par exemple, l'espace de noms System.Net.Sockets contient des types qui permettent aux développeurs d'utiliser des sockets pour communiquer sur des réseaux."</em></li>
	<li><a href="http://msdn2.microsoft.com/fr-fr/library/ms229040.aspx"><strong>Noms de classes, de structures et d'interfaces</strong></a><strong> : Décrit les conventions à respecter ou à éviter lors de l'attribution de noms aux types.</strong>
<em>"En général, les noms de types doivent être des groupes nominaux dont le nom est l'entité représentée par le type. Par exemple, Button, Stack et File possèdent tous des noms qui identifient l'entité représentée par le type. Choisissez des noms permettant au développeur d'identifier l'entité ; les noms doivent refléter des scénarios d'utilisation."</em></li>
	<li><a href="http://msdn2.microsoft.com/fr-fr/library/ms229012.aspx"><strong>Noms de membres de type</strong></a><strong> : Décrit les méthodes conseillées en matière de sélection de noms pour les méthodes, les propriétés, les champs et les événements.</strong></li>
	<li><a href="http://msdn2.microsoft.com/fr-fr/library/ms229004.aspx"><strong>Noms de paramètres</strong></a><strong> : Décrit les méthodes conseillées pour choisir des noms de paramètres explicites.</strong>
<em>"Le choix de noms de paramètres appropriés peut étendre considérablement les possibilités d'utilisation de votre bibliothèque. Un nom de paramètre adapté doit spécifier les données ou fonctionnalités affectées par le paramètre.<em>"</em></em></li>
	<li><a href="http://msdn2.microsoft.com/fr-fr/library/ms229037.aspx"><strong>Noms de ressources</strong></a><strong> : Décrit les méthodes conseillées pour la sélection des noms de ressources localisables.</strong></li>
</ul>
<h2>Liens</h2>
projet codeplex : <a href="http://npress.codeplex.com/">http://npress.codeplex.com/</a>
<a href="http://www.evilznet.com/?p=242">Nouveau projet : nPress</a>
