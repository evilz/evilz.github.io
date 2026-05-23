---
title: Formater une chaine xml
publishDate: '2005-08-10T06:00:00'
excerpt: Voici une petite astuce pour formater (indenter) votre xml et le rendre lisible.
image: /generated-covers/formater-une-chaine-xml.svg
author: evilz
tags:
- .net
- csharp
- Informatique
- XML
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
