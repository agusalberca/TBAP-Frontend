import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useMemo,
} from 'react'
import { getUser } from '../api/auth'
import { getAdminOrganizationsApi, getUserOrganizationsApi, getUserTokensApi } from '../api/tokens'
import {
  User,
  UserComplete,
  UserCourse,
  UserProfile,
  UserToken,
  Organization,
  AdminCourse,
  AdminOrganization,
} from '../api/apiTypes'
import { useQuery } from 'react-query'
import { getAdminCoursesApi, getUserCoursesApi } from '../api/courses'

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
  getUserOrganizationsAsync: () => Promise<void>;
  getAdminOrganizationsAsync: () => Promise<void>;
  getUserTokensAsync: () => Promise<void>;
  getUserCoursesAsync: () => Promise<void>;
  getAdminCoursesAsync: () => Promise<void>;

  tokenDetailId: number;
  setTokenDetailId: Dispatch<SetStateAction<number>>;

  userCourses: UserCourse[]
  adminCourses: AdminCourse[]

  userCourseDetail: UserCourse;
  setUserCourseDetail: Dispatch<SetStateAction<UserCourse>>;

  adminCourseDetail: AdminCourse;
  setAdminCourseDetail: Dispatch<SetStateAction<AdminCourse>>;

  selectedOrganization: Organization | null;
  setSelectedOrganization: Dispatch<SetStateAction<Organization | null>>;
  
}


export const AppContext = createContext<AppContextInterface | null>(null)

const AppContextProvider = ({ children }) => {
  // State to avoid deleting token from local storage on page reload
  const [firstCharge, setFirstCharge] = useState(true)
  const [token, setToken] = useState('')
  const [userOrganizations, setUserOrganizations] = useState<Organization[] >([])
  const [adminOrganizations, setAdminOrganizations] = useState<Organization[] >([])
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const [userTokens, setUserTokens] = useState<UserToken[]>([])
  const [userCourses, setUserCourses] = useState<UserCourse[]>([])
  const [adminCourses, setAdminCourses] = useState<AdminCourse[]>([])


  const [tokenDetailId, setTokenDetailId] = useState< null>()
  const [userCourseDetail, setUserCourseDetail] = useState< UserCourse>()
  const [adminCourseDetail, setAdminCourseDetail] = useState< AdminCourse>()
  
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

  // Get user organizations
  useEffect(() => {
    if (token) {
      if (isAdmin) {
        getAdminOrganizationsAsync()
      } else {
        getUserOrganizationsAsync()
      }
    }
  }, [token, user])

  useEffect(() => {
    // Si no hay organización seleccionada y hay organizaciones disponibles,
    // establecer la primera como seleccionada.
    if (!selectedOrganization ) {
      if (isAdmin && adminOrganizations.length > 0) {
        setSelectedOrganization(adminOrganizations[0]);

      }else if (userOrganizations.length > 0) {
        setSelectedOrganization(userOrganizations[0]);
      }
    }
  }, [userOrganizations, adminOrganizations])

  useEffect(() => {
    if (token) {
      if (isAdmin) {
        getAdminCoursesAsync()
      } else {
        getUserCoursesAsync()
      }
    }
  }, [selectedOrganization])

  const checkToken = async () => {
    const savedToken = localStorage.getItem('token')

    if (savedToken) {
      setToken(savedToken)
    } else {
      setToken('')
    }
  }

  const getUserOrganizationsAsync = async () => {
    const organizations = await getUserOrganizationsApi(token) || [];
    setUserOrganizations(organizations);
  }

  const getAdminOrganizationsAsync = async () => {
    const organizations = await getAdminOrganizationsApi(token) || [];
    setAdminOrganizations(organizations as Organization[]);
  }
  
  const getUserTokensAsync = async () => {
    const userTokens = await getUserTokensApi(token) || {data: []};
    setUserTokens(userTokens.data);
  }

  const getUserCoursesAsync = async () => {
    const userCourses = await getUserCoursesApi(token);
    setUserCourses(userCourses);
  }

  const getAdminCoursesAsync = async () => {
    const adminCourses = await getAdminCoursesApi(token, { organization_id : selectedOrganization?.id });
    setAdminCourses(adminCourses);
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

    getUserOrganizationsAsync,
    getAdminOrganizationsAsync,
    getUserTokensAsync,
    getUserCoursesAsync,
    getAdminCoursesAsync,

    tokenDetailId,
    setTokenDetailId,

    userCourses,
    adminCourses,
    
    userCourseDetail,
    setUserCourseDetail,

    adminCourseDetail,
    setAdminCourseDetail,

    selectedOrganization, 
    setSelectedOrganization

  }

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}

export default AppContextProvider
