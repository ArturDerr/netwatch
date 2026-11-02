import { init } from "./index.js";

globalThis.fetch = async (input, options) => {
  console.log(`[server] Request: ${input}`);

  return {
    ok: true,
    status: 200,
  };
};

// запускаем мониторинг
const monitor = init({
  windowMs: 2000,
  maxEntries: 1000,
  onIssue(issue) {
    console.warn(
      `[netwatch] ${issue.type}: ${issue.method} ${issue.url}`,
      issue,
    );
  },
});

// отправляем два одинаковых запроса
await Promise.all([
  fetch("/api/users"),
  fetch("/api/user"),
  fetch("/api/users"),
]);

// останавливаем мониторинг
monitor.stop();

console.log("Tests finished");
