# react-dynamic-mfe

This app is a simple example of how to create a dynamic micro frontend architecture using React and Webpack Module Federation.

It contains 3 different frontends:

- `consumer`: The main app that consumes the other frontends.
- `producer-a`: A simple frontend that exports a component `module-a`.
- `producer-b`: A simple frontend that exports a component `module-b`.

## How to run

1. Install dependencies in each app folder:

```bash
npm install
```

2. build and preview the producer apps _producer-a_ and _producer-b_:

```bash
npm run build && npm run preview
```

3. build and start the _consumer_ app:

```bash
npm run dev
```

4. Open your browser at the displayed URL and you should see the consumer app consuming the producer apps.
