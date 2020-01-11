# sapper-starter

A starter project for Sapper and Svelte based Single Page Applications (SPA)

## Getting started

### Using `degit`

[`degit`](https://github.com/Rich-Harris/degit) is a scaffolding tool that lets you create a directory from a branch in a repository.

```bash
npx degit bitbucket.org/spinspire/sapper-starter my-app
```

### Running

```bash
cd my-app
# if you prefer yarn
yarn install
# OR if you prefer npm
npm install

#RUN dev
npm run dev
```

### Adding pages and routes

Create `*.svelte` files in `src/routes` to create new HTML pages with a main Svelte component. You can added a `preload` function in `<script context=module>` script tags to fetch any data before the page component is mounted.

Create `*.json.js` files in `src/routes` to create new JSON/REST routes with exported `get`, `post`, `put`, `patch`, `del` functions to handle GET, POST, PUT, PATCH, and DELETE HTTP request methods.