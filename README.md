# Pizzaindex

An index of how many frozen pizzas are consumed where I live.

## Getting Started

Install dependencies:

``` 
npm install
```

Add a `.env` file with your Firebase config (see `example.env` for the required keys).

Start the development server:

``` 
npm run dev
```

location: `http://localhost:3000`

## Tech

- [React Router](https://reactrouter.com/) (v8, SSR) + [Vite](https://vite.dev/)
- TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/) (Firestore) for data
- [TanStack Query](https://tanstack.com/query) for data fetching/caching (`app/firebase/queries.ts`, `app/firebase/mutations.ts`)

## Admin

The admin pages are protected by a simple password - token combo using firebase rules +
cloud functions to manage the tokens + firestore TTL

### Ideas
* Pizza boxes stack and a comparison element (car, tanks, plane)
