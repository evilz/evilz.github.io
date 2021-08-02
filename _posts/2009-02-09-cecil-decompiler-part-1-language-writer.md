---
layout: post
title: Cecil.Decompiler Part 1 - Language Writer
date: 2009-02-09 09:29
author: evilz
comments: true
categories: [Cecil, Decompiler, Informatique]
---

# Introduction

Cet article va vous faire découvrir le projet Cecil.Decompiler sur lequel j’ai commencé à travailler au Code Camp de décembre 2008. Je vous invite à lire les posts suivants, pour en savoir plus sur ce fameux code camp.

http://evilznet.com/post/Evilznet-apres-un-CodeCamp.aspx
http://www.evain.net/blog/articles/2008/12/16/decompiler-codecamp
http://codingly.com/2008/12/16/cecildecompiler-un-decompilateur-net-opensource
http://patricelamarche.net/2009/01/03/CecilDecompilerDecompilateurNetOpenSourceBaséSurCecil.aspx

Nous allons voir le namespace `Cecil.Decompiler.Languages` et plus particulièrement le LanguageWriter.
C’est sur cette partie que j’ai travaillé durant le Code Camp avec Patrice Lamarche pour la décompilation du langage VB. Mes explications seront basées sur les classes de base que l’ont trouves dans le core de `Cecil.Decompiler` et qui ont été écrites par Jb Evain.

# Définition d’un langage

