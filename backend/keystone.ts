import { createAuth } from '@keystone-next/auth'
import { config, createSchema } from '@keystone-next/keystone/schema'
import 'dotenv/config'
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session'
import { User } from './schemas/User'

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/online-gallery-cluster'

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 30,
  secret: process.env.COOKIE_SECRET,
}

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO: add in initial roles here
  },
})

export default withAuth(
  config({
    // @ts-ignore
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      // TODO: add data seeding here
    },
    lists: createSchema({
      User,
    }),
    ui: {
      // Show the UI only for people who pass this text
      isAccessAllowed: ({ session }) => {
        console.log(session)
        return !!session?.data
      },
    },
    session: withItemData(statelessSessions(sessionConfig), {
      User: 'id name email',
    }),
  }),
)
