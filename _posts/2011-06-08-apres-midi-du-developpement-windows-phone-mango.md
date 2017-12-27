---
layout: post
title: Après-midi du développement - Windows Phone Mango
date: 2011-06-08 10:58
author: evilz
comments: true
categories: [Informatique, mango, Microsoft, windows phone]
feature: https://farm5.staticflickr.com/4729/27563401609_8df12b7d16_m.jpg
---
Mercredi 1<sup>er</sup> juin nous avons passé une demi-journée dans les locaux de Microsoft pour une tour des évolutions du développement sur la nouvelle version de Windows Phone 7.1 alias **Mango**

<!--more-->

Avec plus de 1500 APIs, le nouveau SDK Windows Phone 7 s'agrandit considérablement : Réalité augmentée, capteurs, multitasking, intégration de Silverlight et XNA dans la même application, base de données locale, nouveaux scénarios de notifications, accès à plus de donnés du téléphone'¦ sans compter les nouveaux outils pour le développeur ! De quoi revoir et améliorer vos applications existantes, mais aussi créer de nouveaux usages. Un beau programme pour une après-midi du développement riche en fruits frais !

Cette session a été présentée par Luc Vo Van, David CATUHE, Pierre Cauchois

# Visual Studio

## Les projets

Après l'installation du nouveau SDK téléchargeable [ici](http://www.microsoft.com/downloads/en/details.aspx?FamilyID=77586864-ab15-40e1-bc38-713a95a56a05&amp;displaylang=en "sdk mango")

Quatre nouveau templates de projet seront présent dans Visual Studio 2010 pour développer vos applications Mango.


<amp-img src="http://farm4.static.flickr.com/3491/5810803389_bea764353e_o.png"
  width="287"
  height="169"
  alt="AMP"></amp-img>

Chacun de ces Templates étant lié à une nouvelle fonctionnalité de Mango.

Le multi-targeting est aussi présent et nous laisse le choix de la version de Windows Phone.

<amp-img src="http://farm4.static.flickr.com/3224/5810803465_0ca347a4d1_o.png"
  width="527"
  height="249"
  alt="AMP"></amp-img>


Il est facilement possible de mettre à jour vos applications existantes vers 7.1 gr'ce à un Wizzard. Attention cependant le retour vers 7.0 peut être plus compliqué, donc faites des tests de migration sur une copie de votre projet ou sur une nouvelle branche.

