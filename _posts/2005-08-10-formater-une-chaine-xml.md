---
layout: post
title: Formater une chaine xml
date: 2005-08-10 06:00
author: evilz
comments: true
tag: [.net, csharp, Informatique, XML]
---

Voici une petite astuce pour formater (indenter) votre xml et le rendre lisible.
Pour cela il suffit de spécifier le type de formatage souhaité dans un XmlTextWriter :)

```csharp
StringWriter sw = new StringWriter ();
XmlTextWriter xmltxt = new XmlTextWriter (sw);
xmltxt.Formatting = Formatting.Indented;
XmlDocument doc = new XmlDocument ();
doc.LoadXml (ma_string_d_origine);
xmltxt = doc.Save (xmltxt);
string my_new_string = sw.ToString ();
```
