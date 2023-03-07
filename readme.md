
$ git init
Initialized empty Git repository in coding-typescript/.git/

 (master)
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (coding-typescript)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to coding-typescript\package.json:

{
  "name": "coding-typescript",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes)

 (master)
$ npm install typescript

added 1 package, and audited 2 packages in 2s

found 0 vulnerabilities

 (master)
$ npx tsc --init

Created a new tsconfig.json with:
                                                                                                                     TS
  target: es2016
  module: commonjs
  strict: true
  esModuleInterop: true
  skipLibCheck: true
  forceConsistentCasingInFileNames: true


You can learn more at https://aka.ms/tsconfig


 (master)
$ npm install eslint

added 97 packages, and audited 99 packages in 6s

24 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

 (master)
$ npx eslint --init
You can also run this command directly using 'npm init @eslint/config'.
√ How would you like to use ESLint? · style
√ What type of modules does your project use? · esm
√ Which framework does your project use? · none
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · browser, node
√ How would you like to define a style for your project? · guide
√ Which style guide do you want to follow? · standard-with-typescript
√ What format do you want your config file to be in? · JavaScript
Checking peerDependencies of eslint-config-standard-with-typescript@latest
Local ESLint installation not found.
The config that you've selected requires the following dependencies:

eslint-config-standard-with-typescript@latest @typescript-eslint/eslint-plugin@^5.0.0 eslint@^8.0.1 eslint-plugin-import@^2.25.2 eslint-plugin-n@^15.0.0 eslint-plugin-promise@^6.0.0 typescript@*
√ Would you like to install them now? · No / Yes
√ Which package manager do you want to use? · npm
Installing eslint-config-standard-with-typescript@latest, @typescript-eslint/eslint-plugin@^5.0.0, eslint@^8.0.1, eslint-plugin-import@^2.25.2, eslint-plugin-n@^15.0.0,
eslint-plugin-promise@^6.0.0, typescript@*
npm WARN idealTree Removing dependencies.eslint in favor of devDependencies.eslint
npm WARN idealTree Removing dependencies.typescript in favor of devDependencies.typescript

added 108 packages, and audited 207 packages in 9s

86 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
Successfully created .eslintrc.js file in coding-typescript

 (master)
$ npm install prettier eslint-config-prettier

added 2 packages, and audited 209 packages in 1s

87 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

 (master)
$ npm install -D @types/node

added 1 package, and audited 210 packages in 2s

87 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
