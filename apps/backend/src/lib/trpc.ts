import { initTRPC, TRPCError } from '@trpc/server'
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { OpenApiMeta } from 'trpc-swagger'
import { ZodError } from 'zod'
export async function createContext(opts: FetchCreateContextFnOptions) {
  opts.resHeaders.set('Access-Control-Allow-Origin', '*')
  opts.resHeaders.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, HEAD, OPTIONS',
  )
  opts.resHeaders.set('Access-Control-Max-Age', '86400')
  opts.resHeaders.set('Access-Control-Allow-Headers', '*')
  opts.resHeaders.set('Access-Control-Allow-Credentials', 'true')
  opts.resHeaders.set('Allow', 'GET, POST, PATCH, DELETE, HEAD, OPTIONS')

  return { ...opts }
}
export type Context = Awaited<ReturnType<typeof createContext>>

export const t = initTRPC
  .meta<OpenApiMeta>()
  .context<Context>()
  .create({
    errorFormatter: ({ error, shape }) => {
      return {
        ...shape,
        data: {
          ...shape.data,
          zodError:
            error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
              ? error.cause.flatten()
              : null,
        },
      }
    },
  })

const isAuthed = t.middleware((opts) => {
  const { ctx } = opts

  return opts.next({
    ...opts,
    ctx: {
      ...ctx,
    },
  })
})
export const protectedProcedure = t.procedure.use(isAuthed)
