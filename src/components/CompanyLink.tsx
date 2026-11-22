import { ArrowUpRight } from 'lucide-react';
import { external, profile } from '../lib/site';
const websites: Record<string, string> = profile.companyWebsites;
export function CompanyLink({ company }: { company: string }) {
  const href = websites[company];
  if (!href) return <span>{company}</span>;
  return (
    <a className="company-link" href={href} {...external}>
      <span>{company}</span>
      <ArrowUpRight size={16} aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
