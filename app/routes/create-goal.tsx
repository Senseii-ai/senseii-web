import { redirect } from "@remix-run/node"

export async function action() {
  console.log("run")
  const promise = new Promise((resolve) => setTimeout(() => resolve("hello"), 2000))
  await Promise.resolve(promise)
  return redirect("/")
}
