import { useContext,createContext,ReactNode,useState } from "react"

interface User{
    id: number
    name: string
    email: string
    role:string
}

interface AuthContextType{
    token: string | null
    user: User | null
    login: (token: string, user: User) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({children}:{children:ReactNode}) =>{
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'))

    const [user,setUser] =useState<User|null>(null)

    const login = (newToken : string, userData : User) =>{
        setToken(newToken)
        setUser(userData)
        localStorage.setItem('token', newToken)

    }

    const logout = () => {
        setToken(null)
        setUser(null)
        localStorage.removeItem('token')
    }

    return (
        <AuthContext.Provider value = {{ token, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    ) 

}




export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error('useAuth must be within AuthProvider')
    }
    return context
}