---
layout: post
title: Mise en place d'Ajax Asp.net 3.5 et Silverlight 2 dans MOSS 2007
date: 2009-07-07 14:22
author: evilz
comments: true
categories: [Informatique, Sharepoint 2007, Silverlight 2]
---
<a title="Silverlight_powered de evilz, sur Flickr" href="http://www.flickr.com/photos/evilznet/3697837810/"><img class="alignleft withborder" src="http://farm3.static.flickr.com/2666/3697837810_9c31f17e2f_m.jpg" alt="Silverlight_powered" width="240" height="180" /></a>L'objet de ce post est de décrire la procédure à suivre pour ajouter les fonctionnalités d'AJAX Asp.net 3.5 et Silverlight 2 sur les applications MOSS 2007. Par défaut MOSS utilise le Framework 3.0, donc l'ajax d'asp.net 3.5 et Silverlight ne pouvait pas déjà être présent.
<h3>INSTALLER LE FRAMEWORK 3.5</h3>
Téléchargez est installez le Framework .NET 3.5 SP1 disponible <a href="http://www.microsoft.com/downloads/details.aspx?FamilyID=ab99342f-5d1a-413d-8319-81da479ab0d7&amp;displaylang=en" target="_blank">ici</a>.
<h3>MODIFIER LE FICHIER WEB.CONFIG</h3>
Après l'installation du Framework ASP.NET 3.5 il est nécessaire de modifier le fichier de configuration des site MOSS 2007 avec les sections spécifiques à Ajax. Pour un site par défaut le fichier ce trouve ici
<div><em>c:inetpubwwwrootwssvirtualdirectories80</em></div>


<em></em>

 <strong>Ajout du &lt;sectionGroup&gt; dans l'élément &lt;configSections&gt;</strong>
<pre class="brush:xml">&lt;sectionGroup name="system.web.extensions"
               type="System.Web.Configuration.SystemWebExtensionsSectionGroup,
               System.Web.Extensions, Version=3.5.0.0, Culture=neutral,
               PublicKeyToken=31BF3856AD364E35"&gt;
   &lt;sectionGroup name="scripting"
               type="System.Web.Configuration.ScriptingSectionGroup,
               System.Web.Extensions, Version=3.5.0.0, Culture=neutral,
               PublicKeyToken=31BF3856AD364E35"&gt;
      &lt;section name="scriptResourceHandler"             type="System.Web.Configuration.ScriptingScriptResourceHandlerSection,
               System.Web.Extensions, Version=3.5.0.0, Culture=neutral,
               PublicKeyToken=31BF3856AD364E35" requirePermission="false"
               allowDefinition="MachineToApplication"/&gt;
      &lt;sectionGroup name="webServices"                    type="System.Web.Configuration.ScriptingWebServicesSectionGroup,
                   System.Web.Extensions, Version=3.5.0.0, Culture=neutral,
                   PublicKeyToken=31BF3856AD364E35"&gt;
       &lt;section name="jsonSerialization"                type="System.Web.Configuration.ScriptingJsonSerializationSection,
               System.Web.Extensions, Version=3.5.0.0, Culture=neutral,
               PublicKeyToken=31BF3856AD364E35" requirePermission="false"
               allowDefinition="Everywhere" /&gt;
       &lt;section name="profileService"
               type="System.Web.Configuration.ScriptingProfileServiceSection,
               System.Web.Extensions, Version=3.5.0.0, Culture=neutral,
               PublicKeyToken=31BF3856AD364E35" requirePermission="false"
               allowDefinition="MachineToApplication" /&gt;
       &lt;section name="authenticationService"                type="System.Web.Configuration.ScriptingAuthenticationServiceSection,
               System.Web.Extensions, Version=3.5.0.0, Culture=neutral,
               PublicKeyToken=31BF3856AD364E35" requirePermission="false"
               allowDefinition="MachineToApplication" /&gt;
       &lt;section name="roleService"
               type="System.Web.Configuration.ScriptingRoleServiceSection,
               System.Web.Extensions, Version=3.5.0.0, Culture=neutral,
               PublicKeyToken=31BF3856AD364E35" requirePermission="false"
               allowDefinition="MachineToApplication" /&gt;
     &lt;/sectionGroup&gt;
   &lt;/sectionGroup&gt;
 &lt;/sectionGroup&gt;</pre>
<strong>Ajout de la section &lt;controls&gt; dans &lt;system.web&gt;/&lt;pages&gt;</strong>
<pre class="brush:xml">&lt;controls&gt;
 &lt;add tagPrefix="asp" namespace="System.Web.UI" assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral,
       PublicKeyToken=31BF3856AD364E35"/&gt;
 &lt;add tagPrefix="asp" namespace="System.Web.UI.WebControls" assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral,PublicKeyToken=31BF3856AD364E35"/&gt;
&lt;/controls&gt;</pre>
3.3  Ajout de nouvelles entrées dans &lt;assemblies&gt;
<pre class="brush:xml">&lt;add assembly="System.Core,
   Version=3.5.0.0, Culture=neutral,
   PublicKeyToken=B77A5C561934E089"/&gt;
&lt;add assembly="System.Web.Extensions,
   Version=3.5.0.0, Culture=neutral,
   PublicKeyToken=31BF3856AD364E35"/&gt;
&lt;add assembly="System.Data.DataSetExtensions,
   Version=3.5.0.0, Culture=neutral,
   PublicKeyToken=B77A5C561934E089"/&gt;
&lt;add assembly="System.Xml.Linq,
   Version=3.5.0.0, Culture=neutral,
   PublicKeyToken=B77A5C561934E089"/&gt;</pre>
