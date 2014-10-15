---
layout: post
title: L'autocompletion sur Windows Phone 7
date: 2011-12-19 15:54
author: evilz
comments: true
categories: [autocompletion, Informatique, windows phone, WP7]
---
Nous allons voir dans cet article les différentes façon de créer un système d'auto-complétion (ou l'équivalent) sur un Windows Phone 7.<!--more-->
<h3>Méthode 1 : InputScope</h3>
Comme pour d'autres OS mobile, WP7 permet de rechercher un mot entré par un utilisateur dans un dictionnaire.
De plus via la propriété InputScope nous allons pouvoir spécifier un contexte.

Actuellement les scopes disponible sont listés dans l'énumération <strong>InputScopeNameValue</strong>
<table id="memberList" style="border: 1px solid white;" frame="lhs" cellpadding="2"><colgroup> <col width="10%" /> </colgroup>
<tbody>
<tr>
<th></th>
<th>Nom de membre</th>
<th>Description</th>
</tr>
<tr>
<td></td>
<td>Default</td>
<td>La gestion par défaut de commandes d'entrée.</td>
</tr>
<tr>
<td></td>
<td>Url</td>
<td>Le modèle d'entrée de texte pour une adresse URL (Uniform Resource Locator).</td>
</tr>
<tr>
<td></td>
<td>FullFilePath</td>
<td>Le modèle d'entrée de texte pour le chemin d'accès complet d'un fichier.</td>
</tr>
<tr>
<td></td>
<td>FileName</td>
<td>Le modèle d'entrée de texte pour un nom de fichier.</td>
</tr>
<tr>
<td></td>
<td>EmailUserName</td>
<td>Le modèle d'entrée de texte pour un nom d'utilisateur de courrier électronique.</td>
</tr>
<tr>
<td></td>
<td>EmailSmtpAddress</td>
<td>Le modèle d'entrée de texte pour une adresse de messagerie utilisant le protocole SMTP (Simple Mail Transfer Protocol).</td>
</tr>
<tr>
<td></td>
<td>LogOnName</td>
<td>Le modèle d'entrée de texte pour un nom de connexion.</td>
</tr>
<tr>
<td></td>
<td>PersonalFullName</td>
<td>Le modèle d'entrée de texte pour le nom complet d'une personne.</td>
</tr>
<tr>
<td></td>
<td>PersonalNamePrefix</td>
<td>Le modèle d'entrée de texte pour le préfixe du nom d'une personne.</td>
</tr>
<tr>
<td></td>
<td>PersonalGivenName</td>
<td>Le modèle d'entrée de texte pour le prénom d'une personne.</td>
</tr>
<tr>
<td></td>
<td>PersonalMiddleName</td>
<td>Le modèle d'entrée de texte pour le second prénom d'une personne.</td>
</tr>
<tr>
<td></td>
<td>PersonalSurname</td>
<td>Le modèle d'entrée de texte pour le nom de famille d'une personne.</td>
</tr>
<tr>
<td></td>
<td>PersonalNameSuffix</td>
<td>Le modèle d'entrée de texte pour le suffixe du nom d'une personne.</td>
</tr>
<tr>
<td></td>
<td>PostalAddress</td>
<td>Le modèle d'entrée de texte pour une adresse postale.</td>
</tr>
<tr>
<td></td>
<td>PostalCode</td>
<td>Le modèle d'entrée de texte pour un code postal.</td>
</tr>
<tr>
<td></td>
<td>AddressStreet</td>
<td>Le modèle d'entrée de texte pour une adresse de rue.</td>
</tr>
<tr>
<td></td>
<td>AddressStateOrProvince</td>
<td>Le modèle d'entrée de texte pour un état ou une province.</td>
</tr>
<tr>
<td></td>
<td>AddressCity</td>
<td>Le modèle d'entrée de texte pour une adresse de ville.</td>
</tr>
<tr>
<td></td>
<td>AddressCountryName</td>
<td>Le modèle d'entrée de texte pour le nom d'un pays.</td>
</tr>
<tr>
<td></td>
<td>AddressCountryShortName</td>
<td>Le modèle d'entrée de texte pour le nom abrégé d'un pays.</td>
</tr>
<tr>
<td></td>
<td>CurrencyAmountAndSymbol</td>
<td>Le modèle d'entrée de texte pour montant et symbole de devise.</td>
</tr>
<tr>
<td></td>
<td>CurrencyAmount</td>
<td>Le modèle d'entrée de texte pour le montant d'une devise.</td>
</tr>
<tr>
<td></td>
<td>Date</td>
<td>Le modèle d'entrée de texte pour une date de calendrier.</td>
</tr>
<tr>
<td></td>
<td>DateMonth</td>
<td>Le modèle d'entrée de texte pour le numéro du mois dans une date de calendrier.</td>
</tr>
<tr>
<td></td>
<td>DateDay</td>
<td>Le modèle d'entrée de texte pour le numéro du jour dans une date de calendrier.</td>
</tr>
<tr>
<td></td>
<td>DateYear</td>
<td>Le modèle d'entrée de texte pour l'année dans une date de calendrier.</td>
</tr>
<tr>
<td></td>
<td>DateMonthName</td>
<td>Le modèle d'entrée de texte pour le nom du mois dans une date de calendrier.</td>
</tr>
<tr>
<td></td>
<td>DateDayName</td>
<td>Le modèle d'entrée de texte pour le nom du jour dans une date de calendrier.</td>
</tr>
<tr>
<td></td>
<td>Digits</td>
<td>Le modèle d'entrée de texte pour les chiffres.</td>
</tr>
<tr>
<td></td>
<td>Number</td>
<td>Le modèle d'entrée de texte pour un nombre.</td>
</tr>
<tr>
<td></td>
<td>OneChar</td>
<td>Le modèle d'entrée de texte pour un caractère.</td>
</tr>
<tr>
<td></td>
<td>Password</td>
<td>Le modèle d'entrée de texte pour un mot de passe.</td>
</tr>
<tr>
<td></td>
<td>TelephoneNumber</td>
<td>Le modèle d'entrée de texte pour un numéro de téléphone.</td>
</tr>
<tr>
<td></td>
<td>TelephoneCountryCode</td>
<td>Le modèle d'entrée de texte pour un indicatif téléphonique de pays.</td>
</tr>
<tr>
<td></td>
<td>TelephoneAreaCode</td>
<td>Le modèle d'entrée de texte pour un indicatif téléphonique régional.</td>
</tr>
<tr>
<td></td>
<td>TelephoneLocalNumber</td>
<td>Le modèle d'entrée de texte pour un numéro de téléphone local.</td>
</tr>
<tr>
<td></td>
<td>Time</td>
<td>Le modèle d'entrée de texte pour l'heure.</td>
</tr>
<tr>
<td></td>
<td>TimeHour</td>
<td>Le modèle d'entrée de texte pour l'heure du jour.</td>
</tr>
<tr>
<td></td>
<td>TimeMinorSec</td>
<td></td>
</tr>
<tr>
<td></td>
<td>NumberFullWidth</td>
<td>Le modèle d'entrée de texte pour un nombre de largeur complète.</td>
</tr>
<tr>
<td></td>
<td>AlphanumericHalfWidth</td>
<td>Le modèle d'entrée de texte pour caractères alphanumériques à demi-chasse.</td>
</tr>
<tr>
<td></td>
<td>AlphanumericFullWidth</td>
<td>Le modèle d'entrée de texte pour caractères alphanumériques à pleine chasse.</td>
</tr>
<tr>
<td></td>
<td>CurrencyChinese</td>
<td>Le modèle d'entrée de texte pour devise chinoise.</td>
</tr>
<tr>
<td></td>
<td>Bopomofo</td>
<td>Le modèle d'entrée de texte pour le système Bopomofo de transcription phonétique du chinois mandarin.</td>
</tr>
<tr>
<td></td>
<td>Hiragana</td>
<td>Le modèle d'entrée de texte pour le système d'écriture Hiragana.</td>
</tr>
<tr>
<td></td>
<td>KatakanaHalfWidth</td>
<td>Le modèle d'entrée de texte pour caractères Katakana à demi-chasse.</td>
</tr>
<tr>
<td></td>
<td>KatakanaFullWidth</td>
<td>Le modèle d'entrée de texte pour caractères Katakana à pleine chasse.</td>
</tr>
<tr>
<td></td>
<td>Hanja</td>
<td>Le modèle d'entrée de texte pour les caractères Hanja.</td>
</tr>
<tr>
<td></td>
<td>PhraseList</td>
<td></td>
</tr>
<tr>
<td></td>
<td>RegularExpression</td>
<td>Le modèle d'entrée de texte pour une expression régulière.</td>
</tr>
<tr>
<td></td>
<td>Srgs</td>
<td>Le modèle d'entrée de texte pour la Spécification de la Grammaire de la Reconnaissance vocale (SRGS).</td>
</tr>
<tr>
<td></td>
<td>Xml</td>
<td>Le modèle d'entrée de texte pour XML.</td>
</tr>
</tbody>
</table>
Voici le XAML néccésaire pour activer cette fonctionnalité sur une textbox :
<pre class="brush: xml; gutter: true; first-line: 1; highlight: []; html-script: false">&lt;TextBox InputScope="Text" /&gt;</pre>
et le résultat
<img class="aligncenter" alt="" src="http://farm6.static.flickr.com/5178/5467950877_f3c8b2b347_o.png" width="300" height="551" />

