import { Application, Router, send } from "./deps.ts";
import * as indexRouter from "./routes/indexRouter.ts";
import * as usersRouter from "./routes/usersRouter.ts";

const PORT = Deno.env.get("PORT") || 3000;
const HOSTNAME = "0.0.0.0";

const app = new Application();
const router = new Router();

indexRouter.use("/", router);
usersRouter.use("/users", router);

//static files route - stylesheets config
router.get("/public/:path+", async (ctx) => {
  console.log(ctx.params.path);
  await send(ctx, ctx.request.url.pathname, {
    root: Deno.cwd(),
  });
});

app.addEventListener("error", (err) => {
  console.log(err);
  
})

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Now listening on http://0.0.0.0:3000`);
//app.listen({ port: PORT, hostname: HOSTNAME });
