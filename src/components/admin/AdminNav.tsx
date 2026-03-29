'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { COLLECTION_LABELS } from '@/lib/admin/fields';
import {
  User,
  Briefcase,
  FolderOpen,
  GraduationCap,
  Award,
  Users,
  Wrench,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';

const ICONS: Record<string, React.ReactNode> = {
  experience: <Briefcase size={16} />,
  projects: <FolderOpen size={16} />,
  education: <GraduationCap size={16} />,
  credentials: <Award size={16} />,
  awards: <Award size={16} />,
  engagements: <Users size={16} />,
  skills: <Wrench size={16} />,
};

interface AdminNavProps {
  onLogout: () => void;
}

export default function AdminNav({ onLogout }: AdminNavProps) {
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + '/');
  }

  const linkClass = (href: string) =>
    `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive(href)
        ? 'bg-forest-600 text-white'
        : 'text-forest-100 hover:bg-forest-700 hover:text-white'
    }`;

  return (
    <nav className="flex h-full flex-col">
      <div className="mb-6 flex items-center gap-2 px-3 pt-2">
        <LayoutDashboard size={20} className="text-mint-400" />
        <span className="text-base font-semibold text-white">Admin</span>
      </div>

      <div className="space-y-0.5">
        <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-forest-400">
          Site
        </p>
        <Link href="/admin/profile" className={linkClass('/admin/profile')}>
          <User size={16} />
          Profile
        </Link>
      </div>

      <div className="mt-4 space-y-0.5">
        <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-forest-400">
          Content
        </p>
        {Object.entries(COLLECTION_LABELS).map(([key, label]) => (
          <Link key={key} href={`/admin/${key}`} className={linkClass(`/admin/${key}`)}>
            {ICONS[key] ?? <Briefcase size={16} />}
            {label}
          </Link>
        ))}
      </div>

      <div className="mt-auto space-y-0.5 pb-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-forest-100 transition-colors hover:bg-forest-700 hover:text-white"
        >
          <FolderOpen size={16} />
          View Site
        </Link>
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-forest-100 transition-colors hover:bg-forest-700 hover:text-white"
        >
          <LogOut size={16} />
          Log Out
        </button>
      </div>
    </nav>
  );
}
