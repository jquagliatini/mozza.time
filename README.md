<center>
<h1>🍅 Mozza.time</h1>
<p><em>A Clean-Archi + DDD + CQRS mono repo example</em></p>
</center>

This is a kitchen sink example trying to implement a timer sequencer:
<span style="color:tomato">pomodoro</span> and more 🚀.

### GETTING STARTED

```
docker compose up -d
pnpm i
pnpm start
```

### TECHNOLOGIES

- [PNPM workspaces](https://pnpm.io/fr/workspaces)
- [SWC](https://swc.rs)
- [Typescript](https://www.typescriptlang.org/)
- [Nest.js + CQRS](https://docs.nestjs.com/recipes/cqrs)
- [Prisma](https://www.prisma.io/)

### ROADMAP

- [x] Initialize the repo
- [ ] Create the basic domain layer
- [ ] Add queries + command endpoints
- [ ] Add view layer with [htmx](https://htmx.org/)
- [ ] Add Swagger (_nice to have_)
