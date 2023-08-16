import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useMemo,
} from 'react'
import { getUser } from '../api/auth'
import {
  User,
  UserComplete,
  UserProfile,
} from '../api/apiTypes'
import { useQuery } from 'react-query'

interface AppContextInterface {
  firstCharge: boolean;

  token: string;
  setToken: Dispatch<SetStateAction<string>>;

  user: User & UserProfile & { error?: string };
  refreshUser: () => void;
  userIsLoading: boolean;

  isCentralAdmin: boolean;
  isOrganizationAdmin: boolean;
  isRegionAdmin: boolean;
  
}

export const AppContext = createContext<AppContextInterface | null>(null)

const AppContextProvider = ({ children }) => {
  // State to avoid deleting token from local storage on page reload
  const [firstCharge, setFirstCharge] = useState(true)
  const [token, setToken] = useState('')
  const {
    data: user,
    remove: removeUser,
    refetch: refreshUser,
    isLoading: userIsLoading,
  } = useQuery(['user'], () => getUser(token) || ({} as User & UserProfile), {
    enabled: token !== '',
  })


  // Check token and get user data in first charge
  useEffect(() => {
    checkToken()
    setFirstCharge(false)
  }, [])

  // Save and remove token in local storage
  useEffect(() => {
    const checkData = async () => {
      if (token) {
        localStorage.setItem('token', token)
        checkToken()
        await refreshUser()
      } else {
        localStorage.removeItem('token')
        removeUser()
      }
    }

    if (!firstCharge) {
      checkData()
    }
  }, [token])

  // Catch local storage changes
  useEffect(() => {
    function storageEventHandler(event) {
      if (!event.isTrusted) {
        if (event.currentTarget.localStorage.token && !token) {
          setToken(event.currentTarget.localStorage.token)
        } else if (token) {
          setToken('')
        }
      } else {
        if (event.key === 'token') {
          setToken(event.newValue)
        }
      }
    }

    window.addEventListener('storage', storageEventHandler)
  }, [])


  const checkToken = async () => {
    const savedToken = localStorage.getItem('token')

    if (savedToken) {
      setToken(savedToken)
    } else {
      setToken('')
    }
  }



  const values: AppContextInterface = {
    firstCharge,

    token,
    setToken,

    user,
    refreshUser,
    userIsLoading
  }

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}

export default AppContextProvider