Cette méthode est très simple et rapide à mettre en place, cependant les mots retournés, même si le contexte est précisé, ne correspondent pas forcément au besoin actuel, d'ou la seconde méthode.
<h3>Méthode 2 : AutoCompleteBox</h3>
Le contrôle SilverLight AutoCompleteBox permet de créer un champs de saisi qui sera autocompleté en utilisant une liste que l'on va pouvoir définir, la bonne nouvelle c'est que ce controle peut être utilisé sur WP7., la mauvaise c'est qu'il est un peu buggé.

Avant de pouvoir utiliser ce controle il faut rajouter la référence vers l'assembly <span style="font-family: Consolas, Monaco, 'Courier New', Courier, monospace; font-size: 12px; line-height: 18px; white-space: pre;"><strong>System.Windows.Controls.Input</strong></span>

Il ne reste plus qu'à l'inserer dans votre XAML
<pre class="brush: xml; gutter: true">&lt;toolkit:AutoCompleteBox x:Name="acbArrival" Grid.Row="1" Grid.Column="1" Text="{Binding ArrivalTown, Mode=TwoWay}"
MinimumPopulateDelay="200"
MinimumPrefixLength="3"
FilterMode="StartsWith"
ValueMemberBinding="{Binding Name}"
ItemsSource="{ Binding TownsList}" Height="71" VerticalAlignment="Top"
SelectionChanged="acbArrival_SelectionChanged"
IsEnabledChanged="acbArrival_IsEnabledChanged"
&gt;
&lt;toolkit:AutoCompleteBox.ItemTemplate&gt;
&lt;DataTemplate&gt;
&lt;TextBlock Text="{Binding Name}"/&gt;
&lt;/DataTemplate&gt;
&lt;/toolkit:AutoCompleteBox.ItemTemplate&gt;
&lt;/toolkit:AutoCompleteBox&gt;</pre>
