import Link from 'next/link';
import {
  Briefcase,
  FolderOpen,
  GraduationCap,
  Award,
  Users,
  Layers,
  UserCircle,
  ScrollText,
} from 'lucide-react';
import { COLLECTION_LABELS } from '@/lib/cms/fields';

const icons: Record<string, React.ReactNode> = {
  experience: <Briefcase size={18} />,
  projects: <FolderOpen size={18} />,
  education: <GraduationCap size={18} />,
  credentials: <ScrollText size={18} />,
  awards: <Award size={18} />,
  engagements: <Users size={18} />,
  skills: <Layers size={18} />,
};

export default function AdminNav() {
  return (
    <nav className="space-y-1 border-b border-pine-200 pb-4 lg:border-b-0 lg:pb-0">
      <Link
        href="/admin/profile"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-pine-800 hover:bg-pine-100"
      >
        <UserCircle size={18} /> Profile
      </Link>
      {Object.entries(COLLECTION_LABELS).map(([key, label]) => (
        <Link
          key={key}
          href={`/admin/${key}`}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-pine-800 hover:bg-pine-100"
        >
          {icons[key]} {label}
        </Link>
      ))}
    </nav>
  );
}
