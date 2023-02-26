# npm-package-template

Tired of configuring Typescript, Tests, Eslint and CI for your projects? Fork this repository and have it done for you!
You only have to follow a few steps to get it done:

## 1. Fork this repository
access [https://github.com/PQrux/npm-package-template/generate](https://github.com/PQrux/npm-package-template/generate) to copy this repository.

## 2. Clone 
```bash
git clone [YOUR NEW PROJECT URL]
```

## 3. Install dependencies
```bash
npm i
```

## 4. Configure your package.json

Configure your [package.json](package.json) by replacing the following information with your own:
```json
{
  "name": "YOUR PACKAGE NAME",
  "version": "YOUR PACKAGE VERSION",
  "description": "YOUR PACKAGE DESCRIPTION",
  "author": "YOUR USERNAME OR ORGANIZATION",
  "license": "YOUR LICENSE",
  "repository": {
    "type": "git",
    "url": "YOUR REPOSITORY URL"
  },
  "bugs": {
    "url": "YOUR PROJECT BUGS/ISSUES URL"
  },
  "homepage": "YOUR PROJECT HOMEPAGE",
  "keywords": ["YOUR KEYWORD"]
  ...
}
```
## 5. (OPTIONAL) Configure the publish workflow

Uncomment the respective packages registry you are going to use in the file [.github/workflows/publish.yml](.github/workflows/publish.yml):

### 5.1. Github Package Registry

You just need to uncomment this section of the file:

```yml
# PUBLISH TO GITHUB PACKAGE REGISTRY
- uses: actions/setup-node@v3
    with:
        registry-url: 'https://npm.pkg.github.com'
- name: Publish to github registry
  run: npm publish
    env:
        NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 5.2. NPM Package Registry

#### 5.2.1 Uncomment
```yml
# PUBLISH TO NPM
- name: Publish to npm registry
  run: npm publish
  env:
    NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```
#### 5.2.2 Add the NPM secret.

1. Access your NPM account and create a new automation token.
2. Add it as a new action secret named NPM_TOKEN.

## 6. Start hacking!

Don't forget to commit the changes you've made.

---

# Other details
## Project structure

The structure of this project is easy to get, but you can costumize it however you like, the original structure is described as: 

```
__test__/
    integration/ -> integration tests;
.github/
    workflows/ -> Github Workflows;
examples/ -> you can delete these directories if you want;
    nodejs/ -> NodeJS examples;
    web/ -> Web examples (uses webpack and ES6);
lib/ -> Generated JS code;
src/ -> YOUR CODE AND UNIT TESTS GOES HERE;
...
```