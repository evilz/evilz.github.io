---
layout: post
title: TechDays 2011, LA PROGRAMMATION ASYNCHRONE - PART I - REACTIVE EXTENSIONS
date: 2011-02-11 08:49
author: evilz
comments: true
categories: [asynchrone, Informatique, reactive extensions, silverlight, TechDays]
feature: https://farm5.staticflickr.com/4600/24477719617_8376a0abf4_n.jpg
---

Premier jour des Techdays 2011, pour ma première session je vais assister à une présentation du Framework Reactive Extensions ou Rx créé par les DevLab Microsoft.
La session est animée par Charlotte Chavancy, Jérémy Alles développeurs chez Tallès à Grenoble et Mitsu Furuta.

Dans l'ensemble la session a été très intéressante et très bien présentée, pas a pas.

Je vais donc essayer de rester dans le même esprit pour à mon tout vous démontrer la puissance de ce framework.

Les points importants à retenir :

*   Rx est stable, donc un code de production testé et approuvé
*   Rx est disponible pour de nombreuse techno à partir du Fx 3.5 puisqu'il s'appuie sur la syntaxe Linq  :

    *   [Download Rx 1.0.2787.0 for .NET 3.5 SP1](http://download.microsoft.com/download/2/E/E/2EE80327-1E24-4B75-A212-C097734F5F53/Rx_Net35.msi)
    *   [Download Rx 1.0.2787.0 for .NET 4](http://download.microsoft.com/download/C/9/8/C98A3C48-D7A3-499A-B966-4FEAE43A2FE6/Rx_Net4.msi)
    *   [Download Rx 1.0.2787.0 for Silverlight 3](http://download.microsoft.com/download/4/A/4/4A477A70-910E-430F-B83A-53C23226CEA8/Rx_SL3.msi)
    *   [Download Rx 1.0.2787.0 for Silverlight 4](http://download.microsoft.com/download/C/7/F/C7F6E70C-49A8-47E5-8A31-C521953AD472/Rx_SL4.msi)
    *   [Download Rx 1.0.2787.0 for JavaScript](http://msdn.microsoft.com/devlabs/ff628422)
    *   [Download Rx 1.0.2787.0 for all common flavors](http://download.microsoft.com/download/4/D/C/4DC48C69-B4DC-46A2-9AF1-0C0F9758A0DA/Rx_All.msi)
    *   [Download Rx 1.0.2787.0 for XNA 4 XBOX 360](http://download.microsoft.com/download/E/0/D/E0D46929-6FC8-4865-94D0-514CBC1E5573/Rx_XNA4_XBOX360.msi)
    *   [Download Rx 1.0.2787.0 for XNA 3.1 Zune](http://download.microsoft.com/download/6/4/2/64228BDC-0A4F-4BDE-A4A2-3DCE6770CF6B/Rx_XNA31_Zune.msi)
    *   [Download Rx 1.0.2787.0 for Windows Phone 7](http://download.microsoft.com/download/1/2/4/12494C0C-7C13-4BB9-AB05-72874DC993F8/Rx_WP7.msi)

* Rx peut être installé par NuGet :  PM> Install-Package Rx-All

### Première démo :

Voici le code de base du quel nous allons partir.
Un timer est instancié est à chaque Tick on écrit la date courante dans la console.

```csharp
class Program
    {
        static void Main(string[] args)
        {
            var ts = new TimeSource();
            Console.ReadLine();
        }
    }

    public class TimeSource
    {
        public TimeSource()
        {
            timer = new Timer(new TimerCallback(Tick), null, 0, 1000);
        }

        private Timer timer;

        public void Tick(object state)
        {
            try
            {
                Console.WriteLine(DateTime.Now);
            }
            catch (Exception ex)
            {

            }
        }
    }
```

Ok ce code ne sert à rien ... c'est pas le sujet !
Nous allons maintenant le modifier pour implémenté le pattern Observable, puisque Rx repose entièrement sur ce dernier.

Avant de vous montrer le code, une petite explication du pattern s'impose.

C'est finalement assez simple, un objet de type Observer implémentant IObserver va souscrire à un objet de type Observable implémentant IObservable.

Regardons ces deux interfaces

```csharp
public interface IObservable<out T>
{
        IDisposable Subscribe(IObserver<T> observer);
}

public interface IObserver<in T>
{
        void OnCompleted();
        void OnError(Exception error);
        void OnNext(T value);
}
```

Notre objet `Observer` va s'inscrire sur l'objet observable en apellant la méthode `Subscribe()` , puis l'observable va appeler les méthodes `OnCompleted()`, `OnError()`, `OnNext()` de ses observers (oui il peut y en avoir plus d'un évidemment).

```csharp
class Program
    {
        static void Main(string[] args)
        {
            var ts = new TimeSource();
            ts.Subscribe(
                        dt => Console.WriteLine(dt.ToString()), // onNext
                        ex => Console.WriteLine(ex.Message), // onError
                        () => Console.WriteLine("C'est fini") // onCompleted
                );
            Console.ReadLine();
        }
    }

    // notre classe observable
    public class TimeSource : IObservable<DateTime> , IDisposable
    {
        // liste des observers ayant souscrit
        List<IObserver<DateTime>> observers = new List<IObserver<DateTime>>();
        int count = 0;

        public TimeSource()
        {
            timer = new Timer(new TimerCallback(Tick), null, 0, 1000);
        }

        private Timer timer;

        public void Tick(object state)
        {
            try
            {
                count++;
                foreach (var obs in observers)
                {
                    // déclenche l'action passé en paramettre pour onNext
                    obs.OnNext(DateTime.Now);

                    // si le timer à Tické 10 déclenche le onCompleted
                    if (count >= 10)
                        obs.OnCompleted();
                }
            }
            catch (Exception ex)
            {
                // en cas d'erreur on déclenche le onError
                foreach (var obs in observers)
                    obs.OnError(ex);
            }
        }

        public IDisposable Subscribe(IObserver<DateTime> observer)
        {
            // si il n'existe pas on ajout l'observer dans la collection
            if(!observers.Contains(observer))
                observers.Add(observer);
            return this;
        }

        // IObservable neccésite l'implémentation de IDisposable
        public void Dispose()
        {
            timer.Dispose();
        }
    }
```

voici le résultat

```bash
10/02/2011 12:33:32
10/02/2011 12:33:33
10/02/2011 12:33:34
10/02/2011 12:33:35
10/02/2011 12:33:36
10/02/2011 12:33:37
10/02/2011 12:33:38
10/02/2011 12:33:39
10/02/2011 12:33:40
C'est fini
```

Jusqu'ici rien de bien formidable. Patience on y va crescendo.

Revenons au principe de base, ce que l'on souhaite, c'est de faire des appels asynchrones de façon simplifiés.
Imaginons par exemple que notre application nécessite l'exécution d'une action assez longue même que l'on ne souhaite pas bloquer pour autant le thread principal.
Pour prendre un cas plus concret, lancer le téléchargement d'une image provenant de flickr sans freezer l'interface utilisateur. En winform, le backgroundWorker nous est d'une grande aide.
Cela revient à utiliser un système de callback via différents évènements.
Essayons de reproduire ce concept dans une application console via le Rx.

```csharp
 static void Main(string[] args)
        {
            // Création d'objet observable qui apelle une action de façon asynchrone
            var obsAsync = Observable.Start(() => {
                                 return findRandomFlickrImages("techdays");
                                 });

            // On souscrit à notre objet observable
            obsAsync.Subscribe(urls =>
            {
                Console.WriteLine();
                // chaque url est ecrit à la ligne dans la console
                urls.ToList()
                    .ForEach(s => Console.WriteLine(s));
            });

            // une petite boucle histoire de montrer le thread principal
            for (int i = 0; i < 10000; i++)
            {
                Console.Write(i + " ");
                // sleep pour attendre 1sec entre chaque write
                // (c'est pas beau mais éfficace :p)
                Thread.Sleep(1000);
            }

        }

        // Renvoit une liste d'url de photos flickr (méthode synchrone)
static string[] findRandomFlickrImages(string SearchTerm)
{
            var doc = XDocument.Load(String.Format(CultureInfo.InvariantCulture,
                "http://api.flickr.com/services/feeds/photos_public.gne?tags={0}&amp;amp;format=rss_200",
                HttpUtility.UrlEncode(SearchTerm)));

            if (doc.Root == null)
                return null;

            var node_name = "{http://search.yahoo.com/mrss/}thumbnail";
            return doc.Root.Descendants(node_name)
                .Select(x => x.Attributes("url").First().Value)
                .ToArray();
}
```

Une petite explication s'impose.
J'utilise ici la classe statique `Observable` qui fournit toute une collection de méthodes très intéressantes dont une utilisé ici `Start<T>(Func<T> function)`.
Cette méthode permet d'invoquer très simplement une fonction et de créer un objet `Observable<T>`.
Comme dans les exemples précédents il suffit alors de souscrire à cet objet.
La boucle for juste en dessous n'est là que pour montrer l'exécution asynchrone de l'appel.

Le résultat est le suivant :

```bash
0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23
http://farm6.static.flickr.com/5216/5430163165_934253a6fd_s.jpg
http://farm6.static.flickr.com/5291/5430698546_ca476e7c13_s.jpg
http://farm6.static.flickr.com/5211/5430709040_e22b08f4fc_s.jpg
http://farm6.static.flickr.com/5132/5430096315_ff7395634d_s.jpg
http://farm6.static.flickr.com/5060/5430094263_4f13ddf9aa_s.jpg
http://farm6.static.flickr.com/5139/5430098535_d6cb589d88_s.jpg
http://farm6.static.flickr.com/5176/5430707044_234827e644_s.jpg
http://farm6.static.flickr.com/5219/5415845508_67bf02c09f_s.jpg
http://farm6.static.flickr.com/5046/5260623309_f901b5b584_s.jpg
http://farm6.static.flickr.com/5004/5261221084_f770ff611b_s.jpg
http://farm6.static.flickr.com/5168/5261223046_2b2c730f8f_s.jpg
http://farm6.static.flickr.com/5090/5260626115_b74055a6c3_s.jpg
http://farm6.static.flickr.com/5083/5260624721_002c8c49be_s.jpg
http://farm6.static.flickr.com/5083/5260608677_df36a17e7c_s.jpg
http://farm6.static.flickr.com/5209/5260618487_a64e1190d2_s.jpg
http://farm6.static.flickr.com/5162/5261213374_abec64f27f_s.jpg
http://farm6.static.flickr.com/5166/5260619845_e309273ab6_s.jpg
http://farm6.static.flickr.com/5009/5261218048_16f0940af0_s.jpg
http://farm6.static.flickr.com/5206/5260610343_8a9c614f1d_s.jpg
http://farm6.static.flickr.com/5048/5342364163_219304361f_s.jpg
24 25 26 27 28 29 30 31 32 33 34 35 36
```

Pas mal non ?
La programmation est assez simple finalement, on commence par coder de façon synchrone puis lorsque tout fonctionne on fait appel à la classe `Observable` par exemple pour créer un `IObservable` et s'y abonner :)

Mais ce n'est pas fini ! Allons encore un peu plus loin. Rx donne la possibilité de créer des `IObservable` directement à partir d'évènement.
Voici un petit exemple de ce qu'on peut faire pour créer un système de drag&drop en Silverlight.

```csharp
private void UserControl_Loaded(object sender, RoutedEventArgs e)
{

// Créer un IObservable à partir de l'évènement MouseLeftButtonDown
Func<FrameworkElement, IObservable<IEvent<MouseButtonEventArgs>>> mouseDown = element => Observable.FromEvent<MouseButtonEventArgs>(element, "MouseLeftButtonDown");
// Créer un IObservable à partir de l'évènement MouseLeftButtonUp
Func<FrameworkElement, IObservable<IEvent<MouseButtonEventArgs>>> mouseUp = element => Observable.FromEvent<MouseButtonEventArgs>(element, "MouseLeftButtonUp");
// Créer un IObservable à partir de l'évènement MouseMove
Func<FrameworkElement, IObservable<IEvent<MouseEventArgs>>> mouseMove = element => Observable.FromEvent<MouseEventArgs>(element, "MouseMove");

// Création d'une requête linq sur l'IObservable
var draggingEventsImage = from pos in mouseMove(rectangle)
                                .SkipUntil(mouseDown(rectangle)
                                            .Do(mb => rectangle.CaptureMouse())
                                            .Do(mb => DropShadowStory1.Begin())
                                            )
                                .TakeUntil(mouseUp(rectangle)
                                            .Do(mb => DropShadowStoryReverse1.Begin())
                                                .Do(mb => rectangle.ReleaseMouseCapture())
                                            )
            .Let(mm => mm.Zip(mm.Skip(1), (prev, cur) =>
                new
                {
                    X = cur.EventArgs.GetPosition(this).X -
                        prev.EventArgs.GetPosition(this).X,
                    Y = cur.EventArgs.GetPosition(this).Y -
                        prev.EventArgs.GetPosition(this).Y
                })).Repeat()
                            select pos;

// Enfin on souscrit pour déplacer l'élément
draggingEventsImage.Subscribe(
p =>
{
Canvas.SetLeft(rectangle, Canvas.GetLeft(rectangle) + p.X);
Canvas.SetTop(rectangle, Canvas.GetTop(rectangle) + p.Y);
});

}
```

Whoua !
Expliquons quand même la requête qui semble tiré par les cheveux.

```csharp
from pos in mouseMove(rectangle)
```
Récupère un IObservable à partir de MouseMove sur le rectangle

```csharp
.SkipUntil(mouseDown(rectangle)
```
Ignore les valeur tant que le MouseLeftButtonDown n'a pas renvoyé d'info

```csharp
.Do(mb => rectangle.CaptureMouse())
```
Capture la souris pour permettre de faire fonctionner correctement le drag ..

```csharp
.Do(mb => DropShadowStory1.Begin())
```
Lance le storyboard sur le rectangle
Les deux .Do() sont executés lors du MouseLeftButtonDown

```csharp
.TakeUntil(mouseUp(rectangle)
```
Utiliser les valeurs tant que MouseLeftButtonUp n'a pas renvoyé d'infos

```csharp
.Do(mb => DropShadowStoryReverse1.Begin())
```
Lance le storyboard inverse sur le rectangle

```csharp
.Do(mb => rectangle.ReleaseMouseCapture())
```
Relache la souris, Les deux .Do() sont executés lors du MouseLeftButtonUp

```csharp
.Let(mm => mm.Zip(mm.Skip(1), (prev, cur) =>
                new
                {
                    X = cur.EventArgs.GetPosition(this).X -
                        prev.EventArgs.GetPosition(this).X,
                    Y = cur.EventArgs.GetPosition(this).Y -
                        prev.EventArgs.GetPosition(this).Y
                })).Repeat()
                            select pos;
```

Tout ce bloc permet de sélectionner le déplacement entre deux points.
La méthode Zip prend deux séquences pour les assembler en une seule, il faut donc sauter la première séquence puisque la valeur précédente n'existe pas.
Ensuite un simple calcule est effectué.

Dans le subscribe il suffit d'appliquer le déplacement et le tour est joué.

Bon je vous l'accorde ça ne sert clairement à rien, ce n'est que pour la démo. On peut arriver exactement au même résultat en ajoutant un simple `MouseDragElementBehavior` sur notre élément.
