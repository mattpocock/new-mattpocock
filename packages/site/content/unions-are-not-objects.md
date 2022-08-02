---
title: "Unions: they're not objects!"
publishedAt: '2022-08-02'
excerpt: "A really common pain point among folks new to Advanced TypeScript is treating union types as if they're objects."
---

A really common pain point among folks new to Advanced TypeScript is treating union types as if they're objects. For instance:

```ts twoslash
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const size: Size = 'xs';
```

Imagine you want to create a _new_ union type out of `Size`, but with `xs` and `sm` removed. Let's try it, using `Omit`.

```ts twoslash
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// ---cut---

type SizeWithoutSmall = Omit<Size, 'xs' | 'sm'>;
//   ^?
```

This... looks a bit wrong. You'd expect that `SizeWithoutSmall` would resolve to `'md' | 'lg' | 'xl'`. Instead, it appears to be creating a new object with a bunch of attributes that usually belong on a string, like `charAt` and `charCodeAt`.

That's because `Omit` is **NOT supposed to be used like this**. `Omit` is used on _objects_, allowing you to omit certain properties from them:

```ts twoslash
const obj = {
  a: 1,
  b: 2,
};

type ObjWithoutB = Omit<typeof obj, 'b'>;
//   ^?
```

## `Exclude`/`Extract` to the rescue

`Exclude` is to unions what `Omit` is to objects. This lets us get the output we want from our first example:

```ts twoslash
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// ---cut---

type SizeWithoutSmall = Exclude<Size, 'xs' | 'sm'>;
//   ^?
```

There's also a version called `Extract`, which does the reverse from `Exclude`. It allows for extracting members of a union which match a certain pattern.

In the case below, we extract only the members which include the letter `s`.

```ts twoslash
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// ---cut---

type SizesContainingS = Extract<Size, `${string}s${string}`>;
//   ^?
```

You can also pass a union type to `Extract`, allowing you to extract only those which contain `l` or `s`:

```ts twoslash
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// ---cut---

type SizesContainingSOrL = Extract<
  //   ^?
  Size,
  `${string}s${string}` | `${string}l${string}`
>;
```

## Links

- [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys) in docs
- [`Exclude`](https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers) in docs
- [`Extract`](https://www.typescriptlang.org/docs/handbook/utility-types.html#extracttype-union) in docs
