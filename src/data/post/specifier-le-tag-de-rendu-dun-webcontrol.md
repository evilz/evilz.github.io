---
title: Spécifier le tag de rendu d'un WebControl
publishDate: '2009-01-12T20:20:00'
excerpt: Par d&eacute;faut un custom WebControl g&eacute;n&egrave;re un &eacute;l&eacute;ment Span dans le rendu html.
image: /generated-covers/specifier-le-tag-de-rendu-dun-webcontrol.svg
author: evilz
tags:
- asp.net
- Informatique
---
<p>
Par d&eacute;faut un custom WebControl g&eacute;n&egrave;re un &eacute;l&eacute;ment Span dans le rendu html.
</p>
<p>
Pour changer le type de tag il suffit &nbsp;d&#39;overrider la propri&eacute;t&eacute; TagKey.<br />
Voici un exemple:
</p>
<pre name="code" class="c-sharp">
//C#

protected override System.Web.UI.HtmlTextWriterTag TagKey
{
        get { return HtmlTextWriterTag.Div; }
}
</pre>
