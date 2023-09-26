import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useMemo,
} from 'react'
import { getUser } from '../api/auth'
import { getUserTokensApi } from '../api/tokens'
import {
  User,
  UserComplete,
  UserCourse,
  UserProfile,
  UserToken,
} from '../api/apiTypes'
import { useQuery } from 'react-query'
import { getCoursesApi } from '../api/courses'

interface AppContextInterface {
  firstCharge: boolean;

  token: string;
  setToken: Dispatch<SetStateAction<string>>;

  user: User & UserProfile & { error?: string };
  refreshUser: () => void;
  userIsLoading: boolean;

  isOrganization: boolean;
  isAdmin: boolean;
  isRegularUser: boolean;
  getUserTokensAsync: () => Promise<void>;
  getUserCoursesAsync: () => Promise<void>;
  
}


export const AppContext = createContext<AppContextInterface | null>(null)

const AppContextProvider = ({ children }) => {
  // State to avoid deleting token from local storage on page reload
  const [firstCharge, setFirstCharge] = useState(true)
  const [token, setToken] = useState('')
  const [userTokens, setUserTokens] = useState<UserToken[]>([])
  const [UserCourse, setUserCourse] = useState<UserCourse[]>([])
  const {
    data: user,
    remove: removeUser,
    refetch: refreshUser,
    isLoading: userIsLoading,
  } = useQuery(['user'], () => getUser(token) || ({} as User & UserProfile), {
    enabled: token !== '',
  })
  const isOrganization = useMemo(
    () => user?.user_type === 'organization',
    [user?.user_type]
  )
  const isAdmin = useMemo(
    () => user?.user_type === 'user_admin',
    [user?.user_type]
  )
  const isRegularUser = useMemo(
    () => user?.user_type === 'regular_user',
    [user?.user_type]
  )


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

  const getUserTokensAsync = async () => {
    const userTokens = await getUserTokensApi(token) || {data: []};
    setUserTokens(userTokens.data);
  }

  const getUserCoursesAsync = async () => {
    const userCourses = await getCoursesApi(token);
    setUserCourse(userCourses);
  }


  const values: AppContextInterface = {
    firstCharge,

    token,
    setToken,

    user,
    refreshUser,
    userIsLoading,

    isOrganization,
    isAdmin,
    isRegularUser,

    getUserTokensAsync,
    getUserCoursesAsync
  }

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}

export default AppContextProvider
