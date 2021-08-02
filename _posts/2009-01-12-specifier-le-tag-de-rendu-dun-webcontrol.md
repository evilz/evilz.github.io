---
layout: post
title: Spécifier le tag de rendu d'un WebControl
date: 2009-01-12 20:20
author: evilz
comments: true
categories: [asp.net, Informatique]
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
