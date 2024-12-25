import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface User {
  id: string;
  role: string;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  institute: string;
  qualification: string;
  department: string;
  graduation: string;
  duration: string;
  company: string;
  designation: string;
  experience: string;
  business: string;
  plan: string;
  skills: string;
  switch: string;
  file: string;
  photo: string;
  primary: string;
  status: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (
          parsedUser &&
          parsedUser.id &&
          parsedUser.role &&
          parsedUser.name &&
          parsedUser.last_name &&
          parsedUser.email &&
          parsedUser.phone &&
          parsedUser.institute &&
          parsedUser.qualification &&
          parsedUser.department &&
          parsedUser.graduation &&
          parsedUser.duration &&
          parsedUser.company &&
          parsedUser.designation &&
          parsedUser.experience &&
          parsedUser.business &&
          parsedUser.plan &&
          parsedUser.skills &&
          parsedUser.switch &&
          parsedUser.file &&
          parsedUser.photo &&
          parsedUser.primary &&
          parsedUser.status &&
          parsedUser.password
        ) {
          setUser(parsedUser);
        } else {
        }
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
