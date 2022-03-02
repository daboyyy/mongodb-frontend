// hooks
import { AuthProvider } from '../hooks/useAuth';

const Providers = ({ children }) => <AuthProvider>{children}</AuthProvider>;

export default Providers;