<strong>Ajout des HTTP handlers dans la section &lt;httpHandlers&gt;</strong>
<pre class="brush:xml">&lt;add verb="*" path="*.asmx" validate="false"
   type="System.Web.Script.Services.ScriptHandlerFactory,
   System.Web.Extensions, Version=3.5.0.0, Culture=neutral,
   PublicKeyToken=31BF3856AD364E35"/&gt;
&lt;add verb="*" path="*_AppService.axd" validate="false"
   type="System.Web.Script.Services.ScriptHandlerFactory,
   System.Web.Extensions, Version=3.5.0.0, Culture=neutral,
   PublicKeyToken=31BF3856AD364E35"/&gt;
&lt;add verb="GET,HEAD" path="ScriptResource.axd"
   type="System.Web.Handlers.ScriptResourceHandler,
   System.Web.Extensions, Version=3.5.0.0, Culture=neutral,
   PublicKeyToken=31BF3856AD364E35" validate="false"/&gt;
Ajout du HTTP module dans la section &lt;httpModules&gt;
&lt;add name="ScriptModule"
   type="System.Web.Handlers.ScriptModule,
   System.Web.Extensions, Version=3.5.0.0, Culture=neutral,
   PublicKeyToken=31BF3856AD364E35"/&gt;</pre>
 <strong>Ajout des assemblies en tant que SafeControl dans la section &lt;SharePoint&gt;/&lt;SafeControls&gt;</strong>
<pre class="brush:xml">&lt;SafeControl Assembly="System.Web.Silverlight,
           Version=2.0.5.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35"
           Namespace="System.Web.UI.SilverlightControls" TypeName="*" Safe="True" /&gt;
&lt;SafeControl Assembly="System.Web.Extensions,
           Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35"
           Namespace="System.Web.UI" TypeName="*" Safe="True" /&gt;</pre>
<strong>Ajout des redirections d'assemblies dans la section &lt;runtime&gt;&lt;assemblyBinding&gt;</strong> (optionnel)
<pre class="brush:xml">&lt;dependentAssembly&gt;
 &lt;assemblyIdentity name="System.Web.Extensions" publicKeyToken="31bf3856ad364e35"/&gt;
 &lt;bindingRedirect oldVersion="1.0.0.0-1.1.0.0" newVersion="3.5.0.0"/&gt;
&lt;/dependentAssembly&gt;
&lt;dependentAssembly&gt;
 &lt;assemblyIdentity name="System.Web.Extensions.Design" publicKeyToken="31bf3856ad364e35"/&gt;
 &lt;bindingRedirect oldVersion="1.0.0.0-1.1.0.0" newVersion="3.5.0.0"/&gt;
&lt;/dependentAssembly&gt;</pre>
 <strong>Ajout de la section &lt;system.web.extensions&gt; dans la section &lt;configuration&gt;</strong>
<pre class="brush:xml">&lt;system.web.extensions&gt;
     &lt;scripting&gt;
       &lt;webServices&gt;
       &lt;/webServices&gt;
     &lt;/scripting&gt;
   &lt;/system.web.extensions&gt;
    &lt;system.webServer&gt;
      &lt;validation validateIntegratedModeConfiguration="false"/&gt;
      &lt;modules&gt;
        &lt;remove name="ScriptModule" /&gt;
        &lt;add name="ScriptModule" preCondition="managedHandler"
           type="System.Web.Handlers.ScriptModule,
           System.Web.Extensions, Version=3.5.0.0, Culture=neutral,
           PublicKeyToken=31BF3856AD364E35"/&gt;
      &lt;/modules&gt;
      &lt;handlers&gt;
        &lt;remove name="WebServiceHandlerFactory-Integrated"/&gt;
        &lt;remove name="ScriptHandlerFactory" /&gt;
        &lt;remove name="ScriptHandlerFactoryAppServices" /&gt;
        &lt;remove name="ScriptResource" /&gt;
        &lt;add name="ScriptHandlerFactory" verb="*" path="*.asmx"
           preCondition="integratedMode"
           type="System.Web.Script.Services.ScriptHandlerFactory,
           System.Web.Extensions, Version=3.5.0.0, Culture=neutral,
           PublicKeyToken=31BF3856AD364E35"/&gt;
        &lt;add name="ScriptHandlerFactoryAppServices" verb="*"
           path="*_AppService.axd"
           preCondition="integratedMode"
           type="System.Web.Script.Services.ScriptHandlerFactory,
           System.Web.Extensions, Version=3.5.0.0, Culture=neutral,
           PublicKeyToken=31BF3856AD364E35"/&gt;
        &lt;add name="ScriptResource" preCondition="integratedMode"
           verb="GET,HEAD" path="ScriptResource.axd"
           type="System.Web.Handlers.ScriptResourceHandler,
           System.Web.Extensions, Version=3.5.0.0, Culture=neutral,
           PublicKeyToken=31BF3856AD364E35" /&gt;
      &lt;/handlers&gt;
   &lt;/system.webServer&gt;</pre>
<h3>CONFIGURATION DU MIME TYPES SILVERLIGHT DANS IIS</h3>
<ul>
	<li>Ouvrir l'interface de configuration IIS (%SystemRoot%system32inetsrviis.msc)</li>
	<li>Sélectionnez le site MOSS puis faites clique droite -&gt; propriétés.</li>
	<li>Dans l'onglet HTTP Header cliquez sur le bouton MIME Types</li>
	<li>Cliquez sur le bouton Nouveau pour ajouter un Type</li>
	<li>Dans la fenêtre d'ajout entrer :
- Extension:.xapï¿½
- MIME Type: application/x-silverlight-app</li>
	<li>Validez puis redémarrez IIS (iisreset)</li>
</ul>
