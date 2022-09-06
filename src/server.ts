import { initApp } from "./app";

async function start() {
  const app = await initApp();
  const PORT: string | number = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Listening at @${PORT}`);
  });
}

start().then(() => console.log("Server started successfully!"));
