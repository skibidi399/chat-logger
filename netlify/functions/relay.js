export async function onRequestPost(context) {
  const body = await context.request.json();

  // Store the latest message in memory (or DB if you want)
  globalThis.latestMessage = body.message;

  return new Response(JSON.stringify({ ok: true }));
}

export async function onRequestGet(context) {
  return new Response(
    JSON.stringify({ message: globalThis.latestMessage || "" }),
    { headers: { "Content-Type": "application/json" } }
  );
}
