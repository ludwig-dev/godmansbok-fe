import { useGodmanProfile } from "../../hooks/useGodman";
import { User, IdCard, UserCog, Mail } from "lucide-react";

const GodmanProfile = () => {
    const { data: godman, isLoading } = useGodmanProfile();

    if (isLoading) {
        return <div>Loading your profile…</div>;
    }
    return (
        <div className="max-w-3xl mx-auto px-4 py-16">
            <h2 className="text-4xl font-semibold text-center text-gray-900 mb-10">
                Welcome, <span className="text-blue-600">{godman!.username}</span>
            </h2>

            <div className="flex items-center gap-3 mb-4">
                <User className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-800">{godman!.username}</p>
            </div>

            <div className="flex items-center gap-3 mb-4">
                <Mail className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-800">{godman!.email}</p>
            </div>

            <div className="flex items-center gap-3 mb-4">
                <UserCog className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-800">{godman!.role}</p>
            </div>

            <div className="flex items-center gap-3 mb-4">
                <IdCard className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-800">{godman!.id}</p>
            </div>
        </div>
    );
};

export default GodmanProfile;