![language](https://farm5.staticflickr.com/4595/39372522761_d64f6709c2_z.jpg)
 

Tous les langages utilisés dans `Cecil.Decompiler` doivent implémenter l’interface `ILanguage`.
Un langage est défini par un nom (propriété `Name`) et deux méthodes :

- `CreatePipeline()` qui renvoie un nouveau `DecompilationPipeline`, c'est-à-dire une suite d’opérations qui s’applique sur le contexte de décompilation pour transformer son résultat. (Nous aborderons ce point dans un futur article ;))
- `GetWriter()` qui renvoie un `ILanguageWriter` (c’est le cœur de notre sujet)

Pour C#, la classe qui implémente l’interface s’appelle `CSharp`. Cette classe est directement utilisable, mais pour de futures optimisations en fonction des évolutions du langage, plusieurs classes enfants ont été créés `CSharpV1`, `CSharpV2`, `CSharpV3`. Actuellement ces quatre classes sont identiques sauf pour la propriété Name qui retourne une valeur différente.
Une énumération `CSharpVersion` est aussi présente pour lister ces différentes implémentations, cela pourra servir pour afficher très simplement toutes ces versions dans une liste déroulante de notre GUI.

# La sortie : IFormater

Le formater va définir comment seront ajouté les résultats de la décompilation dans le flux de sortie. On peut imaginer toute sorte de formater Html, XML, SilverLight …
IFormater spécifie 12 méthodes qui devront exister dans les formaters concrets.

```csharp
void Write (string str);  
void WriteLine ();  
void WriteSpace ();  
void WriteToken (string token);  
void WriteComment (string comment);  
void WriteKeyword (string keyword);  
void WriteLiteral (string literal);  
void WriteDefinition (string value, object definition);  
void WriteReference (string value, object reference);  
void WriteIdentifier (string value, object identifier);  
void Indent ();  
void Outdent ();
````

Le Core de `Cecil.decompiler` fournie une classe concrète `PlainTextFormater`.
Comme son nom l’indique c’est le formater le plus basic, il va simplement écrire le résultat sous forme de texte dans le flux désiré : une console, un fichier …
Nous allons voir comment implémenter très simplement une sortie dans une console avec de la couleur.
Pour commencer, je vais créer un nouveau projet de type librairie en C# (3.5) que je vais appeler `ColoredConsoleFormater`. Il faut ensuite ajouter la référence vers `Cecil.Decompiler`.
 
![project](https://farm5.staticflickr.com/4594/39372522991_84cac5d3a7.jpg)

Je renomme ou créé une classe `ColoredConsoleFormater.cs` qui va implémenter `IFormater`

```csharp
namespace Cecil.Decompiler.Languages
{
    public class ColoredConsoleFormater : IFormatter
    {
        #region IFormatter Members

        public void Write(string str)
        {
            throw new System.NotImplementedException();
        }

        public void WriteLine()
        {
            throw new System.NotImplementedException();
        }

        public void WriteSpace()
        {
            throw new System.NotImplementedException();
        }

        public void WriteToken(string token)
        {
            throw new System.NotImplementedException();
        }

        public void WriteComment(string comment)
        {
            throw new System.NotImplementedException();
        }
 
        public void WriteKeyword(string keyword)
        {
            throw new System.NotImplementedException();
        }

        public void WriteLiteral(string literal)
        {
            throw new System.NotImplementedException();
        }
 
        public void WriteDefinition(string value, object definition)
        {
            throw new System.NotImplementedException();
        }
 
        public void WriteReference(string value, object reference)
        {
            throw new System.NotImplementedException();
        }

        public void WriteIdentifier(string value, object identifier)
        {
            throw new System.NotImplementedException();
        }
 
        public void Indent()
        {
            throw new System.NotImplementedException();
        }

        public void Outdent()
        {
            throw new System.NotImplementedException();
        }
 
        #endregion
    }
}
```

L’idée est ici, de faire écrire chacune de ces méthodes dans une couleur différente. Par exemple les mots clés en bleu, les commentaires en vert …

Il y a 8 méthodes qui écrivent du texte, je vais donc ajouter 8 constantes de type ConsoleColor en affectant différentes couleurs de mon choix.

```csharp
private const ConsoleColor NormalColor = ConsoleColor.Gray;
private const ConsoleColor TokenColor = ConsoleColor.White;
private const ConsoleColor CommentColor = ConsoleColor.Green;
private const ConsoleColor KeywordColor = ConsoleColor.Blue;
private const ConsoleColor LiteralColor = ConsoleColor.Red;
private const ConsoleColor DefinitionColor = ConsoleColor.Cyan;
private const ConsoleColor ReferenceColor = ConsoleColor.Yellow;
private const ConsoleColor IdentifierColor = ConsoleColor.Magenta;
```

Il faut maintenant écrire dans la console en utilisant ces couleurs. Je commence par implémenter la méthode `Write(string str)` qui va simplement écrire la chaine passée en argument dans la console. Les autres méthodes pourront alors spécifier la couleur dans laquelle le texte doit être écrit, puis appeler cette méthode.

Apres l’appel, il ne faut pas oublier de remettre la console dans la couleur de base.

La méthode `WriteLine()` est un cas particulier, je fais ici appelle directement à la méthode `WriteLine()` de la console, cela garantie un bon retour à la ligne qui peut être représenté différemment en fonction des systèmes.

```csharp
public void Write(string str)
{
    Console.Write(str);
}

public void WriteLine()
{
    Console.ForegroundColor = NormalColor;
    Console.WriteLine();
}
 
public void WriteSpace()
{
    Console.ForegroundColor = NormalColor;
    Write(" ");
}
 
public void WriteToken(string token)
{
    Console.ForegroundColor = TokenColor;
    Write(token);
    Console.ForegroundColor = NormalColor;
}

public void WriteComment(string comment)
{
    Console.ForegroundColor = CommentColor;
    Write(comment);
    Console.ForegroundColor = NormalColor;
}

public void WriteKeyword(string keyword)
{
    Console.ForegroundColor = KeywordColor;
    Write(keyword);
    Console.ForegroundColor = NormalColor;
}

public void WriteLiteral(string literal)
{
    Console.ForegroundColor = LiteralColor;
    Write(literal);
    Console.ForegroundColor = NormalColor;
}

public void WriteDefinition(string value, object definition)
{
    Console.ForegroundColor = DefinitionColor;
    Write(value);
    Console.ForegroundColor = NormalColor;
}

public void WriteReference(string value, object reference)
{
    Console.ForegroundColor = ReferenceColor;
    Write(value);
    Console.ForegroundColor = NormalColor;
}

public void WriteIdentifier(string value, object identifier)
{
    Console.ForegroundColor = IdentifierColor;
    Write(value);
    Console.ForegroundColor = NormalColor;
}
```

 
![console1](https://farm5.staticflickr.com/4726/25503576108_e644361b7c_z.jpg)
 
Il reste maintenant à afficher correctement l’indentation du code en implémentant `Indent()` et `Outdent()`.
Pour cela nous allons utiliser un compteur qui stocke le nombre de tabulation courante. `Indent()` va alors incrémenter cette valeur et `Outdent()` la décrémenter.
Pour écrire les indentations nous créons une nouvelle méthode `WriteIndent()`, elle sera appelée par la méthode `Write()`. Les indentations ne devront pas être écrites plusieurs fois par ligne, il faut donc utiliser une variable de type bool pour indiquer si `WriteIndent()` doit être appelée ou non. La méthode `WriteLine()` affectera sa valeur à true alors que `Write()` l’affectera à false.

```csharp
int indent;
bool write_indent;

void WriteIndent()
{
    if (!write_indent)
        return;

    for (int i = 0; i < indent; i++)
        Console.Write("\t");
}

public void Write(string str)
{
    WriteIndent();
    Console.Write(str);
    write_indent = false;
}
 
public void WriteLine()
{
    Console.ForegroundColor = NormalColor;
    Console.WriteLine();
    write_indent = true;
}

public void Indent()
{
    indent++;
}

public void Outdent()
{
    indent--;
}
```

Il ne reste plus qu’à rajouter un constructeur par défaut qui va initialiser la couleur de la console avec la couleur de base (NormalColor)

```csharp
public ColoredConsoleFormater()
{
    Console.ForegroundColor = NormalColor;
}
```

![console2](https://farm5.staticflickr.com/4690/25503575998_06cdd2367c_z.jpg)
 
Vous vous demandez surement pourquoi les méthodes `WriteDefinition()`, `WriteReference()`, `WriteIdentifier()` prennent un argument supplémentaire qui n’est pas utilisé ici. Ce second argument pourra, par exemple, être utilisé dans notre GUI pour faire un lien lorsque l’utilisateur va cliquer sur la chaine ou même pourvoir ajouter différentes fonctionnalités en fonction de son type.

# Le writer

Le writer est la classe qui va définir la syntaxe du langage, il ne faut pas confondre avec le formater qui lui définit la sortie, c’est à dire le flux final.

Comme nous l’avons vu au dessus le writer est renvoyé par le langage et implémente l’interface ILanguageWriter.

L’implémentation nécessite l’écriture des différentes surcharges de la méthode Write(). Cette méthode sera le point d’entrée du Writer. En fonction de l’argument qui sera passé, par exemple la définition d’un type, d’une méthode ou simplement une expression, elle écrira le résultat de la décompilation correspondante dans le formater.

Avant d’implémenter directement l’interface, l’on va passer par une classe intermédiaire BaseLanguageWriter qui contient quelques méthodes facilement réutilisable dans tous les writer concrets, et un constructeur prenant en paramètre un Ilangage et un IFormater.

```csharp
public BaseLanguageWriter (ILanguage language, IFormatter formatter);
protected void WriteToken (string token);
protected void WriteSpace ();
protected void WriteLine ();
protected void WriteKeyword (string keyword);
protected void Write (string str);
protected void WriteLiteral (string literal);
protected void WriteIdentifier (string name, object identifier);
protected void WriteDefinition (string name, object definition);
protected void WriteReference (string name, object reference);
protected void Indent ();
protected void Outdent ();
```

Vous l’aurez sans doute deviné, toutes ces méthodes sont des raccourcis vers les méthodes équivalentes du IFormater que l’on à vu juste avant. De plus cette classe hérite d’une autre classe BaseCodeVisitor fournie avec l’AST de Cecil.Decompiler.

Passons maintenant à notre classe concrète que l’on appellera CSharpWriter. Nous n’allons pas voir en détail tout l’implémentation, pour cela vous pouvez télécharger les sources sur le SVN. Je vais plutôt vous expliquer le fonctionnement.

Après la décompilation, chaque petite partie de code est représentée dans un graphe d’objet (AST) par des nœuds de type ICodeNode. A partir de là, on peut donc facilement implémenter un pattern, que certain reconnaitront (car c’est le même pour Linq et ses expressions), à base d’une grosse méthode Visit() qui prend en argument un ICodeNode.

Cette méthode, qui se trouve dans la classe BaseCodeVisitor, va tout simplement lire le type réel de l’ICodeNode pour appeler une méthode plus spécifique. Ce n’est en fait qu’un gros switch.

Voici un exemple pour un bout de code pour un Statement. La méthode Write() est appelée :

```csharp
public override void Write (Statement statement)
{
    Visit (statement);
    WriteLine ();
}
```

On va alors visiter le contenu du statement. Je vais ici prendre pour exemple un statement de type if/else, je vous laisse le loisir de regarder tous les types différents de ICodeNode existants.
Le switch va identifier le type de nœud par rapport à la valeur de sa propriété CodeNodeType qui contient une valeur de l’énumération CodeNodeType :

```csharp
public enum CodeNodeType
{
    // ...
    IfStatement,
    BinaryExpression,
    // ...
}
```


```csharp
// Methode de BaseCodeVisitor
public virtual void Visit (ICodeNode node)
{
    if (null == node)
        return;
 
    switch (node.CodeNodeType) {
    // … différents case
    case CodeNodeType.IfStatement:
        VisitIfStatement ((IfStatement) node);
        break;
    // … différents case
    default:
        throw new ArgumentException ();
    }
}
```

On peut voir qu’une méthode spécifique pour ce genre de statement est à son tour appelée : VisitIfStatement() qui prend simplement le node courant casté.

```csharp
public override void VisitIfStatement (IfStatement node)
{
    WriteKeyword ("if");
    WriteSpace ();
    WriteBetweenParenthesis (node.Condition);
    WriteLine ();
 
    Visit (node.Then);
 
    if (node.Else == null)
        return;
 
    WriteKeyword ("else");
    WriteLine ();
    Visit (node.Else);
}
```

Cette méthode écrit enfin dans le flux de sortie. C’est du C#, donc on commence par écrire le mot clé if, on ajoute un espace pour la présentation (optionnel). Il faut ensuite écrire le contenu de la condition entre parenthèse, cela est fait via la méthode WriteBetweenParenthesis() qui écrit la parenthèse ouvrante, visite l’expression de la condition et écrit la parenthèse fermante.

```csharp
void WriteBetweenParenthesis (Expression expression)
{
    WriteToken ("(");
    Visit (expression);
    WriteToken (")");
}
```

Et voilà on parcourt le graph de façon récursive !
Visit() va resélectionner la bonne méthode à appeler en fonction du type de l’expression et ainsi de suite jusqu’au bout de l’arbre.

# Conclusion

Nous avons vue comment implémenter un langage comme C#. Il faut cependant savoir que le graph d’objet ne correspond par forcément toujours aux attentes du langage cible, il est donc nécessaire de faire des manipulations en amont sur le graph via le fameux pipeline. Actuellement deux langages sont traités par l’équipe, il s’agit C# et VB. Ne tient qu’à vous d’implémenter un autre langage .net.
