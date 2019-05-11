# Apm documentation project

Everything in this folder is part of the documentation project. This includes

* the web site for displaying the documentation
* the dgeni configuration for converting source files to rendered files that can be viewed in the web site.

## Developer tasks

We use `npm` to manage the dependencies and to run build tasks.
You should run all these tasks from the `apm/docs_app` folder.
Here are the most important tasks you might need to use:

* `npm install` - install all the dependencies.
* `npm run setup` - install all the dependencies and run dgeni on the docs.

* `npm run build` - create a production build of the application (after installing dependencies, etc).

* `npm start` - run a development web server that watches the files; then builds the doc-viewer and reloads the page, as necessary.
* `npm run serve-and-sync` - run both the `docs-watch` and `start` in the same console.
* `npm run lint` - check that the doc-viewer code follows our style rules.
* `npm test` - watch all the source files, for the doc-viewer, and run all the unit tests when any change.
* `npm test -- --watch=false` - run all the unit tests once.
* `npm run e2e` - run all the e2e tests for the doc-viewer.

* `npm run docs` - generate all the docs from the source files.
* `npm run docs-watch` - watch the Apm source and the docs files and run a short-circuited doc-gen for the docs that changed (don't work properly at the moment).
* `npm run docs-lint` - check that the doc gen code follows our style rules.
* `npm run docs-test` - run the unit tests for the doc generation code.

* `npm run build-ie-polyfills` - generates a js file of polyfills that can be loaded in Internet Explorer.

## Using ServiceWorker locally

Running `npm run start` (even when explicitly targeting production mode) does not set up the
ServiceWorker. If you want to test the ServiceWorker locally, you can use `npm run build` and then
serve the files in `dist/` with `npm run http-server -- dist -p 4200`.
