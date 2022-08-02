---
title: 'How to ask a question about TypeScript'
publishedAt: '2022-06-24'
draft: true
excerpt: "TypeScript is a complex beast. It can be hard to find answers to difficult questions, especially if you're working on the more advanced stuff."
---

TypeScript is a complex beast. It can be hard to find answers to difficult questions, especially if you're working on the more advanced stuff. Generics, type transformations, conditional types... It can get hardcore.

When you do get stuck, a pretty normal response is to ask on Twitter. TypeScript and Twitter are a match made in heaven. Devs _love_ solving problems, and seeing an elegant solution is always awesome and mind-expanding.

However - sometimes, folks ask questions where their intention is unclear. It could be a particularly dense example, or an ocean of comments. This makes it harder for the community to help.

So I thought I'd put together the ultimate guide for **how to ask a question about TypeScript**.

## TL;DR

1. Provide a TS playground
2. Frame it as a challenge
3. Cut anything unnecessary

In other words, do what [Erik Rasmussen](https://twitter.com/erikras/status/1511015490189238273) does, with his challenge below:

```ts twoslash
type Fruit = 'Apple' | 'Banana' | 'Cherry';

type Smoothie = `${Fruit} Smoothie`;

// How can I generate this 👇 using this 👆?
type SmoothieOrder =
  | { type: 'Apple Smoothie'; quantity: number }
  | { type: 'Banana Smoothie'; quantity: number }
  | { type: 'Cherry Smoothie'; quantity: number };
```

## 1. Provide a TS playground

TypeScript has an _amazing_ tool which you can use to communicate issues you're having - the [playground](https://www.typescriptlang.org/play).

It's a fully-functioning IDE, with support for:

### External imports

It'll resolve imports from outside your app, meaning you can import anything in `npm` and the TS playground will resolve it.

```ts twoslash
import { flatMap } from 'lodash';

flatMap([]);
// ^?
```

### Type introspection

Adding a `// ^?` to a type will show a small readout of what that type is. (This is also what powers the typesafe code examples in this blog, by the way)

Adding the annotation below:

```ts
const myName = 'matt';
//    ^?
```

Results in this:

```ts twoslash
const myName = 'matt';
//    ^?
```

### Sharing links to playgrounds

To share a link to your playground, press `CMD + S` any time. This will update the URL with a `?code=<code>` param. You can now share that link anywhere, and folks will be able to see the code you've written.

Here's an [example](https://www.typescriptlang.org/play?#code/C4TwDgpgBAYgTgVwJbCgXigcgIJjAGwkygB8sAhAQwDsbLizMBhACwjjhEwChvRIoAZQC2Ae1HAWSaBgAGAEgDe8ZMAC+QsRKkRZvAPT6oACVEB3KAGMaUAJJQA5hGrtKwaJKQBnKIF4NwOI7UAheSNQOUJ4+voBiOwD8fODQIuKeEADycAAm7OhQ3FCkUIoRiQBcWLgESVqpmAA0UACOCDTAKCDl1AjCAEY5avmFxfwQ5ZhUtLSaKTr1TS3UbaCd3X1wUAMFZMNlWKzsnNPa0nPNre0rvf3cQA).

There's even an unofficial TS playground link shortener - [tsplay.dev](https://tsplay.dev/).

### Summary

**Don't**

_I've been trying to work out how to remove the index attribute from an object - here's 4 screenshots and an error message. I even added arrows!_

**Do**

_I've been trying to work out how to remove the index attribute from an object. Here's a playground showing what I mean._

## 2. Frame it as a challenge

TypeScript fanatics love flexing their muscles. Framing your
