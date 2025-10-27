import { Plugin } from 'vite'

const mockUser = {
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
  user: {
    id: '1',
    email: 'admin@local.test',
    username: 'admin',
    role: 'super_admin',
  },
}

function jsonResponse(res: any, obj: any) {
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  res.end(JSON.stringify(obj))
}

export default function devMockApi(): Plugin {
  return {
    name: 'vite:dev-mock-api',
    configureServer(server) {
      // Only enable in dev when VITE_USE_MOCKS is set to 'true'
      const useMocks = process.env.VITE_USE_MOCKS === 'true' || process.env.USE_DEV_MOCKS === 'true'
      if (!useMocks) return

      server.middlewares.use(async (req: any, res: any, next: any) => {
        try {
          const url = req.url || ''

          // Simple auth/login mock
          if (url.startsWith('/api/v1/auth/login') && req.method === 'POST') {
            // In a real mock you could inspect body and validate credentials
            jsonResponse(res, mockUser)
            return
          }

          // Refresh endpoint (use cookie in real flow)
          if (url.startsWith('/api/v1/auth/refresh') && req.method === 'POST') {
            jsonResponse(res, mockUser)
            return
          }

          // Teacher classes mock
          if (url.startsWith('/api/v1/teacher/classes') && req.method === 'GET') {
            jsonResponse(res, [{ id: 1, name: 'Class 1A' }, { id: 2, name: 'Class 2B' }])
            return
          }

          // Notifications mock
          if (url.startsWith('/api/v1/notifications') && req.method === 'GET') {
            jsonResponse(res, [{ id: 1, title: 'Welcome', body: 'Welcome to the mock server' }])
            return
          }

          // Fallback to next middleware
          next()
        } catch (err) {
          next()
        }
      })
    },
  }
}
