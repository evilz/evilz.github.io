---
layout: slides
title: Clean Code
date: 2015-07-27 06:00
author: evilz
comments: true
tag: [Craftsmanship]
reveal_transition: fade
---

# Clean Code

---

## Vincent BOURDON

<img src="https://en.gravatar.com/userimage/6985994/b1752fa9933aad9ac182787302dbf5e6.jpg?size=200" style="float:right;width:20%" alt="speaker">

<ul style="float:left;width:50%">
<li><a>Developer .Net</a> since 2001</li>
<li>Currently <a>coach craft</a> @ SOAT and SGCIB</li>
</ul>

---


## Agenda

- What is clean code ?  <!-- .element: class="fragment" -->
- Code style		<!-- .element: class="fragment" -->
- Code design		<!-- .element: class="fragment" -->
- Must read		<!-- .element: class="fragment" -->

---

<!-- .slide: data-backgsround="#e60028" -->

# What is clean code ? <!-- .element: style="color:#ffffff" -->

---

![](https://farm4.staticflickr.com/3711/19980318319_64dacbda6a_o_d.png "wtf")

---

![](https://farm1.staticflickr.com/305/19980211959_7f539fc2ed_c.jpg
 "reading-other-peoples-code")

---

<!-- .element: style="text-align:right;width: 85%;  display: block;" -->
 <a href="http://www.objectmentor.com/omTeam/feathers_m.html">Michael Feathers</a>
 <p style="font-size:0.5em">author of Working Effectively with Legacy Code</p>

> Clean code always looks like it was written by someone who cares…

---

<!-- .element: style="text-align:right;width: 85%;  display: block;" -->
<a href="https://fr.wikipedia.org/wiki/Ron_Jeffries">Ron Jeffries</a>
<p style="font-size:0.5em">author of Extreme Programming Adventures in C#</p>

> Reduced duplication, high expressiveness, and early building of, simple abstractions

---

## Clean code is

- <!-- .element: class="fragment" --> <b class="fragment highlight-red">Readable</b>
- Easy to enhance		<!-- .element: class="fragment" -->
- Testable		<!-- .element: class="fragment" -->
- Written by someone who cares !	<!-- .element: class="fragment" -->

---

## Why is readability important ?

- We spend <b class="fragment highlight-red">80 percent of time</b> reading code
<br/>
<br/>
- So, **readability**:
	- Save your time
	- Improve maintenance
	- Increase extensibility

---

# Code style
<a>My Co De iS so AWsoME ! DoNT yoU ThINk ?</a>

---

## Naming

---

## Use Intention-revealing Names

<p class="ko left">Bad code</p>
```cs
int d; // elapsed time in days
```

<p class="fragment ok left" data-fragment-index="1">Clean code</p>
<pre class="fragment" data-fragment-index="1">
<code>int elapsedTimeInDays;
int daysSinceCreation;
int daysSinceModification;
int fileAgeInDays;
</code></pre>

Note:Name “d” could mean anything. The author used comment to reveal his intentions, instead of including it in code. Name “faid” could be mistaken for identity (ID).

---

## Use intention-revealing names

<p class="ko left">Bad code</p>
```cs
public List<int[]> GetData() {
	List<int[]> list1 = new List<int[]>();
	foreach (var data in theList){
		if (x[0] == 4)
			list1.add(x);
	}
	return list1;
}
```


<p class="fragment ok left" data-fragment-index="1">Clean code</p>
<pre class="fragment" data-fragment-index="1">
<code>
public List&lt;Cell> GetFlaggedCells() {
	List&lt;Cell> flaggedCells = new List&lt;Cell>();
	foreach (var cell in gameBoard){
		if (cell.isFlagged())
			flaggedCells.add(cell);
	}
	return flaggedCells;
}</code></pre>


---

## Avoid Disinformation and Encoding
#### Member Prefixes or suffixes (Hungarian Notation)

<p class="ko left">Bad code</p>
```cs
Customer[] customerList;
Customer[] arrcustomer;
Table theTable;
```


<p class="fragment ok left" data-fragment-index="1">Clean code</p>
<pre class="fragment" data-fragment-index="1">
<code>Customer[] customers;
Table customers;
</code></pre>

<pre class="fragment" data-fragment-index="2">
<code>var customers;
</code></pre>

Note:Variable “customerList” is not actually a list. It is a normal array (or just a collection of customers). In the second case, “theTable” is an object with a type “Table” (which you can easily check when using IDE), and the word “the” is just an unnecessary noise.
- You must avoid leaving false clues that obscure the meaning of code. For example using words whose entrenched meaning vary from our intended meaning, such as using hp for the concept of a hypotenuse, because “hp” is a well-entrenched name (of a Unix platform).
- As another example, do not use accountList unless it is actually a Java List. Use something else instead, such as accountGroup.
- Avoid using names that vary only in small ways.
- Spelling similar concepts in similar ways is good – it is informative. Using inconsistent spelling, however, is disinformation.
- It is very helpful if names for very similar things sort together alphabetically, and if the differences are very obvious.

---

## Good names length

<p class="ko left">Bad code</p>
```cs
var theCustomersListWithAllCustomersIncludedWithoutFilter;
var ordered;
```

<p class="fragment ok left" data-fragment-index="1">Clean code</p>
<pre class="fragment" data-fragment-index="1">
<code>var allCustomers;
var customersInOrder;
</code></pre>

Note: A good name contains as many words as are needed to express a concept. But nothing more. Any unnecessary words make the name longer and harder to understand. Short names are good only when they describe the whole concept in the current context (it is better to say “customersInOrder” than “list” in a context of making an order).

---

## Use pronounceable & searchable names

<p class="ko left">Bad code</p>
```cs
public class DtaRcrd102 {
	private Date genymdhms;
	private Date modymdhms;
	private const String pszqint = "102";
/* ... */
}
```

<p class="fragment ok left" data-fragment-index="1">Clean code</p>
<pre class="fragment" data-fragment-index="1">
<code>public class Customer {
	private Date generationTimestamp;
	private Date modificationTimestamp;
	private const String recordId = "102";
/* ... */
};
</code></pre>

Note: Our minds have evolved to deal with spoken language, so take advantage of that when creating names.
Also, if you can’t pronounce it, you can’t discuss it without sounding like an idiot.
Names should be easy to locate across a body of text.
The length of a name should correspond to the size of its scope.
If a variable or constant might be seen or used in multiple places in a body of code, it is imperative to give it a search-friendly name.
Single-letter names should ONLY be used as local variables inside short methods.


---

## No magical number or string

<p class="ko left">Bad code</p>
```cs
public class UserValidator {
    public void SetPassword(string password) {
         if (password.length() > 7) {
              throw new InvalidArgumentException("password");
         }
    }
}
```

<p class="fragment ok left" data-fragment-index="1">Clean code</p>
<pre class="fragment" data-fragment-index="1">
<code>public class UserValidator {
    public const int MAX_PASSWORD_SIZE = 7;

    public void SetPassword(string password) {
         if (password.length() > MAX_PASSWORD_SIZE) {
              throw new InvalidArgumentException("password");
         }
    }
}
</code></pre>

Note: Extract magical value in const with meaningful name

---

## Avoid Mental Mapping

<p class="ko left">Bad code</p>
```cs
for (var x = 0; x < 10; x++)
	for (var y = 0; y < 10; y++)
```

<p class="fragment ok left" data-fragment-index="1">Clean code</p>
<pre class="fragment" data-fragment-index="1">
<code>for (var rowIndex = 0; rowIndex < 10; rowIndex++)
	for (var columnIndex = 0; columnIndex < 10; columnIndex++)
</code></pre>

---

## Use Noun and Verb Phrases

- A <a>class</a> name should have a <a>noun</a> or noun phrase
- A <a>method</a> name should have a <a>verb</a> or a verb phrase
- Pick <a>One Word per Concept</a> and avoid using the same word for two purposes

- Try to avoid naming classes with prefixes/suffixes like `Service`, `Factory`, `Processor`, `Data`, `Info`.

---

## Use Noun and Verb Phrases

<p class="ko left">Bad code</p>
```cs
public class DataManager {
	public int UsefullData(int i){}
}
```

<p class="fragment ok left" data-fragment-index="1">Clean code</p>
<pre class="fragment" data-fragment-index="1">
<code>public class BinaryReader {
	public int GetBinaryRawDataById(int id){}
}
</code></pre>

Note: Pick One Word per Concept : For instance, it's confusing to have fetch, retrieve and get as equivalent methods of the
different classes.
Use names from Solution and Problem domain name
Don"t use names that are out of context and are not from that specific domain. It is more natural for someone that works in automotive industry to use "engine" and not "power source". You should use the specific domain names and not developers naming, that can be wrong.
This can be a cause of misunderstanding between clients and developers.

---

## Formating


<img src="https://farm1.staticflickr.com/407/20158756412_7bb7dfae9b_z.jpg" style="float:right;width:40%">

<div style="float:left;width:50%">
<h4>The newspaper metaphor</h4>
<ul >
<li><a>Order</a> body of class</li>
<li>Use <a>indent</a>ation</li>
<li>Use of blank lines to <a>separate concepts</a></li>
</ul>
</div>


Note:
The Newspaper Metaphor : high-level -> details
each blank line is a visual cue
that identifies a new and separate concept

---

## Class body order

Not so simple, StyleCop comes with many rules : SA1201, SA1202, SA1203, SA1204

But

<a>Variables</a> should be declared as close to their usage as possible.

<a>Instance variables</a> should be declared at the top of the class

---

# Comment

---

<!-- .element: style="text-align:right;width: 85%;  display: block;" -->
 <a href="">Brian W. Kernighan</a>
 <p style="font-size:0.5em">The Elements of Programming Style</p>

> Don’t comment bad code—rewrite it.

---

## Express your intention

<p class="ko left">Bad code</p>
```cs
// if score is more than thirty, check if is deuce
if(player1.Score >= 3 and player2.Score >=3 && player1.Score == player2.Score){
  /// some code
}
```

<p class="fragment ok left" data-fragment-index="1">Clean code</p>
<pre class="fragment" data-fragment-index="1">
<code>if(IsUpperThirty && IsEquality){
  /// some code
}
</code></pre>

<pre class="fragment" data-fragment-index="2">
<code>if(IsDeuce){
  /// some code
}
</code></pre>

---

## Do not write redundant comments

<p class="ko left">Bad code</p>
```cs
var customers = GetAllCustomer(); // get all the customers
```

<p class="fragment ok left" data-fragment-index="1">Clean code</p>
<pre class="fragment" data-fragment-index="1">
<code>var customers = GetAllCustomer();
</code></pre>

---

## TODO comments

- Avoid TODO, just do it !
- If you can't, create a task in <a>backlog</a>

> Tips : use Resharper TODO feature to organize them

---

## Commented-Out Code

Remove commented code !

<p class="ko left">Bad code</p>
```cs
//private T GetData<T>(string methodName, Dictionary<string, string> criterias) where T : RootObject
//{
//    string url = methodName;
//    if (criterias.Any()) url += "?";
//    foreach (var criteria in criterias)
//    {
//    }
//    url = url.Remove(url.Length - 1);
//    using (var client = new HttpClient())
//    {
//       
//    }
//}
```

<p class="fragment ok left" data-fragment-index="1">Clean code</p>
<pre class="fragment" data-fragment-index="1">
<code>

</code></pre>

---

## Api documentation

<img src="https://farm1.staticflickr.com/424/19980211509_2672809a8b_o.png" style="float:right;width:40%" alt="swagger doc">

<ul style="float:left;width:50%">
<li>Add <a>documentation</a> comments only on <a>public API</a></li>
<li>And only if a documentation is generated and <a>usefull</a></li>
</ul>

---


## Conclusion

- Check that you code is <a>meaningful</a> for everyone
- <a>Use tool</a> to check rules style and violation (Resharper, stylecop, roslyn, ndepend ...)
- <a>Share</a> rules with all team's members, do not apply your style !

---

# Code Design ?

---

## Object oriented programming

> OOP is a programming paradigm based on the concept of "objects", which are data structures that contain data, in the form of fields

<p class="right"><a href="https://fr.wikipedia.org/wiki/Ron_Jeffries">Wikipedia</a></p>

---

## Encapsulation

- Kind of <a>abstraction</a> for classes
- Implementation hiding
- <a>Protection of invariants</a>

Note: 
an invariant is a condition that can be relied upon to be true during execution of a program

pre and post condition -> invalid state must be impossible


---

## Design by contract

<a>Invalid state must be impossible</a>

- Can use <a>Code Contracts</a> or a <a>guard</a> in runtime
- But can simply use good <a>types design</a>
- <a>Avoid Null</a> ! try use <a>Maybe</a> monad

---

## Can I ?

<p class="ko left">Bad code (Not thread safe)</p>
```cs
public bool CanLoad(string id){ }
public Deal Load(string id) {}

// client
if(dealService.CanLoad("foo"))
	dealService.Load("foo");
```

---

## Try ?

<p class="ko left">Bad code (Not fluent api)</p>
```cs
public bool TryLoad(string id, out deal result){ }

// client
Deal deal = null;
bool exists = dealService.TryLoad("foo", out deal);
```

---

## <a>Maybe</a> monad !
<p class="ok left">Thread safe & fluent (simple maybe)</p>
```cs
public Maybe<Deal> Load(string id)

// client
var deal = dealService.Load("foo").DefaultIfEmpty(myDefaultDeal).Single();

dealService.Load("foo").Any();
```


---

## Composition vs inheritance

- Violation of <a>liskov substitution principle</a> means it's better to use <a>composition</a>

- Do not inherit from last child in hierarchy. Try <a>implement</a> base or <a>interfaces</a>

- If you want to <a>inherit from multiple</a> concret classes, that means you need <a>composition and</a> maybe need to <a>implement parent interfaces</a>

---

## Law of Demeter

A method <a>M</a> of an object <a>O</a> may only invoke the methods of the following kinds of objects:

- <a>O</a> itself
- <a>M</a>'s parameters
- Any objects created/instantiated within <a>M</a>
- <a>O</a>'s direct component objects
- A global variable, accessible by <a>O</a>, in the scope of <a>M</a>

---

## Command Query Separation

> The fundamental idea is that we should divide an object's methods into two sharply separated categories: `command` and `query`

<div style="text-align:right;width: 85%;">
 <span style="font-size:0.5em">uncle Bob</span><br/>
<a href="http://martinfowler.com/bliki/CommandQuerySeparation.html">Martin Fowler</a></div>

---

### What's in common ?

```
void Save(Deal deal);

void Send(T message);

void Associate(IFoo foo, Bar bar);
```

<p class="fragment">All methods return <a>`void`</a> !</p>

---

## Command

<a>Change the state</a> of a system but <a>do not return a value</a>.

---

### What's in common ?

```
Deal[] getDeals(int userId);

IFoo Map(Bar bar);

T Create();
```

<p class="fragment">All methods return <a>something</a> !</p>

---

## Query

<a>Return a result</a> and <a>do not change the observable state</a> of the system (are free of side effects).

Note: It safe to invoke a query, if nothing change you must get back the same result next time

---

## Design Patterns


> a design pattern is a general reusable solution to a commonly occurring problem

<p style="text-align:right;width: 85%;"><a href="https://en.wikipedia.org/wiki/Software_design_pattern">Wikipedia</a></p>

---

## Design Patterns

There are three basic kinds of design patterns:

- Creational
- Structural
- Behavioral

---

## Creational patterns

Provide instantiation mechanisms, making it easier to create objects in a way that suits the situation.

<a>Abstract Factory</a>, <a>Builder</a>, <a>Factory Method</a>, <a>Prototype</a>, <a>Singleton</a>

---

## Structural patterns

Generally deal with relationships between entities, making it easier for these entities to work together.

<a href="/net/adapter-design-pattern">Adapter</a>, <a href="/net/bridge-design-pattern">Bridge</a>, <a href="/net/composite-design-pattern">Composite</a>, <a href="/net/decorator-design-pattern">Decorator</a>, <a href="/net/facade-design-pattern">Facade</a>, <a href="/net/flyweight-design-pattern">Flyweight</a>, <a href="/net/proxy-design-pattern">Proxy</a>

---

## Behavioral patterns

Are used in communications between entities and make it easier and more flexible for these entities to communicate.

<a href="/net/chain-of-responsibility-design-pattern">Chain of Resp.</a>, <a href="/net/command-design-pattern">Command</a>, <a href="/net/interpreter-design-pattern">Interpreter</a>, <a href="/net/iterator-design-pattern">Iterator</a>, <a href="/net/mediator-design-pattern">Mediator</a>, <a href="/net/memento-design-pattern">Memento</a>, <a href="/net/observer-design-pattern">Observer</a>, <a href="/net/state-design-pattern">State</a>, <a href="/net/strategy-design-pattern">Strategy</a>, <a href="/net/template-method-design-pattern">Template Method</a>, <a href="/net/visitor-design-pattern">Visitor</a>

---

## Design Patterns

- <a>Patterns</a> are concepts
- Implementation depends of frameworks and platforms. They are sometime already <a>parts of language</a>

---

## SOLID code
<a>Don't be STUPID: GRASP SOLID!</a>

---

| SOLID principles  | STUPID principles |
|-------------------|-------------------|
| <a>S</a>ingle Responsibility	 | <a>S</a>ingleton 				|
| <a>O</a>pen/Closed			 | <a>T</a>ight coupling			|
| <a>L</a>iskov Substitution	 | <a>U</a>ntestability				|
| <a>I</a>nterface Segregation	 | <a>P</a>remature Optimization	|
| <a>D</a>ependency Inversion	 | <a>I</a>ndescriptive Naming		|
| .| <a>D</a>uplication 				|

---

### Single Responsibility

There should never be more than <a>one reason</a> for a class to change

Each time a class is modified the risk of introducing bugs grows.
By concentrating on a single responsibility, this risk is limited

Note:
- Do one thing, and do it well
- Design your classes so that each has a single purpose
- Each class should not have only one method but all of the members in the class should be related to the class's primary function
- Where a class has multiple responsibilities, these should be separated into new classes
- When a class has multiple responsibilities, the likelihood that it will need to be changed increases


---

### Metrics and indicators

- Number of methods
- Lines of code
- Lack of Cohesion of Methods

Note:
 <a>LCOM4=1</a> indicates a cohesive class, which is the <a>"good"</a> class.
 <a>LCOM4>=2</a> indicates a problem. The class <a>should be split</a> into so many smaller classes.
 <a>LCOM4=0</a> happens when there are <a>no methods</a> in a class. This is also a <a>"bad"</a> class.

---

### What are the responsabilities of this code ?

```
public string Save(int id, Deal deal)
{
    Logger.Info("Saving deal "+ deal.Id);
    var path = Path.Combine(Username, id + ".json");
    File.WriteAllText(path, JsonConvert.SerializeObject(deal));
    var savedDeal = ImmutableInterlocked.AddOrUpdate(ref cache, id, deal, (i, d) => deal );
    Logger.Info("Saved deal " + savedDeal.Id );
    return path;
}
```


---

### What are the responsabilities of this code ?

- Logging		<!-- .element: class="fragment" -->
- Serialization		<!-- .element: class="fragment" -->
- Storage		<!-- .element: class="fragment" -->
- Caching		<!-- .element: class="fragment" -->
- Orchestration <!-- .element: class="fragment" -->

---

### What to do ?

<div class="fragment">
Move each responsability in <a>separated class</a>.
<img src="https://farm1.staticflickr.com/275/20459517785_9291130b26_o_d.png">
</div>

---

### Open/Closed principle

<a>Open</a> for <a>extensibility</a>

<a>Closed</a> for <a>modification</a>

> bug fix is OK

---

### How ?

- Using <a>Inheritance</a>
	- but needs many <a>virtual members</a> :(

- Some <a>design patterns</a> can help:
	- Strategy
	- Composite
	- Decorator
	- Factory Method

---

### Liskov Substitution

Subtypes must be substituable for their base type

If <a>S</a> is a <a>subtype</a> of <a>T</a>, then objects of <a>type T</a> may be replaced with objects of type <a>S</a> without altering the correctness of the system.

---

the <a>`NotSupportedException`</a> is a typical violation !

---

<!-- .slide: data-background="https://farm4.staticflickr.com/3789/20384994031_88f8d16e37_o_d.png" data-background-size="50%" -->

---

The Type testing or <a>downcasts</a> is a typical violation

<p class="ko left">Bad code</p>
```cs
if(!storage is SQLDealStorage)
{
	filename = storage.GetFilename();
}
```

---

### Liskov Substitution

#### Solution
<a>Split</a> and <a>extract</a> behaviors in new interfaces

---

### Interface Segregation

No client should be forced to depend on methods it does not use !

ISP <a>splits</a> interfaces which are very large into smaller and more specific ones

<a class="fragment">This resolve the Liskov Substitution violations in interface top level.</a>

---

### Interface Segregation

Do not refer on method name, look at the signature.

<p class="ko left">Bad code</p>
```cs
public class A {
	public Deal Get(string Id){}
}

public class B {
	public Deal Load(string Id) {}
}
```

<p class="fragment ok left" data-fragment-index="1">Clean code (Maybe)</p>
<pre class="fragment" data-fragment-index="1">
<code>
public interface IDealLoader {
	Deal Load(string id)
}
public class A : ILoader {
	public Deal Load(string Id){}
}

public class B : ILoader {
	public Deal Load(string Id) {}
}
</code></pre>

---

### Interface Segregation

Best segregation is <a>one method by interface</a>.

And then it's become <a>functional programming</a>

```cs
public interface IDealLoader {
	Deal Load(string id)
}

Func<string, Deal> Load = // code 

```

---

### Dependency Inversion

- High-level modules should not depend on low-level modules. Both should depend on <a>abstractions</a>.

- Abstractions should not depend on details. Details should depend on abstractions.

---

### What's a dependency ?

A component use to run another component.

---

### How ?

To make Dependency Inversion we use <a>Dependency Injection</a>.

<a>Dependency Injection</a> is based on <a>abstraction</a>. So we need to used Interface or base class.

---

### How do we make dependency injection ?

Give the needed component in a method :

- <a>Constructor</a> : used when the denpendency is <a>required many times</a>

- <a>Specific method</a> : used when the dependency is only used here or implementation can change on each call

- <a>A setter</a> : Used when denpendency needs to change during lifecycle

---


<p class="ko left">Bad code (Tight coupling)</p>
```cs
public class DealService{
	FileDealStorage _storage = new FileDealStorage()
}
```

DealService must not depends on FileDealStorage detail !

---

<p class="ko left">Bad code (Tight coupling)</p>
```cs
public class DealService{
	IDealStorage _storage = new FileDealStorage()
}
```

A little better but try to avoid the <a>new</a> keyword.

---

<p class="ko left">Bad code (Singleton coupling)</p>
```cs
public class DealService{
	public void Save(Deal){
    	FileDealStorage.Instance.Save(Deal);
    }
}
```

Serious ???

---

<p class="ok left">Good code</p>
```cs
public class DealService{
	IDealStorage _storage;

	public DealService(IDealStorage storage){
    	_storage = storage;
    }
}
```

<a>DealService</a> now depends on abstraction <a>IDealStorage</a> and detail is set at runtime.

---

## IOC vs DI

usually <a>Inversion Of Control</a> used to talk about frameworks used to help making some <a>Dependency Injection</a>.
Unity, MEF, simpleinjector ...

Remember <a>IOC</a> is good but <a>serviceLocator</a> is not !


---


## <a>DRY</a> not <a>CPDD</a>

Don't repeat yourself !

Stop Copy/Paste Driven Design !

---

## YAGNI, KISS

Do you really need this ?

Please keep it <a>simple</a> first and use <a>TDD</a> to be sure.

---

#  Must read

<img style="height:200px" src="http://www.growing-object-oriented-software.com/cover.jpg" />
<img style="height:200px" src="http://ecx.images-amazon.com/images/I/51oXyW8WQwL._SX387_BO1,204,203,200_.jpg" />
<img style="height:200px" src="http://ecx.images-amazon.com/images/I/515omKbeNTL._SX352_BO1,204,203,200_.jpg" />
<img style="height:200px" src="http://ecx.images-amazon.com/images/I/21sJ39r6k5L.jpg" />
<img style="height:200px" src="http://ecx.images-amazon.com/images/I/51H6SHy6g2L._SX374_BO1,204,203,200_.jpg" />
<img style="height:200px" src="http://ecx.images-amazon.com/images/I/81EjDm%2BYl8L.jpg" />

---

# Thank You