![](http://farm3.static.flickr.com/2346/5811384780_d118a1053d_o.png)
![](http://farm4.static.flickr.com/3066/5811384742_de38893169.jpg)

A noté cependant qu'il n'est pas obligatoire de migrer vers 7.1 pour que les applications fonctionnent sur le future système, elles pourront fonctionner sans problème et bénéficierons même de meilleures performances liées aux améliorations du système.

## L'émulateur

L'émulateur permet maintenant de simuler une activité des sensors : Accéléromètre et GPS

Pour l'accéléromètre les positions prédéfinies du téléphone sont sélectionnable dans une liste bien qu'il soit tout aussi possible de modifier la position simplement avec la souris. De plus, nous pouvons jouer des scénarios de données comme le '« shake '».
![](http://farm4.static.flickr.com/3365/5810803797_8d3d30f61f.jpg)

Pour la partie location, bing map est affiché dans la fenêtre (étonnant) et permet de créer soit par simple clique sur la carte soit par recherche un parcours (une liste de coordonnées). Ce parcours est ensuite joué c'est-à-dire un changement de point toutes les x seconde.
![](http://farm3.static.flickr.com/2258/5811368232_e7c8bb868e.jpg)

## Profiler

Un profiler dédier au projet WP7 a été ajouté, il n'est pas à l'heure actuelle dans sa version définitive, mais il permet déjà de pouvoir ciblé certains problèmes de frame rate et d'utilisation de thread sur la CPU/GPU.

![](http://farm4.static.flickr.com/3202/5811384844_c9f161ce34.jpg)

![](http://farm4.static.flickr.com/3489/5810804249_39abaa27b6.jpg)

# RunTime

La CRL a été améliorée pour obtenir de meilleures performances, la sérialisation/désérialisation en faisant partie, ce qui permet par exemple de réhydrater une application tombstonée plus rapidement.
Le WebClient a aussi été revu pour ne plus forcément utiliser le thread UI tandis que le GC intervient moins fréquemment et est plus sélectif.
Comme le nouveau SDK ce base sur la version 4 de Silverlight, cela ajoute de nouvelles possibilités (Flux de caméra) et de nouveaux contrôles (PathListBox, RichTextBox ...) et un thread dédié à l'input a été ajouté. Enfin le décodage des images ce fait maintenant en t'che de fond.

Côté XNA les instructions SIMD sont maintenant gérées, les opérations sur les vecteurs sont parallélisées et il est même possible de combiné un développement Silverlight avec du XNA !

# Cycle de vie

Le cycle de vie se voit ajouté un nouvel état nommé Dormant, quand l'utilisateur sort de l'application l'événement Deactivated est déclenché et le système met l'application dans cet état Dormant, tous les threads de l'application sont arrêtés mais l'état de la mémoire reste intact. Si l'application est réactivée la mémoire est réutilisée directement. Cependant si trop d'application sont démarrées et qu'il ne reste plus assez de mémoire, le système passe alors les applications les moins utilsées en tombstoning pour libérer la mémoire.

![](http://farm3.static.flickr.com/2554/5811368676_b081651da4.jpg)

Lors de la réactivation d'une application on utilise IsApplicationInstancePreserved pour savoir si l'application était dans l'état Dormant ou non.

```csharp
// Code to execute when the application is activated (brought to foreground)
// This code will not execute when the application is first launched
private void Application_Activated(object sender, ActivatedEventArgs e)
{
  if (e.IsApplicationInstancePreserved)
  {
    ApplicationDataStatus = &quot;application instance preserved.&quot;;
    return;
  }

  // Check to see if the key for the application state data is in the State dictionary.
  if (PhoneApplicationService.Current.State.ContainsKey(&quot;ApplicationDataObject&quot;))
  {
    // If it exists, assign the data to the application member variable.
    ApplicationDataStatus = &quot;data from preserved state.&quot;;
    ApplicationDataObject = PhoneApplicationService.Current.State[&quot;ApplicationDataObject&quot;] as string;
  }
}
```

# Background Audio Agent

Il est enfin possible de d'écouter de la musique en fond ! Youpi.

Le système va utiliser l'instance de Zune pour cela et on ne pourra bien sûr avoir qu'un seul morceau lut à la fois.
Pour créer ce type d'application un template de projet a été ajouté : Windows Phone Audio Playback Agent
On va utiliser le namespace `Microsoft.Phone.BackgroundAudio` et plus exactement le singleton `BackgroundAudioPlayer.Instance` qui correspond à Zune.

On peut alors fournir un objet `AudioTrack` à cette instance puis la contrôler (play, pause, Rewind, SkipNext, SkipPrevious, Stop , FastForward) et s'abonner à son changement d'état `PlayStateChanged` pour par exemple savoir quand la piste audio se termine pour exécuter une autre action.
> Astuce : Dans l'émulateur appuyez sur F10 pour afficher le lecteur zune.

# Background Transfert

Le second background agent introduit avec Mango est le `BackgroundTransferService` qui permet comme son nom l'indique de transférer des fichiers par réseau même si l'application n'est pas en cours d'exécution. De plus il est possible de planifier les transferts, de connaitre leur progression et de gérer la file d'attente.

Toutes les API liée à cette fonctionnalité se trouve dans le namespace `Microsoft.Phone.BackgroundTransfer`:

*   BackgroundTransferEventArgs
*   BackgroundTransferRequest
*   BackgroundTransferService
*   TransferPreferences
*   TransferStatus

**A noté quelques limitations : **

*   Transferts en simultanée (téléphone): 2
*   Transferts en attente : 500 max
*   Transferts par application : 5 max
*   En Get (Téléchargement)

    *   Ne fonctionne pas en 2G/EDGE/GPRS
    *   Réseau cellulaire : 20Mo max
    *   Wifi sur batterie : 100Mo max
    *   Wifi et téléphone branché au courant : Illimité

*   Post (Téléchargement/upload)

    *   Upload : 5Mo max

Voici un exemple de code.

```csharp
BackgroundTransferRequest btr = new BackgroundTransferRequest (new Uri (serviceUploadLocationURL + localDBName,UriKind.Absolute));
 btr.TransferPreferences = TransferPreferences.AllowBattery;
btr.Method = &quot;POST&quot;;
btr.UploadLocation = new Uri(&quot;/&quot; + TransfersFiles + &quot;/&quot; + localDBName, UriKind.Relative);
btr.TransferStatusChanged += new EventHandler&lt;BackgroundTransferEventArgs&gt;(btr_UploadTransferStatusChanged);
btr.TransferProgressChanged +=  new EventHandler&lt;BackgroundTransferEventArgs&gt;(
btr_TransferProgressChanged);
Microsoft.Phone.BackgroundTransfer.BackgroundTransferService.Add(btr);
```

# ScheduledTask Agent

Pour finir avec les t'ches de fond, il est aussi possible d'écrire un bout de code à exécuter en tant que t'che planifiée.

Il existe deux types de t'ches planifiées et donc une classe héritant de `ScheduledTask` pour chacun de ces types : `PeriodicTask` et `ResourceIntensiveTask`

La différence c'est que la t'che périodique s'exécute régulièrement pendant un court instant et ne consomme peu de ressources alors que la t'che intensive elle s'exécute moins souvent mais consomme plus et plus longtemps.

**Les limitations sont les suivantes :**

*   Mémoire : 5Mo
*   Expiration : 2 semaines
*   Accès aux API restreint
*   L'utilisateur à la possibilité de les déactiver
**Périodique :**

*   Il s'exécute toutes les 30 minutes pendant 15 secondes (Attention les 30 minutes sont approximatives si deux background agent doivent se lancer à des horaires proches le téléphone va les lancer en même temps pour optimiser son temps de travail).
*   Peut ne pas être appelé ! (s'il y a trop de background agent actifs).
**Ressource intensive :**

*   Pendant 10 minutes
*   Ne s'exécute que si le téléphone est sur secteur
*   Que si le téléphone est connecté au wifi ou au PC
*   Que s'il y a au moins 90% de la batterie
*   Ne se lance que si le téléphone est au repos (aucune application lancée)
Ce qu'Il faut comprendre ici c'est que Microsoft a comme objectif d'optimiser le temps de vie de la batterie des WP7 et donc de réduire le plus possible l'utilisation intensive et inutile de ressources.

Voici un exemple de code :

**Microsoft.Phone.Scheduler.PeriodicTask**

```csharp
PeriodicTask periodicTask = new PeriodicTask(&quot;TaskUniqueNameInApp&quot;);
periodicTask.Description = &quot;My Periodic Task Description&quot;;
periodicTask.ExpirationTime = DateTime.Now.AddDays(10);
ScheduledActionService.Add(periodicTask);
```

**Microsoft.Phone.Scheduler.ResourceIntensiveTask**

```csharp
ResourceIntensiveTask intensiveTask  new ResourceIntensiveTask(&quot;TaskUniqueNameInApp &quot;);
intensiveTask.Description = &quot;My Intensive Task Description&quot;;
intensiveTask.ExpirationTime = DateTime.Now.AddDays(10);
ScheduledActionService.Add(intensiveTask)
```

Il faut ensuite créer une classe qui hérite de `ScheduledTaskAgent` et surcharger la méthode `OnInvoke` et `OnCancel`

```csharp
public class TaskScheduler : ScheduledTaskAgent
{
    protected override void OnInvoke(ScheduledTask task)
    {
        if (task is PeriodicTask)
        {        }
        else //is ResourceIntensiveTask
        {        }
NotifyComplete();
    }
 }
```

Dans le WMAppManifest.xml on retrouve l'entrée suivante :

```markup
&lt;ExtendedTask Name=&quot;BackgroundTask&quot;&gt;
&lt;BackgroundServiceAgent Specifier=&quot;ScheduledTaskAgent&quot; Name=&quot;SampleAgent&quot;Source=&quot;#AssemblyName#&quot; Type=&quot;#AssemblyName#.TaskScheduler&quot; /&gt;
&lt;/ExtendedTask&gt;
```

Alarm &amp; Reminder

Deux nouveautés les alarmes et rappel que vous pouvez intégrer dans vos applications, voici un exemple de code :

**Alarm**

```csharp
using Microsoft.Phone.Scheduler;
private void AddAlarm(object sender, RoutedEventArgs e)
{
   Alarm alarm = new Alarm('Ding dong!!!&quot;);
   alarm.BeginTime = DateTime.Now.AddSeconds(15);
   alarm.Content = 'Debout la dedans!.&quot;;
   ScheduledActionService.Add(alarm);
}
```

**rappel**

```csharp
using Microsoft.Phone.Scheduler;
private void AddReminder(object sender, RoutedEventArgs e)
{
   Reminder reminder = new Reminder(&quot;SoundMachineReminder&quot;)
	{
	BeginTime = DateTime.Now.AddSeconds(30),
	Content = &quot;N'oubliez pas que vous pouvez télécharger les musiques en local&quot;,
	Title = &quot;Sound Machine Reminder System&quot;,     	RecurrenceType = RecurrenceInterval.Yearly,     	NavigationUri = new Uri(&quot;/MainPage.xaml&quot;, UriKind.Relative)
	};
   ScheduledActionService.Add(reminder);
}
```

Tile &amp; push notification

Plusieurs nouveautés concernant les tuiles :

*   On peut les modifier localement depuis une application via la classe StandardTileData qui permet de modifier les informations de devant : title,BackgroundImage,Count mais aussi de derrriere : BackContent, BackTitle, BackBackgroundImage. Si les informations '« back '» sont fourni la tuile va pivoter a intervalle régulier.
*   On peut plusieurs tuiles pour la même application qui vont permettre de créer des raccourcie vers des pages de votre application, ces tuiles sont bien sur elle aussi personnalisable.
![](http://farm3.static.flickr.com/2031/5811556294_3a54a32e89_m.jpg)
![](http://farm3.static.flickr.com/2396/5810992111_51ae872653_m.jpg)

# SL4 &amp; XNA

Il est maintenant possible d'utiliser les ces deux technologies dans la même application.

Basé sur une application Silverlight nous pouvons basculer entre les moteurs Silverlight et XNA en utilisant la méthode `GraphicsDevice.SetSharingMode()`. Lorsque le mode sharing est activé XNA se charge du rendu et les opérations `Update` et `Draw` sont déclenchées par des évènements de `GameTimer`. Le contenu Silverlight peut alors être intégré comme une texture en utilisant un `UIElementRenderer`.

# Contacts / Calendrier

On peut maintenant accéder aux informations de l'utilisateur de façon asynchrone bien entendu et le petit plus, c'est que l'on peut aussi requêter en Linq. Retrouvez les infos complètes sur la msdn [Microsoft.Phone.UserData](http://msdn.microsoft.com/en-us/library/hh220665(v=VS.92).aspx)

Launchers / Choosers
Quelques nouvelles task ont été rajoutées pour nous simplifier la vie.

*   BingMapsTask (localisation)
*   BingMapsDirectionsTask (navigation turn-by-turn)
*   AddressChooserTask (adresse postale)
*   GameInviteTask (partage de jeux)

# Caméra

Il va maintenant être possible de créer des applications de réalité augmentée par l'utilisation de la caméra ! On dispose de deux API, une propre au téléphone PhotoCamera qui permet entre autre de gérer le flash, le focus ... et l'API WebCam de SL4 qui est compatible avec celle utilisée sur PC.

# Motion API

L'API Motion est une api combinant à la fois les données de l'accéléromètre, de la boussole et du gyroscope et qui permet après des calculs complexes de géométrique de déterminer '« l'attitude '» du téléphone. Cette API sera utile notamment pour les fameuses applications de réalité augmentée.

Voir l'utilisation [ici](http://msdn.microsoft.com/en-us/library/hh202984(v=vs.92).aspx)

# Sql Compact

Le sdk intègre maintenant une BDD SQL CE (.sdf).

La base est créée par une approche '« Code First '», autrement dit on crée un modèle par classes sur lesquelles ont rajoute des attributs comme `Table` ou `Column`. Ce modèle est ensuite utilisé au travers d'un `DataContext` sur lequel on fait des requêtes Linq, des insert/update/delete.

Vous trouverez un exemple complet [ici](http://msdn.microsoft.com/en-us/library/hh202876%28v=VS.92%29.aspx)

# Search Extensibility

Les applications mango ont maintenant la possibilité de s'enregistrer en tant qu'application susceptible de correspondre à une recherche fait directement par Bing. Une fois l'application enregistrée, si elle a un rapport avec le terme recherché, l'application pourra directement être lancée depuis le résultat de la recherche Bing. L'application va alors se lancer en prenant en compte le terme recherché.

Pour ce faire les extensions sont déclarées dans le WMAppManifest ainsi que dans un fichier supplémentaire extras.xml un fichier.
![](http://farm3.static.flickr.com/2060/5811368788_a398f9a772_o.png)

Plus d'informations [ici](http://msdn.microsoft.com/en-us/library/hh202957(v=VS.92).aspx)

# Network

Windows Phone OS 7.1 inclut de nouvelles API réseau basé sur les sockets. Les protocols TCP et UDP(unicast et multicast) sont supportés. [http://msdn.microsoft.com/en-us/library/hh202870(v=VS.92).aspx](http://msdn.microsoft.com/en-us/library/hh202870(v=VS.92).aspx)

De plus `DeviceNetworkInformation` a été complété pour faciliter l'utilisation et tester rapidement la connectivité.


<table border="0" cellspacing="0" cellpadding="0" width="610">
<tbody>
<tr>
<td width="218"><a href="http://msdn.microsoft.com/en-us/library/microsoft.phone.net.networkinformation.devicenetworkinformation.cellularmobileoperator(v=vs.92).aspx"><strong>CellularMobileOperator</strong></a><strong></strong></td>
<td width="391"><strong>Nom de   l'opérateur mobile</strong></td>
</tr>
<tr>
<td width="218"><a href="http://msdn.microsoft.com/en-us/library/microsoft.phone.net.networkinformation.devicenetworkinformation.iscellulardataenabled(v=vs.92).aspx"><strong>IsCellularDataEnabled</strong></a><strong></strong></td>
<td width="391"><strong>Indique si la connexion données est activée</strong></td>
</tr>
<tr>
<td width="218"><a href="http://msdn.microsoft.com/en-us/library/microsoft.phone.net.networkinformation.devicenetworkinformation.iscellulardataroamingenabled(v=vs.92).aspx"><strong>IsCellularDataRoamingEnabled</strong></a><strong></strong></td>
<td width="391"><strong>Indique si la connexion en données en roaming est   activée</strong></td>
</tr>
<tr>
<td width="218"><a href="http://msdn.microsoft.com/en-us/library/microsoft.phone.net.networkinformation.devicenetworkinformation.isnetworkavailable(v=vs.92).aspx"><strong>IsNetworkAvailable</strong></a><strong></strong></td>
<td width="391"><strong>Indique si du réseau est disponible</strong></td>
</tr>
<tr>
<td width="218"><a href="http://msdn.microsoft.com/en-us/library/microsoft.phone.net.networkinformation.devicenetworkinformation.iswifienabled(v=vs.92).aspx"><strong>IsWiFiEnabled</strong></a><strong></strong></td>
<td width="391"><strong>Indique si la connexion WiFi est activée</strong></td>
</tr>
<tr>
<td width="218"><a href="http://msdn.microsoft.com/en-us/library/microsoft.phone.net.networkinformation.devicenetworkinformation.networkavailabilitychanged(v=VS.92).aspx"><strong>NetworkAvailabilityChanged</strong></a><strong></strong></td>
<td width="391"><strong>Déclenché lorsque la disponibilité du reseau change.</strong></td>
</tr>
</tbody>
</table>

# Marcketplace

Il sera possible de distribuer une application beta à un ensemble de testeur (100 max) avant certification. Le processus est le suivant : le développeur fourni une liste de testeurs, il reçoit un lien deeplink qu'il transfert, les testeurs ont alors 90 jours pour renvoyer leur feedback.

Il sera aussi possible d'utiliser un service de diffusion privée toujours sur le même principe un lien sera fourni au développeur de l'application qui ne sera pas visible directement sur le marketplace. Il suffira alors de donner le lien aux différents clients.