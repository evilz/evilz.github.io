---
layout: slides
title: Refactoring
date: 2015-11-23 09:00
author: evilz
comments: true
tag: [Craftsmanship, refactoring]
reveal_transition: fade
---

# Refactoring
## legacy code

---

## Vincent BOURDON

<img src="https://en.gravatar.com/userimage/6985994/b1752fa9933aad9ac182787302dbf5e6.jpg?size=200" style="float:right;width:20%" alt="speaker">

<ul style="float:left;width:50%">
<li><a>Developer .Net</a> since 2001</li>
<li>Currently <a>coach craft</a> @ SOAT and SGCIB</li>
</ul>

---


## Agenda

- [Introduction]()
	- What is Refactoring ?
	- Why should you refactor ?
	- When should you refactor ?
- [Legacy Code]()
 	- Bad smells
 	- Untested and untestable code

---

## Agenda

- [Refactoring moves]()
	- clean the deck
	- Extract Interface
	- Extract & Override Call
	- Extract & Override Factory Method
	- Parameterize Constructor
	- Break out method object
	- Adapt Parameter
	- Static Setter
	- Introduce Instance Delegator

- [Ref books]()

---

# Introduction

---

### What is Refactoring ?


> Refactoring is the process of changing a
software system in such a way that it does not alter the external behavior of
the code yet improves its internal structure

<div style="text-align:right;width: 85%;">
 <span style="font-size:0.5em">uncle Bob</span><br/>
<a href="http://martinfowler.com/bliki/CommandQuerySeparation.html">Martin Fowler</a></div>

---

### Refactoring is [NOT]()

- adding new feature
- performance improving
- rewriting from scratch
- breaking API (Must of the time)

---

### Why should you refactor ?

- [Code is hard to maintain]() : can you find a bug and correct it fast ?

- [Code is hard to evolve]() : can we add new feature ? If yes at wich cost ?

- [Current code is hard to understand]() : Is a newcomer can read and understand the code ?

- Your code is not [SOLID]() or [clean]()

Note: - Programs that are hard to read, are hard to modify.
- Programs that have duplicated logic, are hard to modify.
- Programs that require additional behavior requiring changing
code are hard to modify.
- Programs with complex conditional logic are hard to modify.
- Refactoring makes code more readable

---

### Refactoring will

[Make the code better]()
- Reduce duplication
- Improve comprehension and maintainability
- Reducing coupling

---

### When should you refactor ?

- If there are any [code smell]() or [pain point]()

- Before adding a new feature

- When you are fixing bug

> Anyway, Refactoring is a regular task

Note:
> The Rule of Three: The first time you do something, you just do it. The second time you do something similar, you wince at the duplication, but you do the duplicate thing anyway. The third time you do something similar, you refactor

---

### How ?


