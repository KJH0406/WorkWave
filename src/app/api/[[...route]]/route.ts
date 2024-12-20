import { Hono } from "hono"
import { handle } from "hono/vercel"

// 라우트 가져오기
import auth from "@/features/auth/server/route"
import workspaces from "@/features/workspaces/server/route"
import members from "@/features/members/server/route"
import projects from "@/features/projects/server/route"
import tasks from "@/features/tasks/server/route"

// 라우트 생성
const app = new Hono().basePath("/api")

// 라우트 추가

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const routes = app
  .route("/auth", auth)
  .route("/members", members)
  .route("/workspaces", workspaces)
  .route("/projects", projects)
  .route("/tasks", tasks)

// 라우트 내보내기
export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

// 라우트 타입 내보내기
export type AppType = typeof routes
