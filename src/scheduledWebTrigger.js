import { webTrigger } from "@forge/api";



// The `listener` function is called when the webtrigger is invoked
export async function runWebTrigger(req) {
  await webTrigger.getUrl("example-web-trigger-key");
  // try {
  //   const body = JSON.parse(req.body);
  //   const newmotd = body.motd;
  //   await storage.set("motd", newmotd);
  //   return {
  //     body: "Success: Message updated\n",
  //     headers: { "Content-Type": ["application/json"] },
  //     statusCode: 200,
  //     statusText: "OK",
  //   };
  // } catch (error) {
  //   return {
  //     body: error + "\n",
  //     headers: { "Content-Type": ["application/json"] },
  //     statusCode: 400,
  //     statusText: "Bad Request",
  //   }
  // }
}

// const resolver = new Resolver();

// resolver.define("event-listener", async ({ payload, context }) => {
//   // process the event
//   await new Promise((r) => setTimeout(r, 10000));
//   console.log('payload', payload);
//   console.log('context', context);
// });

// export const handler = resolver.getDefinitions();