<div style="float:right;width: 275px;
	height: 300px;
	background: url(https://farm6.staticflickr.com/5664/23418832655_2f67ff4f6f_o_d.png) no-repeat;background-size: cover; background-position: center;"></div>


- Code must be [tested first](http://) !!

- If no test exists, add it first !

- Test can be :
	- Unit tests
	- Approval tests

> All tests must pass cause production code is already in place


---

### How ?

- Make baby step.
- Define your [aim]() and [limit]() (context)
- Commit frequently
- Check final result manualy or by someone else (code review)

---

### How ?

Use the good tooling :
- [Visual Studio]() (Microsoft)
- [JustCode]() (Telerik)
- [Resharper]() (Jetbrains)
- [CodeRush]() (DevExpress)
- [NCrunch]()

---

# DEMO

## Approval test with nunit and ncrunch

---

# Legacy Code

---

### Legacy Code

- Typically not design to be testable
- Hardwired dependencies (Singletons or Static code)
- Composed of many code smells

---

### Bad Smells (Code smells)

> Pieces of code that are
> wrong (in some sense) and that are ugly to see

<div style="text-align:right;width: 85%;">
<span style="font-size:0.5em">uncle Bob</span><br/>
<a href="http://martinfowler.com/bliki/CommandQuerySeparation.html">Martin Fowler</a></div>

---

## Bloaters

> Bloater smells represents something that has grown so large that it cannot be effectively handled.

---

## Bloaters

| Name | Description |
|--------|--------|
| [Long Method]() | A method contains too many lines of code. (more than 15 lines) |
| [Large Class]() | A class contains many fields/methods/lines of code |
| [Primitive Obsession]() | Use of primitives instead of small object types |
| [Long Parameter List]() | More than four/five parameters |
| [Data Clumps]() | Fields or variables that are linked, used everytimes together |

Note:
- Long Method : is it SRP ?
- Large Class Cause: is it SRP ?
- Primitive Obsession : It easy to use primitive types
- Long Parameter List : Dependency injection lead in many services that are injected
- Data Clumps : Poor structure design

---

## Object-Orientation Abusers

> Cases where the solution does not fully exploit the possibilities of object-oriented design.

---

## Object-Orientation Abusers

| Name | Description |
|--------|--------|
| [Switch Statements]() | You have a complex switch operator or sequence of if statements. |
| [Temporary Field]() | Temporary fields get their values (and thus are needed by objects) only under certain circumstances. Outside of these circumstances, they are empty. |
| [Refused Bequest]() | A class inherits from a parent, but don't need all parent member, (liskov substitution principle) |
| [Alternative Classes with Different Interfaces]() | Two classes perform identical functions but have different method names. |

Note:
- Switch Statements : must exist in factory
- Temporary Field: is it SRP ?
- Refused Bequest :
- Alternative Classes with Different Interfaces :

---

## Change Preventers

> When you need to change something in one place, you have to make many changes in other places too.

---

## Change Preventers

| Name | Description |
|--------|--------|
| [Divergent Change]() | One type is change in different ways for different reasons. |
| [Shotgun Surgery]() | A small changes force changes in different types  |
| [Parallel Inheritance Hierarchies]() | Whenever you create a subclass for a class, you find yourself needing to create a subclass for another class |

Note:

---

## Dispensables

> A dispensable is something pointless and unneeded

Note: whose absence would make the code cleaner, more efficient and easier to understand.

---

## Dispensables

| Name | Description |
|--------|--------|
| [Comments]() | A method is filled with explanatory comments  |
| [Duplicate Code]() | Two code fragments look almost identical.  |
| [Lazy Class]() | A class doesn't do enough to earn your attention |
| [Data Class]() | A class that contains only fields and getters and setters methods   |
| [Dead Code]() | Any code that is no longer used  |
| [Speculative Generality]() | Code that handle things that aren't required  |

Note:

---

## Couplers

> Excessive coupling between classes.

---

## Couplers

| Name | Description |
|--------|--------|
| [Feature Envy]() | A method accesses the data of another object more than its own data.  |
| [Inappropriate Intimacy]() | One class uses the internal fields and methods of another class.   |
| [Message Chains]() | In code you see a series of calls resembling a.b().c().d()  |
| [Middle Man]() | If a class performs only one action, delegating work to another class, why does it exist at all?  |
| [Incomplete Library Class]() | Sooner or later, libraries stop meeting user needs. |

Note:

---

# Refactoring Moves

---

### Must of the time you will move code

- [Extract method]() to reduce duplication
- [Extract class]() or [Extract Sub-class]() to implement different strategy
- [Extract Interface]() to help distinguish the operations available to the client
- [Inline]() variable, or method

---

### Step 1 : Clean the deck

- Delete commented out and unused code
- Makes the code easier to understand (explicit naming)
- Remove unused tests
- Use indication of tools like Resharper
- This is an easy step, but you still need to commit frequently

---

### Break tight couplping

Code can't be tested, so try this :

- Hyperaware Editing
- Preserve Signatures
- Single-Goal Editing
- Lean on Compiler
- Pair Programming

---

### Break tight coupling for test

These techniques are a first step to break dependencies to create a first unit test on legacy code!
It will not provide a cleanner code but a testable one

---

### How to test charge method code


```
public class TimeSheet
{
  public double Charge(Employee employee, int days)
  {
    double baseAmount = employee.Rate * days;
	return employee.HasSpecialSkill() ? baseAmount * 1.05 : baseAmount;
  }
}

public class Employee
{
  // some code

  public int Rate { get; private set; }

  public bool HasSpecialSkill()
  {
    // ...
  }
}
```

---

### How to test charge method code


```csharp
public class TimeSheetTests
{
  public void Should_increase_charge_when_employee_has_special_skill()
  {
    var emp = new Employee(100);
    /* set emp has special skill ??? */
    var result = new TimeSheet().Charge(emp,1);
    Assert.AreEqual(105,result);
  }
}
```

---

### Extract interface

1- Create an empty interface.

```
public interface IBillable
{

}
```

---

### Extract interface

2- Declare common operations in the interface.

```
public interface IBillable
{
  int Rate { get; }
  bool HasSpecialSkill();
}
```

---

### Extract interface

3- Declare the necessary classes as implementing the interface.

```
public interface IBillable
{
  int Rate { get; }
  bool HasSpecialSkill();
}

public class Employee: IBillable
{
  public int Rate { get; private set; }

  public bool HasSpecialSkill()
  {
    // ...
  }
}
```

---

4 - Change type declarations in the client code to use the new interface.

```
public class TimeSheet
{
  // ...
  public double Charge(IBillable employee, int days)
  {
    double baseAmount = employee.Rate * days;

	return employee.HasSpecialSkill() ? baseAmount * 1.05 : baseAmount;
  }
}
```

---


### How to test charge method code


```csharp
public class TimeSheetTests
{
  public void Should_increase_charge_when_employee_has_special_skill()
  {
    var emp = Substitute.For<IBillable>();
    emp.Rate.Returns(100);
    emp.HasSpecialSkill().Returns(true);

    var result = new TimeSheet().Charge(emp,1);

	Assert.AreEqual(105,result);
  }
}
```

---


### Extract & Override Call 

Fast and dirty

1. Identify the call that you want to extract. Find the declaration of its method. Copy its method signature so that you can Preserve Signatures
2. Create a new method on the current class. Give it the signature you’ve copied
3. Copy the call to the new method and replace the call with a call to the new method


TODO code sample

---

### Extract & Override Factory Method

1. Identify an object creation in a constructor
2. Extract all of the work involved in the creation intro a factory method (or property)
3. Create a testing subclass and override the factory method in it to avoid dependencies on problematic types under test


TODO code sample  

---

### Parameterize Constructor

Must of the time used with Extract Interface to lead to clean code using IOC

1. Identify the constructor that you want to parameterize and make a copy of it
2. Add a parameter to the constructor for the object whose creation you are going to replace. Remove the object creation and add an assignment from the parameter to the instance variable for the object
3. If you can call a constructor from a constructor in your language, remove the body of the old constructor and replace it with a call to the old constructor. Add a new expression to the constructor in the old constructor. If you can't call a constructor from another constructor in your language, you may have to extract any duplication among the constructors to new method



TODO code sample  

---

### Replace Method with Method Object

1. Create a new class. Name it based on the purpose of the method that you are refactoring.
2. In the new class, create a private field for storing a reference to an instance of the class in which the method was previously located
3.  In the new class, create a private field for storing a reference to an instance of the class in which the method was previously located
4.  Create a constructor that accepts all parameters of the original method and initializes the relevant private fields
5.  Declare the main method and copy the code of the original method to it, replacing the local variables with private fields
6.  Replace the body of the original method in the original class by creating a method object and calling its main method.

---


### Adapt Parameter

1. Create the new interface that you will use in the method. Make it as
simple and communicative as possible, but try not to create an
interface that will require more than trivial changes in the method
2. Create a production implementer for the new interface
3. Create a fake implementer for the interface
4. Write a simple test case, passing the fake to the method
5. Make the changes you need to in the method to use the new
parameter
6. Run your test to verify that you are able to test the method using the
fake

---

### Introduce Static Setter

1. Decrease the protection of the constructor so that you can
make a fake by subclassing the singleton.
2. Add a static setter to the singleton class. The setter should
accept a reference to the singleton class. Make sure that the
setter destroys the singleton instance properly before setting the
new object.
3. If you need access to private or protected methods in the
singleton to set it up property for testing, consider subclassing it
or extraction an interface and making the singleton hold its
instance as reference whose type is the type of the interface

---

### Introduce Instance Delegator


---



#### Extract method

<p class="left"><em>Before</em></p>
```
var path = Path.Combine(Username, id + ".json");
```

<p class="left"><em>After</em></p>
```
public string GetFileName(string id)
{
    return Path.Combine(Username, id + ".json");
}
//...
var path = GetFileName(id);

```

---

#### Extract class


Move each responsability in <a>separated class</a>.
<img src="https://farm1.staticflickr.com/275/20459517785_9291130b26_o_d.png">


---


#### Extract class to replace Data Value with Object

<p class="left"><em>Before</em></p>
```
public class Address
{
    public string ZipCode { get; set; }
}
```

<p class="left"><em>After</em></p>
```
public class Address
{
    public ZipCode ZipCode { get; set; }
}

public class ZipCode
{
    private readonly string _value;

    public ZipCode(string value)
    {
        // perform regex matching to verify XXXXX or XXXXX-XXXX format
        _value = value;
    }

    public string Value
    {
        get { return _value; }
    }
}
```

Note:
- Can Email be any text ?
- Is Email only Text value ?
- What if we need to add logic ?


---

#### C# tips for Replace Data Value with Object

<p class="left"><em>Override the ToString() method</em></p>

```
public override string ToString()
{
    return _value;
}
```

<p class="left"><em>Implement the cast operators, implicit and explicit</em></p>

```
public static implicit operator string(ZipCode zipCode)
{
    return zipCode.Value;
}

public static explicit operator ZipCode(string value)
{
    return new ZipCode(value);
}
```

---

#### Introduce Parameter Object

<p class="left"><em>Before</em></p>

```
public Person CreatePerson(
      string lastName,
      string firstName,
      string middleName,
      string salutation,
      string suffix,
      string streetAddress,
      string city,
      string state,
      bool isFemale,
      bool isEmployed,
      bool isHomeOwner)
   {
      // implementation goes here
   }
```

<p class="left"><em>After</em></p>

```
public Person CreatePerson(
      FullName fullName,
      Address address,
      bool isFemale,
      bool isEmployed,
      bool isHomeOwner)
   {
      // implementation goes here
   }
```

---

#### Replace Parameter with Method Call

<p class="left"><em>Before</em></p>

```
int basePrice = _quantity * _itemPrice;
var discountLevel = getDiscountLevel();
double finalPrice = discountedPrice (basePrice, discountLevel);
```

<p class="left"><em>After</em></p>

```
  int basePrice = _quantity * _itemPrice;
  double finalPrice = discountedPrice (basePrice);
```


---

### Refactorings

- [Extract method]() to reduce duplication
- [Extract class]()
- [Extract Interface]() to help distinguish the operations available to the client


--- 

### Conclusions

- Code Legacy is HARD!
- Refactoring is a frequente task
- but sometime need to create a dedicated technical task in backlog

---

### Books

Working effectively with legacy code
Michael C. Feathers


---

# Thank You
