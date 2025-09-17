Утилиты (Utility Types) в TypeScript — это встроенные обобщённые типы, которые помогают трансформировать и переиспользовать существующие типы. Они избавляют от необходимости писать повторяющийся код и делают работу с типами более гибкой и безопасной.  

---

### Наиболее часто используемые утилиты:

#### 1. Partial<T>  
Все свойства становятся **необязательными**.  

```ts
interface Person {  
  name: string;  
  age: number;  
}  

const partialPerson: Partial<Person> = {  
  name: 'John',  
};
```

---

#### 2. Required<T>  
Все свойства становятся **обязательными**.  

```ts
interface Person {  
  name?: string;  
  age?: number;  
}  

const requiredPerson: Required<Person> = {  
  name: 'John',  
  age: 25,  
};
```

---

#### 3. Readonly<T>  
Делает все свойства только для чтения.  

```ts
interface Person {  
  name: string;  
  age: number;  
}  

const readonlyPerson: Readonly<Person> = {  
  name: 'John',  
  age: 25,  
};  

readonlyPerson.name = 'Jane'; // ❌ Ошибка  
```

---

#### 4. Record<K, T>  
Создаёт объект, где ключи имеют тип K, а значения — тип T.  

```ts
const fruits: Record<string, number> = {  
  apple: 5,  
  banana: 3,  
};
```

---

#### 5. Pick<T, K>  
Выбирает только указанные свойства из типа.  

```ts
interface Person {  
  name: string;  
  age: number;  
  email: string;  
}  

const pickedPerson: Pick<Person, 'name' | 'email'> = {  
  name: 'John',  
  email: 'john@example.com',  
};
```

---

#### 6. Omit<T, K>  
Противоположность Pick — убирает выбранные свойства.  

```ts
type PersonWithoutEmail = Omit<Person, 'email'>;  

const person: PersonWithoutEmail = {  
  name: 'Alice',  
  age: 30,  
};
```

---

#### 7. Exclude<T, U>  
Удаляет из типа T те варианты, которые совпадают с U.  

```ts
type Status = 'success' | 'error' | 'loading';  
type WithoutLoading = Exclude<Status, 'loading'>;  
// → 'success' | 'error'
```

---

#### 8. Extract<T, U>  
Оставляет только пересечения типов T и U.  

```ts
type Status = 'success' | 'error' | 'loading';  
type OnlyLoading = Extract<Status, 'loading'>;  
// → 'loading'
```

---

#### 9. NonNullable<T>  
Убирает null и undefined из типа.  

```ts
type MaybeString = string | null | undefined;  
type StrictString = NonNullable<MaybeString>;  
// → string
```

---

#### 10. ReturnType<T> и Parameters<T>  
- **ReturnType<T>** — определяет тип возвращаемого значения функции.  
- **Parameters<T>** — массив типов параметров функции.  

```ts
function sum(a: number, b: number) {  
  return a + b;  
}  

type SumReturn = ReturnType<typeof sum>; // number  
type SumParams = Parameters<typeof sum>; // [number, number]  
```

---

### На собеседовании
- Эти утилиты часто встречаются в реальных проектах (особенно в React + Redux).  
- Знание **Pick, Omit, Partial** может показать, что ты умеешь писать переиспользуемые и гибкие типы.  
- Умение объяснить разницу между Exclude и Extract — плюс к пониманию **union-типов**.  

✅ Кратко можно сказать: *утилиты позволяют трансформировать типы без написания повторяющегося кода, повышают читаемость и типобезопасность*.
