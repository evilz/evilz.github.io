---
layout: post
title: L'autocompletion sur Windows Phone 7
date: 2011-12-19 15:54
author: evilz
comments: true
tags: [autocompletion, Informatique, windows phone, WP7]
image: https://farm5.staticflickr.com/4689/38632356444_3338e72e5d_m.jpg
---
Nous allons voir dans cet article les différentes façon de créer un système d'auto-complétion (ou l'équivalent) sur un Windows Phone 7.<!--more-->

### Méthode 1 : InputScope

Comme pour d'autres OS mobile, WP7 permet de rechercher un mot entré par un utilisateur dans un dictionnaire.
De plus via la propriété InputScope nous allons pouvoir spécifier un contexte.

Actuellement les scopes disponible sont listés dans l'énumération **InputScopeNameValue**


<amp-gist
    data-gistid="9680f8c9d04bfb6b565b548e270e769f"
    data-file="InputScopeNameValue.csv"
    layout="fixed-height"
    height="978">
</amp-gist>

Voici le XAML néccésaire pour activer cette fonctionnalité sur une textbox :

```xml
<TextBox InputScope="Text" />
```

et le résultat


<amp-img src="https://farm6.static.flickr.com/5178/5467950877_f3c8b2b347_o.png"
  width="300"
  height="551"
  layout="responsive"
  alt="sample"></amp-img>

Cette méthode est très simple et rapide à mettre en place, cependant les mots retournés, même si le contexte est précisé, ne correspondent pas forcément au besoin actuel, d'ou la seconde méthode.

### Méthode 2 : AutoCompleteBox

Le contrôle SilverLight AutoCompleteBox permet de créer un champs de saisi qui sera autocompleté en utilisant une liste que l'on va pouvoir définir, la bonne nouvelle c'est que ce controle peut être utilisé sur WP7., la mauvaise c'est qu'il est un peu buggé.

Avant de pouvoir utiliser ce controle il faut rajouter la référence vers l'assembly `System.Windows.Controls.Input`

Il ne reste plus qu'à l'inserer dans votre XAML

```xml
<toolkit:AutoCompleteBox x:Name="acbArrival" Grid.Row="1" Grid.Column="1" Text="{Binding ArrivalTown, Mode=TwoWay}"
    MinimumPopulateDelay="200"
    MinimumPrefixLength="3"
    FilterMode="StartsWith"
    ValueMemberBinding="{Binding Name}"
    ItemsSource="{ Binding TownsList}" Height="71" VerticalAlignment="Top"
    SelectionChanged="acbArrival_SelectionChanged"
    IsEnabledChanged="acbArrival_IsEnabledChanged"
>
<toolkit:AutoCompleteBox.ItemTemplate>
    <DataTemplate>
        <TextBlock Text="{Binding Name}"/>
    </DataTemplate>
</toolkit:AutoCompleteBox.ItemTemplate>
</toolkit:AutoCompleteBox>
```