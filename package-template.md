
### Prompts
- package name
    - Show current working directory. 
        - use if prompt empty
        - validate with default validation regex 
            - ^(?:@[a-z0-9-*~][a-z0-9-*._~]*/)?[a-z0-9-~][a-z0-9-._~]*$
- version
    - default 1.0.0
    - semver validation
- description
- git repository
    - none by default
    - add if not blank
    - validate url
- keywords 
    - csv
- author
- liscense
    - (MIT) default
    - if MIT put license in using author name and current year. 
- is this ok?
## Typescript install
### Prod
- vaports
- express
### Dev
- @types/express
- @types/jest
- @types/node
- @types/supertest
- jest
- nodemon
- ts-jest
- ts-node
- supertest
- typescript
- eslint
- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser
- eslint-config-prettier
- eslint-plugin-unused-imports
- prettier
