---
layout: home
published: true
---

``` xml

6bis rue de la Haute Boulaye
27490 Autheuil-Authouillet
06 45 78 08 81
evilznet@gmail.com
www.evilznet.com


> J’ai plongé assez jeune dans le monde informatique et j’ai rapidement commencé à développer sur le web dans les années 1995-1996. 
Je suis maintenant Consultant Senior sur la plateforme Microsoft .net avec une bonne expérience du monde web.
Je souhaite mettre  mes compétences au service de la création de produits innovants.

## Formation


* [2005] Diplomé Bac+5 de SUPINFO
* 2004-2005 Directeur et formateur au laboratoire .net à SUPINFO.
* 2003-2004 Membre fondateur du laboratoire .net de Supinfo (www.labo-dotnet.com) et formateur au laboratoire des.net à SUPINFO.
* 2000 Membre du laboratoire Microsoft de Supinfo (www.labo-microsoft.org)
* 2000 Bac Sciences et Technologies Industrielles - Mention bien


#### Title 3

``` xml
<ListBox x:Name="Products" />
``` 

``` csharp
public BindableCollection<ProductViewModel> Products
{
    get; private set; 
}

public ProductViewModel SelectedProduct
{
    get { return _selectedProduct; }
    set
    {
        _selectedProduct = value;
        NotifyOfPropertyChange(() => SelectedProduct);
    }
}
```

even at design time!

#### Title 4

``` xml
<StackPanel>
    <TextBox x:Name="Username" />
    <PasswordBox x:Name="Password" />
    <Button x:Name="Login" Content="Log in" />
</StackPanel>
```

``` csharp
public bool CanLogin(string username, string password)
{
    return !String.IsNullOrEmpty(username) && !String.IsNullOrEmpty(password);
}

public string Login(string username, string password)
{
    ...
}
```

## Who's Behind It
The core contributors to Caliburn.Micro are:

 - [Vincent Bourdon][evilz] - Project coordinator .


As is with any open source project there are many other contributors, you can see a full list on the [GitHub][contributors]. Apologies if your name was lost during the move between version control systems.


[![Marker Metro](/public/images/marker-metro.png)][mm]


[nuget]: http://www.nuget.org/packages/Caliburn.Micro
[docs]: /documentation
[support]: /support
[getting-started]: /documentation/getting-started
[rob]: http://robeisenberg.com
[bs]: http://www.bluespire.com
[nigel]: http://compiledexperience.com
[mm]: http://markermetro.com
[thomas]: https://twitter.com/thomasibel
[contributors]: https://github.com/Caliburn-Micro/Caliburn.Micro/graphs/contributors
[durandal]: http://durandaljs.com/
