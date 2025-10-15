import { UserRole, type globalDataType } from '@/types'
import { Store } from '@tanstack/store'

const intialState: globalDataType = {
  isVerified: false,
  tokens: {
    accessToken: '',
    refreshToken: '',
  },
  user: {
    email: '',
    username: '',
    id: '',
    role: UserRole.CUSTOMER,
  },
}

export const authStore = new Store<globalDataType>(intialState)

export const localStorageJson = () => {
  const localData = localStorage.getItem('auth')
  let jsonData
  if (localData) jsonData = JSON.parse(localData)
  return jsonData
}
export const authActions = {
  saveUser: (data: globalDataType) => {
    console.log('🔥 saveUser called with data:', data)
    console.log('🔥 User role in data:', data.user.role)
    console.log('🔥 localStorage before save:', localStorage.getItem('auth'))

    const newState = {
      isVerified: true,
      tokens: {
        accessToken: data.tokens.accessToken,
        refreshToken: data.tokens.refreshToken,
      },
      user: {
        email: data.user.email,
        username: data.user.username,
        id: data.user.id,
        role: data.user.role || UserRole.CUSTOMER, // Default to CUSTOMER if role is not provided
      },
    }

    console.log('🔥 Setting store state to:', newState)
    authStore.setState(newState)

    // Immediately verify the store was updated
    const storeAfterSet = authStore.state
    console.log('🔥 Store state immediately after setState:', storeAfterSet)
    console.log('🔥 Store tokens after setState:', storeAfterSet.tokens)

    const dataToStore = { ...data, isVerified: true }
    console.log('🔥 Saving to localStorage:', dataToStore)
    console.log(
      '🔥 localStorage available?',
      typeof localStorage !== 'undefined',
    )
    console.log('🔥 Current domain:', window.location.hostname)

    try {
      const jsonString = JSON.stringify(dataToStore)
      console.log(
        '🔥 JSON string to save (length:',
        jsonString.length,
        '):',
        jsonString,
      )

      localStorage.setItem('auth', jsonString)
      console.log('🔥 localStorage.setItem completed')

      // Immediate verification
      const savedData = localStorage.getItem('auth')
      console.log(
        '🔥 Immediately after save, localStorage contains:',
        savedData,
      )

      if (savedData) {
        const parsedSaved = JSON.parse(savedData)
        console.log('🔥 Parsed saved data:', parsedSaved)
      } else {
        console.error(
          '🔥 ERROR: localStorage.getItem returned null immediately after save!',
        )
      }

      // List all localStorage keys
      console.log('🔥 All localStorage keys:', Object.keys(localStorage))

      // Test with a simple value
      localStorage.setItem('test', 'testValue')
      console.log('🔥 Test storage value:', localStorage.getItem('test'))
    } catch (error) {
      console.error('🔥 ERROR saving to localStorage:', error)
      if (error instanceof Error) {
        console.error('🔥 Error details:', error.name, error.message)
      }
    }

    // Verify store state
    console.log('🔥 Store state after set:', authStore.state)

    // Set up a periodic check to see if localStorage gets cleared
    let checkCount = 0
    const periodicCheck = setInterval(() => {
      checkCount++
      const currentAuth = localStorage.getItem('auth')
      console.log(
        `🔥 Periodic check #${checkCount}: localStorage auth:`,
        currentAuth,
      )

      if (checkCount >= 10) {
        clearInterval(periodicCheck)
        console.log('🔥 Periodic check completed')
      }
    }, 1000)
  },
  deleteUser: () => {
    console.log('🚨 deleteUser called! Stack trace:')
    console.trace()
    console.log('🚨 localStorage before delete:', localStorage.getItem('auth'))

    authStore.setState(intialState)
    localStorage.removeItem('auth')

    console.log('🚨 localStorage after delete:', localStorage.getItem('auth'))

    // Add user feedback and navigation handling for token refresh failures
    const currentPath = window.location.pathname
    const isDashboard = currentPath.includes('/dashboard')

    if (isDashboard) {
      console.log('🚨 Token refresh failed - redirecting to login')

      // Show user feedback
      const event = new CustomEvent('auth:tokenExpired', {
        detail: {
          message: 'Your session has expired. Please log in again.',
          redirectTo: '/auth/login',
        },
      })
      window.dispatchEvent(event)

      // Force redirect to login after a brief delay
      setTimeout(() => {
        window.location.href = '/auth/login'
      }, 100)
    }
  },

  initializeUser: () => {
    console.log('🔄 initializeUser called')
    const userData = localStorage.getItem('auth')
    console.log('🔄 localStorage auth data:', userData)

    if (!userData) {
      console.log('🔄 No auth data in localStorage')
      return
    }

    try {
      const json_data = JSON.parse(userData)
      console.log('🔄 Parsed auth data:', json_data)
      console.log('🔄 User email:', json_data.user?.email)
      console.log(
        '🔄 Access token:',
        json_data.tokens?.accessToken ? 'exists' : 'missing',
      )
      console.log(
        '🔄 Refresh token:',
        json_data.tokens?.refreshToken ? 'exists' : 'missing',
      )

      if (
        json_data.user?.email &&
        json_data.tokens?.accessToken &&
        json_data.tokens?.refreshToken
      ) {
        console.log('🔄 Setting auth store state with:', json_data)
        authStore.setState(json_data)
        console.log(
          '🔄 Auth store state after initialization:',
          authStore.state,
        )
      } else {
        console.warn('🔄 Invalid auth data format in localStorage:', {
          hasEmail: !!json_data.user?.email,
          hasAccessToken: !!json_data.tokens?.accessToken,
          hasRefreshToken: !!json_data.tokens?.refreshToken,
        })
      }
    } catch (err) {
      console.error('🔄 Failed to parse auth data:', err)
    }
  },
  saveGoogleUser: (data: globalDataType) => {
    console.log('🔥 saveGoogleUser called with data:', data)
    console.log(
      '🔥 localStorage before Google save:',
      localStorage.getItem('auth'),
    )

    authStore.setState({
      isVerified: true,
      tokens: {
        accessToken: data.tokens.accessToken,
        refreshToken: data.tokens.refreshToken,
      },
      user: {
        email: data.user.email,
        username: data.user.username,
        id: data.user.id,
        role: data.user.role || UserRole.CUSTOMER, // Default to CUSTOMER if role is not provided
      },
    })

    const dataToStore = { ...data, isVerified: true }
    console.log('🔥 Google data to store:', dataToStore)

    try {
      const jsonString = JSON.stringify(dataToStore)
      console.log(
        '🔥 Google JSON string (length:',
        jsonString.length,
        '):',
        jsonString,
      )

      localStorage.setItem('auth', jsonString)
      console.log('🔥 Google localStorage.setItem completed')

      // Immediate verification
      const savedData = localStorage.getItem('auth')
      console.log(
        '🔥 Google: Immediately after save, localStorage contains:',
        savedData,
      )

      if (!savedData) {
        console.error(
          '🔥 Google ERROR: localStorage.getItem returned null immediately after save!',
        )
      }
    } catch (error) {
      console.error('🔥 Google ERROR saving to localStorage:', error)
    }

    console.log('🔥 Google store state after save:', authStore.state)
  },
  updateTokens: (tokens: { accessToken: string; refreshToken: string }) => {
    const current = authStore.state
    const updated = {
      ...current,
      tokens,
    }

    authStore.setState(updated)
    localStorage.setItem('auth', JSON.stringify(updated))
  },
}
