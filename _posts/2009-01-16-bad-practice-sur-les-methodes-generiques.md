---
layout: post
title: Bad Practice sur les méthodes génériques
date: 2009-01-16 17:39
author: evilz
comments: true
categories: [Informatique, programmation]
---
<p>Je bosse sur un projet chez un client.<br />Ici on a la facheuse tendence &agrave; rendre les choses compliqu&eacute;es, et si possible rendre le code incomprehensible ...</p><p>Voici un exemple de ce que je trouve &ecirc;tre une mauvaise pratique.</p><p>Je suppose que tout le monde utilise maintenant les g&eacute;n&eacute;riques depuis la sortie du FX 2.0.</p><p>une m&eacute;thode du genre :</p>
<pre name="code" class="c-sharp:nocontrols">
public IList&lt;T&gt; GetList&lt;T&gt;(int page,int count) where T : MaClassOuInterface
</pre>
<p>est devenu courante et est facilement compr&eacute;hensible par tous. ( Ici T va &ecirc;tre un type pr&eacute;cis&eacute; leur de l&#39;appel et doit avoir comme base &nbsp;MaClassOuInterface)</p><p>Mais rien empeche le d&eacute;veloppeur d&#39;appeller le type non pas T,mais plut&ocirc;t par un nom qui parle un peu plus. Et c&#39;est la que &ccedil;a par en coui...&nbsp;</p><p>&nbsp;</p><p>La mauvaise pratique va donner la signature suivante :</p>
<pre name="code" class="c-sharp:nocontrols">public IList&lt;MaClassOuInterface&gt; GetList&lt;MaClassOuInterface&gt;(int page,int count) where MaClassOuInterface : MaClassOuInterface</pre>
<p>&nbsp;</p><p>Et voil&agrave; maintenant on se retrouve avec &nbsp;un Type&nbsp;MaClassOuInterface qui n&#39;est que dans le m&eacute;thode, et pour la relecture on se prend vite la t&ecirc;te !</p><p>Dans la m&eacute;thode on va pourvoir acc&eacute;der aux deux types:</p>
<pre name="code" class="c-sharp:nocontrols">
MaClassOuInterface t = new&nbsp;MaClassOuInterface(); // c&#39;est le type g&eacute;n&eacute;riqueMonNameSpace.&nbsp;MaClassOuInterface t2 = new&nbsp;MonNameSpace.&nbsp;
MaClassOuInterface(); // c&#39;est le type concret, enfin d&eacute;j&agrave; existant !</pre>
<p>&nbsp;</p><p>Conclusion : nomm&eacute; le type g&eacute;n&eacute;rique T suffit emplement ! &nbsp;</p><p>&nbsp;</p>
