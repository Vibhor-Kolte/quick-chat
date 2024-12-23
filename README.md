# quick-chat
Chat App using Socket.io ,Kafka ,Redis ,Postgres, Next.Js, Typescript

Create frontend project using below command:-
>> npx create-next-app@latest [typescript,tailwind,/src,app-router,turbopack]

Install Shadcn Ui
>> npx shadcn@latest init   [style:default, base-color:slate, css-for-theming:yes]

Run Frontend Project
>> npm run dev

Initialize backend_v1 package.json with below command:-
>> npm init -y

Initialize backend_v1 tsconfig.json with below command:-
>> npx tsc --init

Modify tsconfig.json:-
    - Change "outDir": "./dist"  [All JS compiled code goes to this folder]
    - Change "rootDir": "./src"  [All Source Code gets picked from this folder]

Add index.ts file in src directory

Add below devDependency in package.json:-
  "devDependencies": {
    "concurrently": "^9.1.0"
  }

Add below scripts in backend package.json:-
    "start": "node dist/index.js",
    "watch": "tsc -w",
    "server": "nodemon dist/index.js",
    "dev": "concurrently \"npm run watch\" \"npm run server\""

Run Backend project:-
>> npm run dev