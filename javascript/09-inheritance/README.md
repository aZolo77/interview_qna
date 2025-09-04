# Наследование

В JavaScript наследование реализуется с помощью **прототипов**.  
Прототипное наследование — это механизм, который позволяет объектам наследовать свойства и методы других объектов.  

Начиная с **ECMAScript 2015 (ES6)**, появилось ещё и ключевое слово `class`, которое предоставляет более удобный синтаксис поверх прототипов.

---

## 🔹 Прототипное наследование (через `prototype`)

- Создаётся **конструктор** (функция-класс).
- У конструктора есть свойство `prototype`.
- При создании объекта через `new`, его прототип связывается с `prototype` конструктора.
- Таким образом новые объекты наследуют методы и свойства.

Пример:
```js
    function Animal(name) {
      this.name = name;
    }

    Animal.prototype.sayHello = function() {
      console.log('Hello, my name is ' + this.name);
    };

    function Dog(name, breed) {
      Animal.call(this, name); // наследуем свойства
      this.breed = breed;
    }

    Dog.prototype = Object.create(Animal.prototype);
    Dog.prototype.constructor = Dog;

    Dog.prototype.bark = function() {
      console.log('Woof!');
    };

    const myDog = new Dog('Buddy', 'Labrador');
    myDog.sayHello(); // "Hello, my name is Buddy"
    myDog.bark();     // "Woof!"
```

---

## 🔹 Наследование через `class` (ES6)

- Используется ключевое слово `class`.
- Наследование задаётся с помощью `extends`.
- Ключевое слово `super` позволяет вызывать методы родительского класса.

Пример:
```js
    class Animal {
      constructor(name) {
        this.name = name;
      }

      sayHello() {
        console.log('Hello, my name is ' + this.name);
      }
    }

    class Dog extends Animal {
      constructor(name, breed) {
        super(name); // вызываем конструктор Animal
        this.breed = breed;
      }

      bark() {
        console.log('Woof!');
      }
    }

    const myDog = new Dog('Buddy', 'Labrador');
    myDog.sayHello(); // "Hello, my name is Buddy"
    myDog.bark();     // "Woof!"
```

---

## ⚡ Итог

- Исторически наследование реализуется через **прототипы** (`prototype`).
- С ES6 появился синтаксис `class` + `extends`, который делает код более читаемым, но под капотом всё так же работает **прототипное наследование**.
