import { Link } from "@tanstack/react-router";
import { useGodmanProfile } from "../../hooks/useGodman";
import { useLogout } from "../../hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";

export function Navbar() {
  const { data: user, isLoading } = useGodmanProfile();
  const logoutMutation = useLogout();
  const navigate = useNavigate();
  // Om profilen fortfarande laddar, visa inget (eller en spinner om du vill)
  if (isLoading) return null;

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate({ to: `/` });
      },
    });
  };

  return (
    <nav className="bg-gray-800 px-4 py-3 print:hidden">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="space-x-4">
          <Link
            to="/"
            className="text-white text-lg font-semibold hover:text-gray-200"
          >
            Hem
          </Link>
          {user ? (
            <>
              <Link
                to="/profile"
                className="text-gray-300 hover:text-white px-3 py-1 rounded-md text-sm font-medium"
              >
                Profil
              </Link>
              <Link
                to="/clients"
                className="text-gray-300 hover:text-white px-3 py-1 rounded-md text-sm font-medium"
              >
                Huvudmän
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="text-gray-300 hover:text-white px-3 py-1 rounded-md text-sm font-medium"
              >
                Registrera
              </Link>
              <Link
                to="/login"
                className="text-gray-300 hover:text-white px-3 py-1 rounded-md text-sm font-medium"
              >
                Logga in
              </Link>
            </>
          )}
        </div>

        {user && (
          <button
            onClick={handleLogout}
            className="text-gray-300 hover:text-white px-3 py-1 rounded-md text-sm font-medium"
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending ? "Loggar ut…" : "Logga ut"}
          </button>
        )}
      </div>
    </nav>
  );
}
