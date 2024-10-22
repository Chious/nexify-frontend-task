## Nexify Frontend Task

> This is frontend Task from Nextify.

### JS Framework & Library

- [NextJS](https://nextjs.org)
- [Typescript](https://www.typescriptlang.org)
- [tailwindcss](https://tailwindcss.com)
- [sweetalert2](https://sweetalert2.github.io) -- for popup
- [axios](https://axios-http.com/docs/instance) -- for http request

### How to run project ?

1. setup `.env.local` in root project, you can see example in `.env.example`

```text
NEXT_PUBLIC_API_URL=XXXXXX
```

2. initial setup in CLI

```shell
npm install
npm run dev
```

you would see project in `localhost:3000`

### Start with Docker

```shell
docker build -t nexify-frontend-task:latest .
docker run -d -p 3000:3000 nexify-frontend-task:latest
```

- [Dockerfile Example](https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile)

### Author

- Github: [https://github.com/Chious](https://github.com/Chious)
