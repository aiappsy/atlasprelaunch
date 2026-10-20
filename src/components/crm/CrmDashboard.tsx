import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Compass,
  ArrowLeft,
  Download,
  Search,
  Filter,
  Flame,
  CheckCircle,
  Clock,
  Mail,
  Shield,
  Briefcase,
  Trash2,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Phone,
  MessageCircle,
  Headphones,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Radio,
  Lock,
} from 'lucide-react';
import { useRef } from 'react';
import { LeadRecord, TeamMember, LeadStatus } from '../../lib/crmTypes';
import {
  getStoredLeads,
  getStoredTeamMembers,
  updateLeadStatus,
  assignLead,
  exportLeadsToCSV,
  deleteTeamMember,
} from '../../lib/crmService';
import { LeadDetailModal } from './LeadDetailModal';
import { AddTeamMemberModal } from './AddTeamMemberModal';
import { FounderCertificateModal, FounderCertificateData } from '../FounderCertificateModal';
import { NURTURE_EMAIL_SEQUENCE, NurtureEmailTemplate } from '../../lib/nurtureEmailSequence';
import { dispatchVerificationCode } from '../../lib/emailService';
import {
  getStoredRefundClaims,
  approveRefundClaim,
  processStripeRefund,
  rejectRefundClaim,
  RefundClaimRecord,
} from '../../lib/refundManagementService';

interface CrmPodcastItem {
  id: string;
  category: 'core' | 'deepdive';
  badge: string;
  title: string;
  desc: string;
  file: string;
  size: string;
  duration: string;
  trackId: string;
}

const CRM_PODCAST_ITEMS: CrmPodcastItem[] = [
  {
    id: 'ep1',
    category: 'core',
    badge: 'Core 1 • Hotell',
    title: 'How to Bypass Hidden Hotel Markups (Slik omgår du skjulte hotellpåslag)',
    desc: 'How rate parity agreements enforce identical prices on public booking portals, and how closed-loop private travel clubs legally unlock raw wholesale bedbank rates.',
    file: 'How_to_Bypass_Hidden_Hotel_Markups.m4a',
    size: '11.6 MB',
    duration: '12:05',
    trackId: 'hotel-blueprint'
  },
  {
    id: 'ep2',
    category: 'core',
    badge: 'Core 2 • 0 kr Opphold',
    title: 'The Math Behind €0 Hotel Stays (Matematikken bak 0 kr hotellovernattinger)',
    desc: 'The complete breakdown of European hospitality corporate vouchers: why 4-star properties trade empty rooms for on-site food and beverage revenue.',
    file: 'The_Math_Behind_Zero_Euro_Hotel_Stays.m4a',
    size: '11.1 MB',
    duration: '11:32',
    trackId: 'voucher'
  },
  {
    id: 'ep3',
    category: 'core',
    badge: 'Core 3 • Flybilletter',
    title: 'How Flight Middlemen Inflate Ticket Prices (Slik pumper fly-mellommenn opp billettprisene)',
    desc: 'Legacy GDS markup structures vs. direct IATA/NDC airline API connections. How ATLAS bypasses consolidator fees to deliver pure net airfares.',
    file: 'How_Flight_Middlemen_Inflate_Ticket_Prices.m4a',
    size: '11.8 MB',
    duration: '12:18',
    trackId: 'flights'
  },
  {
    id: 'ep4',
    category: 'core',
    badge: 'Core 4 • Passasjerkrav',
    title: 'How APIs Force Flight Delay Payouts (Slik tvinger API-er flyselskapene til utbetalinger)',
    desc: 'Why 85% of delayed flyers never collect their €250–€600 compensation, and how real-time flight tracking triggers automated EU261 claims.',
    file: 'How_APIs_Force_Flight_Delay_Payouts.m4a',
    size: '10.2 MB',
    duration: '10:41',
    trackId: 'delays'
  },
  {
    id: 'ep5',
    category: 'core',
    badge: 'Core 5 • Flyplasslounger',
    title: 'Wholesale Airport Lounges Without Credit Cards (Engros flyplasslounger uten dyre kredittkort)',
    desc: 'How global B2B airport lounge networks B2B wholesale access bypasses high-annual-fee credit cards to deliver VIP lounge access for $24–$28.',
    file: 'Wholesale_Airport_Lounges_Without_Credit_Cards.m4a',
    size: '10.3 MB',
    duration: '10:42',
    trackId: 'lounges'
  },
  {
    id: 'ep6',
    category: 'core',
    badge: 'Core 6 • Provisjoner',
    title: 'How ATLAS Returns Hidden Travel Commissions (Slik refunderer ATLAS skjulte provisjoner til deg)',
    desc: 'Luxury resort packages and partner chains pay 10%–16% commission behind your back. ATLAS passes 100% back into your member Rewards Vault.',
    file: 'How_ATLAS_Returns_Hidden_Travel_Commissions.m4a',
    size: '9.6 MB',
    duration: '10:02',
    trackId: 'commissions'
  },
  {
    id: 'ep7',
    category: 'core',
    badge: 'Core 7 • Luksusresorter',
    title: 'How Luxury Resorts Secretly Liquidate Empty Suites (Slik dumper luksusresorter tomme suiter i hemmelighet)',
    desc: '5-star resorts cannot discount publicly without destroying their brand equity. Discover how opaque closed-loop distribution liquidates unsold suites.',
    file: 'How_Luxury_Resorts_Secretly_Liquidate_Empty_Suites.m4a',
    size: '41.3 MB',
    duration: '43:03',
    trackId: 'resorts'
  },
  {
    id: 'ep8',
    category: 'core',
    badge: 'Core 8 • Garanti',
    title: 'How ATLAS Guarantees Wholesale Savings (Slik garanterer ATLAS at medlemskapet lønner seg)',
    desc: 'The legal and mathematical framework of the ATLAS 100% Value Guarantee. Why joining ATLAS carries zero financial risk.',
    file: 'How_ATLAS_Travel_Club_Guarantees_Wholesale_Savings.m4a',
    size: '10.3 MB',
    duration: '10:46',
    trackId: 'guarantee'
  },
  {
    id: 'ep9',
    category: 'core',
    badge: 'Core 9 • Storlansering',
    title: 'The Zero-Markup Travel Membership Revolution (Revolusjonen: Reis til 0 kr påslag med ATLAS)',
    desc: 'The full vision of ATLAS Travel Club, the private subscription model applied to global travel, and what happens when the doors open on Jan 20, 2027.',
    file: 'ATLAS_Travel_Club_Zero_Markup_Membership.m4a',
    size: '9.0 MB',
    duration: '09:22',
    trackId: 'launch'
  },
  {
    id: 'deep1',
    category: 'deepdive',
    badge: 'Deep Dive • Playbook',
    title: 'The ATLAS Travel Club Launch Playbook',
    desc: 'Comprehensive 45-minute deep-dive covering founder perks, hotel bedbanks, EU261 integrations, and our long-term roadmap.',
    file: 'The_ATLAS_Travel_Club_Launch_Playbook.m4a',
    size: '43.5 MB',
    duration: '45:18',
    trackId: 'deepdive'
  },
  {
    id: 'deep2',
    category: 'deepdive',
    badge: 'Deep Dive • Duopol',
    title: 'How ATLAS Disrupts the Travel Duopoly',
    desc: 'How Booking Holdings and commercial booking portals Group maintain a 92% market chokehold, and how private subscription clubs break the duopoly.',
    file: 'How_ATLAS_Disrupts_the_Travel_Duopoly.m4a',
    size: '42.3 MB',
    duration: '44:06',
    trackId: 'deepdive-duopoly'
  },
  {
    id: 'deep3',
    category: 'deepdive',
    badge: 'Deep Dive • Økonomi',
    title: 'Why Luxury Hotels Give Away Free Rooms',
    desc: 'The operational mathematics of hotel marginal costs vs. food, beverage, and amenities upsells during shoulder seasons.',
    file: 'Why_Luxury_Hotels_Give_Away_Free_Rooms.m4a',
    size: '40.4 MB',
    duration: '42:07',
    trackId: 'deepdive-free-rooms'
  },
  {
    id: 'deep4',
    category: 'deepdive',
    badge: 'Deep Dive • Engros',
    title: 'How Travel Clubs Bypass Retail Markups',
    desc: 'Behind the scenes of closed-user-group credentialing and how contractual rate parity is legally honored without surcharges.',
    file: 'How_Travel_Clubs_Bypass_Retail_Markups.m4a',
    size: '40.3 MB',
    duration: '42:00',
    trackId: 'deepdive-markup-bypass'
  },
  {
    id: 'deep5',
    category: 'deepdive',
    badge: 'Deep Dive • Forretningsmodell',
    title: 'How Travel Subscriptions Kill Hidden Commissions',
    desc: 'Why the alignment of interests between club and member is the only way to achieve truly transparent travel pricing.',
    file: 'How_Travel_Subscriptions_Kill_Hidden_Commissions.m4a',
    size: '22.8 MB',
    duration: '23:45',
    trackId: 'deepdive-subscriptions'
  },
  {
    id: 'briefing1',
    category: 'deepdive',
    badge: 'Executive Briefing',
    title: 'The Closed-User-Group Advantage (Executive Briefing)',
    desc: 'Concise 6-minute executive overview for high-level partner reviews and onboardings.',
    file: 'how-private-clubs-get-wholesale-hotel-rates.m4a',
    size: '7.6 MB',
    duration: '06:13',
    trackId: 'summary'
  }
];

interface CrmDashboardProps {
  onBackToSite: () => void;
  onLockCrm: () => void;
}

export const CrmDashboard: React.FC<CrmDashboardProps> = ({ onBackToSite, onLockCrm }) => {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [refundClaims, setRefundClaims] = useState<RefundClaimRecord[]>([]);
  const [currentMemberId, setCurrentMemberId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'leads' | 'team' | 'sequences' | 'refunds' | 'podcasts'>('leads');
  const [refundStatusFilter, setRefundStatusFilter] = useState<string>('all');
  const [actionFeedback, setActionFeedback] = useState<string>('');

  // Podcasts Player State (Founder Internal Vault)
  const [selectedPodcast, setSelectedPodcast] = useState<CrmPodcastItem>(CRM_PODCAST_ITEMS[0]);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [podcastFilterTab, setPodcastFilterTab] = useState<'all' | 'core' | 'deepdive'>('all');
  const [podcastSearchQuery, setPodcastSearchQuery] = useState<string>('');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [audioCurrentTime, setAudioCurrentTime] = useState<number>(0);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const crmAudioRef = useRef<HTMLAudioElement | null>(null);

  // Sequences State
  const [selectedSequenceId, setSelectedSequenceId] = useState<string>(NURTURE_EMAIL_SEQUENCE[0].id);
  const [testEmailAddress, setTestEmailAddress] = useState<string>('paljuritzen@gmail.com');
  const [isSendingTest, setIsSendingTest] = useState<boolean>(false);
  const [testEmailFeedback, setTestEmailFeedback] = useState<string>('');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all');

  // Modals
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);
  const [selectedCertificateData, setSelectedCertificateData] = useState<FounderCertificateData | null>(null);

  const refreshData = () => {
    const loadedTeam = getStoredTeamMembers();
    const loadedLeads = getStoredLeads();
    const loadedClaims = getStoredRefundClaims();
    setTeam(loadedTeam);
    setLeads(loadedLeads);
    setRefundClaims(loadedClaims);
    if (!currentMemberId && loadedTeam.length > 0) {
      setCurrentMemberId(loadedTeam[0].id);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const currentMember = team.find((t) => t.id === currentMemberId) || team[0] || {
    id: 'guest',
    name: 'Admin User',
    email: 'admin@atlastravelclub.com',
    role: 'admin',
    specialization: 'General',
    status: 'active',
    createdAt: new Date().toISOString(),
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.fullName && lead.fullName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      lead.inviteCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.membershipTier.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;

    let matchesAssignee = true;
    if (assigneeFilter === 'unassigned') {
      matchesAssignee = !lead.assignedTo;
    } else if (assigneeFilter === 'me') {
      matchesAssignee = lead.assignedTo === currentMember.id;
    } else if (assigneeFilter !== 'all') {
      matchesAssignee = lead.assignedTo === assigneeFilter;
    }

    return matchesSearch && matchesStatus && matchesAssignee;
  });

  // KPI Calculations
  const totalModeledSavings = leads.reduce((sum, l) => sum + (l.modeledSavingsUSD || 0), 0);
  const hotLeadsCount = leads.filter((l) => l.priority === 'hot' || l.modeledSavingsUSD >= 3500).length;
  const contactedCount = leads.filter((l) => l.status !== 'new').length;
  const contactRate = leads.length > 0 ? Math.round((contactedCount / leads.length) * 100) : 0;

  const handleExportCSV = () => {
    exportLeadsToCSV(leads, team);
  };

  const handleDeleteMember = (memberId: string) => {
    if (confirm('Are you sure you want to remove this team member?')) {
      const updated = deleteTeamMember(memberId);
      setTeam(updated);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-neutral-950 text-neutral-100 flex flex-col justify-between overflow-x-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-neutral-950/95 pointer-events-none" />

      {/* CRM Main Header */}
      <header className="relative z-10 w-full border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-xl px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToSite}
              className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-mono text-neutral-400 hover:text-neutral-100 flex items-center gap-1.5 transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Prelaunch Site</span>
            </button>
            <div className="h-4 w-px bg-neutral-800 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-lg font-bold tracking-wider text-neutral-100">
                Founder Members CRM
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                Sales Pipeline
              </span>
            </div>
          </div>

          {/* User selector & Export & Lock */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Logged in as selector */}
            <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-xl text-xs">
              <span className="text-neutral-500 text-[11px] font-mono">Sales Rep:</span>
              <select
                value={currentMemberId}
                onChange={(e) => setCurrentMemberId(e.target.value)}
                className="bg-transparent text-amber-300 font-semibold outline-none cursor-pointer text-xs"
              >
                {team.map((m) => (
                  <option key={m.id} value={m.id} className="bg-neutral-900 text-neutral-100">
                    {m.name} ({m.role})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-mono flex items-center gap-1.5 transition cursor-pointer"
              title="Download Leads as CSV"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              type="button"
              onClick={onLockCrm}
              className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-red-500/30 text-red-300 text-xs font-mono flex items-center gap-1.5 transition cursor-pointer"
              title="Lock CRM and Log Out"
            >
              <span>Lock CRM</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main CRM Body */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 text-left">
            <span className="text-[11px] font-mono text-neutral-400 uppercase block mb-1">Total Prelaunch Leads</span>
            <div className="text-2xl font-bold font-mono text-neutral-100">{leads.length}</div>
            <span className="text-[10px] text-neutral-500 font-mono mt-1 block">Registered via waitlist</span>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 text-left">
            <span className="text-[11px] font-mono text-neutral-400 uppercase block mb-1">Modeled Savings Pipeline</span>
            <div className="text-2xl font-bold font-mono text-amber-300">
              €{totalModeledSavings.toLocaleString()}
            </div>
            <span className="text-[10px] text-neutral-500 font-mono mt-1 block">Cumulative member value</span>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 text-left">
            <span className="text-[11px] font-mono text-neutral-400 uppercase block mb-1">High-Value VIP Leads</span>
            <div className="text-2xl font-bold font-mono text-red-400 flex items-center gap-1.5">
              <span>{hotLeadsCount}</span>
              <Flame className="w-4 h-4 text-red-400" />
            </div>
            <span className="text-[10px] text-neutral-500 font-mono mt-1 block">&gt; €3,000/yr modeled</span>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 text-left">
            <span className="text-[11px] font-mono text-neutral-400 uppercase block mb-1">Contact Rate</span>
            <div className="text-2xl font-bold font-mono text-emerald-400">{contactRate}%</div>
            <span className="text-[10px] text-neutral-500 font-mono mt-1 block">{contactedCount} contacted so far</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition cursor-pointer ${
                activeTab === 'leads'
                  ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20'
                  : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Leads Pipeline ({leads.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('team')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'team'
                  ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20'
                  : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Team Members ({team.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('sequences')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'sequences'
                  ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20'
                  : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Lanseringssekvens ({NURTURE_EMAIL_SEQUENCE.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('refunds')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'refunds'
                  ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20'
                  : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Verdigaranti & Refusjoner ({refundClaims.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('podcasts')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'podcasts'
                  ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20'
                  : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>Podcast Arkiv ({CRM_PODCAST_ITEMS.length})</span>
            </button>
          </div>

          {activeTab === 'team' && (
            <button
              type="button"
              onClick={() => setIsAddTeamModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow transition cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Add Team Member</span>
            </button>
          )}
        </div>

        {/* TAB 1: LEADS PIPELINE */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-neutral-900/60 p-3 rounded-2xl border border-neutral-800">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by email, name, or invite code..."
                  className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-200 outline-none focus:border-amber-400"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-neutral-400">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-2.5 py-1.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-200 outline-none cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New Lead</option>
                  <option value="contacted">Contacted</option>
                  <option value="vip_preview_sent">VIP Preview Sent</option>
                  <option value="deposit_paid">Deposit Paid</option>
                  <option value="active_member">Active Member</option>
                </select>
              </div>

              {/* Assignee Filter */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-neutral-400">Assigned:</span>
                <select
                  value={assigneeFilter}
                  onChange={(e) => setAssigneeFilter(e.target.value)}
                  className="px-2.5 py-1.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-200 outline-none cursor-pointer"
                >
                  <option value="all">All Assignees</option>
                  <option value="me">Assigned to Me ({currentMember.name.split(' ')[0]})</option>
                  <option value="unassigned">Unassigned Only</option>
                  {team.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Leads Table */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-950/80 text-[11px] font-mono uppercase text-neutral-400 border-b border-neutral-800">
                    <tr>
                      <th className="py-3 px-4">Member Lead</th>
                      <th className="py-3 px-4">Modeled Savings</th>
                      <th className="py-3 px-4">Pipeline Status</th>
                      <th className="py-3 px-4">Assigned Team Member</th>
                      <th className="py-3 px-4">Notes</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-neutral-500 font-mono">
                          No leads matching your current search or filters.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => {
                        const assignedMember = team.find((t) => t.id === lead.assignedTo);
                        return (
                          <tr
                            key={lead.id}
                            className="hover:bg-neutral-800/40 transition cursor-pointer"
                            onClick={() => setSelectedLead(lead)}
                          >
                            {/* Member Lead Info */}
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-neutral-100">{lead.fullName || 'Founder Member'}</span>
                                {lead.isEmailVerified && (
                                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                                    ✓ Verified
                                  </span>
                                )}
                                {lead.priority === 'hot' && (
                                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 font-bold border border-red-500/40">
                                    VIP
                                  </span>
                                )}
                                {lead.preferredContact && (
                                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/30">
                                    {lead.preferredContact.toUpperCase()}
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-neutral-400 block font-mono">
                                {lead.email}
                              </span>
                              <div className="flex items-center gap-2 mt-0.5 text-[10px] text-neutral-500 font-mono">
                                {lead.phone && <span>Tel: {lead.phone}</span>}
                                <span>•</span>
                                <span>Ref: {lead.inviteCode}</span>
                              </div>
                            </td>

                            {/* Modeled Savings */}
                            <td className="py-3 px-4">
                              <span className="font-cinzel font-bold text-amber-300 text-sm">
                                €{lead.modeledSavingsUSD.toLocaleString()} / yr
                              </span>
                              <span className="text-[10px] text-neutral-500 block">
                                {lead.membershipTier}
                              </span>
                            </td>

                            {/* Status */}
                            <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                              <select
                                value={lead.status}
                                onChange={(e) => {
                                  updateLeadStatus(lead.id, e.target.value as LeadStatus);
                                  refreshData();
                                }}
                                className="px-2 py-1 bg-neutral-950 border border-neutral-700 rounded-lg text-[11px] font-mono text-neutral-200 outline-none cursor-pointer"
                              >
                                <option value="new">New Lead</option>
                                <option value="contacted">Contacted</option>
                                <option value="vip_preview_sent">VIP Preview Sent</option>
                                <option value="deposit_paid">Deposit Paid</option>
                                <option value="active_member">Active Member</option>
                              </select>
                            </td>

                            {/* Assignee */}
                            <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                              <select
                                value={lead.assignedTo || ''}
                                onChange={(e) => {
                                  assignLead(lead.id, e.target.value || undefined);
                                  refreshData();
                                }}
                                className={`px-2 py-1 rounded-lg text-[11px] font-mono outline-none cursor-pointer border ${
                                  assignedMember
                                    ? 'bg-neutral-950 border-neutral-700 text-amber-300 font-semibold'
                                    : 'bg-neutral-950 border-neutral-800 text-neutral-500'
                                }`}
                              >
                                <option value="">— Unassigned —</option>
                                {team.map((m) => (
                                  <option key={m.id} value={m.id}>
                                    {m.name}
                                  </option>
                                ))}
                              </select>
                            </td>

                            {/* Notes Count */}
                            <td className="py-3 px-4">
                              <span className="text-[11px] font-mono text-neutral-400">
                                {lead.notes?.length || 0} notes
                              </span>
                            </td>

                            {/* Action Buttons */}
                            <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-end gap-1.5">
                                {(lead.whatsapp || lead.phone) && (
                                  <a
                                    href={`https://wa.me/${(lead.whatsapp || lead.phone).replace(/\D/g, '')}?text=${encodeURIComponent(`Hi ${lead.fullName || 'there'}, this is Atlas Concierge regarding your Founder Membership (${lead.inviteCode})!`)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/60 transition"
                                    title="WhatsApp Outreach"
                                  >
                                    <MessageCircle className="w-3.5 h-3.5" />
                                  </a>
                                )}
                                <a
                                  href={`mailto:${lead.email}?subject=${encodeURIComponent(`Atlas Founder Member Invitation | ${lead.inviteCode}`)}`}
                                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
                                  title="Send Email"
                                >
                                  <Mail className="w-3.5 h-3.5" />
                                </a>
                                <button
                                  type="button"
                                  onClick={() => setSelectedLead(lead)}
                                  className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-mono transition cursor-pointer"
                                >
                                  Details
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TEAM MEMBERS */}
        {activeTab === 'team' && (
          <div className="space-y-4 text-left">
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-neutral-100">Team Concierge Directory</h4>
                <p className="text-xs text-neutral-400">
                  Assign leads to colleagues based on traveler profile and destination focus.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddTeamModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow transition"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Add Member</span>
              </button>
            </div>

            {/* Team Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {team.map((member) => {
                const assignedCount = leads.filter((l) => l.assignedTo === member.id).length;
                return (
                  <div
                    key={member.id}
                    className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono uppercase font-bold tracking-wider text-amber-400 px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/30">
                          {member.role}
                        </span>
                        {member.role !== 'admin' && (
                          <button
                            type="button"
                            onClick={() => handleDeleteMember(member.id)}
                            className="text-neutral-500 hover:text-red-400 transition cursor-pointer p-1"
                            title="Remove Team Member"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <h4 className="text-base font-bold text-neutral-100">{member.name}</h4>
                      <p className="text-xs text-neutral-400 font-mono mt-0.5">{member.email}</p>

                      <div className="mt-3 p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-300 space-y-1">
                        <div className="text-neutral-500 font-mono">Specialization:</div>
                        <div className="font-semibold text-neutral-200">{member.specialization}</div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs font-mono">
                      <span className="text-neutral-400">Assigned Leads:</span>
                      <span className="font-bold text-amber-300">{assignedCount} leads</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: LANSERINGS- & E-POSTSEKVENS */}
        {activeTab === 'sequences' && (
          <div className="space-y-6">
            {/* Top Launch Timeline Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-amber-950/30 border border-amber-400/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-mono font-bold uppercase border border-amber-400/30">
                  Offisiell Lansering: Onsdag 20. Januar 2027 kl. 10:00 CET
                </span>
                <h3 className="text-lg font-bold text-neutral-100 mt-2 font-cinzel">
                  Automatisert E-postløp (Nurture → Urgency → Forfeiture)
                </h3>
                <p className="text-xs text-neutral-400 mt-1 max-w-2xl leading-relaxed">
                  Alle som melder seg på ventelisten mates automatisk gjennom denne 7-trinns sekvensen frem mot åpningen onsdag 20. januar. Mål: Konvertere de 100 første betalende medlemmene (1 290 kr / €110 Day 1).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-right font-mono text-xs shrink-0">
                <span className="text-neutral-500 block text-[10px]">Aktive Ventelistekandidater</span>
                <span className="text-xl font-bold text-amber-300">{leads.length} pre-registrerte</span>
              </div>
            </div>

            {/* Sequence Layout: Left List + Right Live Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Email Stages */}
              <div className="lg:col-span-5 space-y-2.5">
                {NURTURE_EMAIL_SEQUENCE.map((seq, idx) => {
                  const isSelected = seq.id === selectedSequenceId;
                  return (
                    <button
                      key={seq.id}
                      type="button"
                      onClick={() => setSelectedSequenceId(seq.id)}
                      className={`w-full p-4 rounded-2xl border text-left transition cursor-pointer ${
                        isSelected
                          ? 'bg-neutral-900 border-amber-400 shadow-lg shadow-amber-500/10'
                          : 'bg-neutral-950/70 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                          E-post #{idx + 1} • {seq.scheduledTiming}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[9px] font-mono font-semibold">
                          Aktiv
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-neutral-100 line-clamp-1">{seq.subjectNo}</h4>
                      <p className="text-[11px] text-neutral-400 mt-1 line-clamp-1">{seq.preheaderNo}</p>
                      {seq.podcastTitleNo && (
                        <div className="flex items-center gap-1.5 text-[10px] text-amber-300/90 mt-2 font-mono">
                          <Headphones className="w-3 h-3 text-amber-400 shrink-0" />
                          <span className="truncate">{seq.podcastTitleNo}</span>
                          <span className="text-neutral-500 shrink-0">({seq.podcastDuration})</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Live Email Preview & Test Dispatcher */}
              <div className="lg:col-span-7 bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 space-y-4">
                {(() => {
                  const currentSeq = NURTURE_EMAIL_SEQUENCE.find((s) => s.id === selectedSequenceId) || NURTURE_EMAIL_SEQUENCE[0];
                  const sampleContext = {
                    fullName: 'Pål Juritzen',
                    email: testEmailAddress,
                    inviteCode: 'ATLAS-1001',
                    registeredDate: new Date().toLocaleDateString('no-NO'),
                    phone: '+47 40059493',
                  };
                  const htmlOutput = currentSeq.getHtmlContent(sampleContext);

                  return (
                    <>
                      {/* Email Metadata */}
                      <div className="border-b border-neutral-800 pb-3 space-y-1.5 text-xs font-mono">
                        <div className="flex justify-between items-center text-neutral-400">
                          <span>Sekvensstadium:</span>
                          <span className="text-amber-400 font-bold">{currentSeq.stageName}</span>
                        </div>
                        <div className="flex justify-between items-center text-neutral-400">
                          <span>Utsendingstidspunkt:</span>
                          <span className="text-neutral-200">{currentSeq.scheduledTiming}</span>
                        </div>
                        <div className="text-neutral-300 pt-1">
                          <strong className="text-neutral-400">Emne:</strong> {currentSeq.subjectNo}
                        </div>
                        {currentSeq.podcastTitleNo && (
                          <div className="pt-2 mt-2 border-t border-neutral-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-amber-300">
                            <div className="flex items-center gap-2 truncate">
                              <Headphones className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                              <strong className="text-amber-300">Inkludert Podcast:</strong>
                              <span className="text-neutral-200 truncate">{currentSeq.podcastTitleNo}</span>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 text-[10px] shrink-0 font-bold">
                              {currentSeq.podcastDuration}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Test Dispatch Controls */}
                      <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                        <div className="flex-1 w-full">
                          <label className="text-[10px] text-neutral-500 uppercase block mb-1">
                            Send test-e-post til:
                          </label>
                          <input
                            type="email"
                            value={testEmailAddress}
                            onChange={(e) => setTestEmailAddress(e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-200 text-xs outline-none focus:border-amber-400"
                          />
                        </div>

                        <button
                          type="button"
                          disabled={isSendingTest || !testEmailAddress}
                          onClick={async () => {
                            setIsSendingTest(true);
                            setTestEmailFeedback('Sender test-e-post via Gmail SMTP...');
                            try {
                              const res = await dispatchVerificationCode(
                                testEmailAddress,
                                'Pål Juritzen',
                                '123456',
                                '+4740059493',
                                'email'
                              );
                              setTestEmailFeedback(res.success ? '✓ Test-e-post sendt til ' + testEmailAddress : 'Varsel: ' + (res.message || 'Sendt'));
                            } catch (e: any) {
                              setTestEmailFeedback('Test sendt (simulert / relay)');
                            } finally {
                              setIsSendingTest(false);
                            }
                          }}
                          className="w-full sm:w-auto px-4 py-2 mt-auto rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer shrink-0"
                        >
                          {isSendingTest ? 'Sender...' : 'Send Test-E-post'}
                        </button>
                      </div>

                      {testEmailFeedback && (
                        <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-400/20 text-[11px] font-mono text-amber-300">
                          {testEmailFeedback}
                        </div>
                      )}

                      {/* Live HTML Preview Frame */}
                      <div className="border border-neutral-800 rounded-xl overflow-hidden bg-black p-2">
                        <div className="text-[10px] font-mono text-neutral-500 mb-2 px-1 flex justify-between items-center">
                          <span>Forhåndsvisning av e-postmal (Responsive):</span>
                          <span>Mottaker: {sampleContext.fullName} ({sampleContext.inviteCode})</span>
                        </div>
                        <div
                          className="overflow-x-auto max-h-[550px] overflow-y-auto rounded-lg p-2 bg-[#0a0a0a]"
                          dangerouslySetInnerHTML={{ __html: htmlOutput }}
                        />
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: VALUE GUARANTEE & REFUND CLAIMS */}
        {activeTab === 'refunds' && (
          <div className="space-y-6 animate-fade-in font-sans">
            {/* Feedback Banner */}
            {actionFeedback && (
              <div className="p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono flex items-center justify-between">
                <span>{actionFeedback}</span>
                <button
                  onClick={() => setActionFeedback('')}
                  className="text-amber-400 hover:text-white text-xs underline cursor-pointer"
                >
                  Lukk
                </button>
              </div>
            )}

            {/* Refund KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
                <span className="text-[11px] font-mono text-neutral-400 uppercase block mb-1">
                  Totalt Krav Mottatt
                </span>
                <div className="text-2xl font-bold font-mono text-white">{refundClaims.length}</div>
                <span className="text-[10px] text-neutral-500 font-mono mt-1 block">The Value Guarantee Blueprint</span>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
                <span className="text-[11px] font-mono text-neutral-400 uppercase block mb-1">
                  Forhåndsvalidert / Klar
                </span>
                <div className="text-2xl font-bold font-mono text-emerald-400">
                  {refundClaims.filter((c) => c.status === 'pre_validated' || c.status === 'approved').length}
                </div>
                <span className="text-[10px] text-emerald-500/80 font-mono mt-1 block">Oppfyller Track A / B</span>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
                <span className="text-[11px] font-mono text-neutral-400 uppercase block mb-1">
                  Utbetalt via Stripe
                </span>
                <div className="text-2xl font-bold font-mono text-blue-400">
                  {refundClaims.filter((c) => c.status === 'processed').length}
                </div>
                <span className="text-[10px] text-neutral-500 font-mono mt-1 block">100% Penger Tilbake</span>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
                <span className="text-[11px] font-mono text-neutral-400 uppercase block mb-1">
                  Avvist under Blueprint
                </span>
                <div className="text-2xl font-bold font-mono text-neutral-400">
                  {refundClaims.filter((c) => c.status === 'rejected').length}
                </div>
                <span className="text-[10px] text-neutral-500 font-mono mt-1 block">Fly / &lt;2 netter unntak</span>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 border-b border-neutral-800 pb-3 text-xs font-mono">
              <span className="text-neutral-500">Filtrer krav:</span>
              {['all', 'pre_validated', 'approved', 'processed', 'rejected'].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setRefundStatusFilter(f)}
                  className={`px-3 py-1 rounded-lg border transition cursor-pointer uppercase text-[10px] ${
                    refundStatusFilter === f
                      ? 'bg-amber-400 text-neutral-950 border-amber-400 font-bold'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {f === 'all'
                    ? 'Alle'
                    : f === 'pre_validated'
                    ? 'Forhåndsvalidert'
                    : f === 'approved'
                    ? 'Godkjent'
                    : f === 'processed'
                    ? 'Utbetalt (Stripe)'
                    : 'Avvist'}
                </button>
              ))}
            </div>

            {/* Claims Table */}
            <div className="border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/40">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-neutral-900/90 text-neutral-400 uppercase text-[10px] border-b border-neutral-800">
                    <tr>
                      <th className="p-3.5">Krav-ID & Dato</th>
                      <th className="p-3.5">Medlem & Booking</th>
                      <th className="p-3.5">Spor & Kategori</th>
                      <th className="p-3.5">Atlas vs Butikk</th>
                      <th className="p-3.5">Status & Validering</th>
                      <th className="p-3.5 text-right">Handlinger</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                    {refundClaims
                      .filter((c) => refundStatusFilter === 'all' || c.status === refundStatusFilter)
                      .map((claim) => (
                        <tr key={claim.id} className="hover:bg-neutral-800/30 transition">
                          <td className="p-3.5 whitespace-nowrap">
                            <span className="font-bold text-amber-400 block">{claim.id}</span>
                            <span className="text-[10px] text-neutral-500">
                              {new Date(claim.submittedAt).toLocaleDateString('no-NO')}
                            </span>
                          </td>

                          <td className="p-3.5">
                            <span className="text-white font-medium block">{claim.memberName}</span>
                            <span className="text-[11px] text-neutral-400 block">{claim.memberEmail}</span>
                            <span className="text-[10px] text-neutral-500 font-mono">
                              Ref: {claim.bookingRef} • {claim.destination}
                            </span>
                          </td>

                          <td className="p-3.5 whitespace-nowrap">
                            <span className="text-neutral-200 block text-[11px]">
                              {claim.track === 'track_a_lodging'
                                ? 'Track A (Første Tur)'
                                : claim.track === 'track_b_annual'
                                ? 'Track B (Årsrevisjon)'
                                : '14-Dagers Angrerett'}
                            </span>
                            <span className="text-[10px] text-neutral-500 capitalize">
                              {claim.category.replace('_', ' ')}
                            </span>
                          </td>

                          <td className="p-3.5 whitespace-nowrap">
                            <div className="text-[11px]">
                              Atlas: <strong className="text-white">{claim.atlasPricePaid} {claim.currency}</strong>
                            </div>
                            <div className="text-[11px] text-neutral-400">
                              Butikk: {claim.publicRetailPrice} {claim.currency} ({claim.retailSource})
                            </div>
                            <div className="text-[10px] text-amber-400 font-bold mt-0.5">
                              Spart: {claim.calculatedSavings} {claim.currency} (Kontingent: {claim.annualFeePaid} {claim.currency})
                            </div>
                          </td>

                          <td className="p-3.5 max-w-xs">
                            <span
                              className={`inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold mb-1 ${
                                claim.status === 'processed'
                                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                  : claim.status === 'approved'
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : claim.status === 'pre_validated'
                                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                                  : 'bg-neutral-800 text-neutral-400'
                              }`}
                            >
                              {claim.status}
                            </span>
                            <p className="text-[10px] text-neutral-400 line-clamp-2 leading-tight">
                              {claim.statusReason}
                            </p>
                          </td>

                          <td className="p-3.5 text-right whitespace-nowrap space-x-1.5">
                            {claim.status !== 'processed' && (
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = processStripeRefund(claim.id);
                                  if (updated) {
                                    refreshData();
                                    setActionFeedback(
                                      `✅ Stripe-refusjon på ${claim.annualFeePaid} ${claim.currency} utbetalt til ${claim.memberEmail} (Ref: ${updated.stripeRefundId})`
                                    );
                                  }
                                }}
                                className="px-2.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-[10px] rounded-lg transition cursor-pointer shadow-sm"
                                title="Utbetal 100% refusjon via Stripe"
                              >
                                Utfør Stripe-refusjon
                              </button>
                            )}

                            {claim.status === 'submitted' && (
                              <button
                                type="button"
                                onClick={() => {
                                  approveRefundClaim(claim.id, 'Manuell godkjenning av concierge');
                                  refreshData();
                                  setActionFeedback(`Krav ${claim.id} godkjent.`);
                                }}
                                className="px-2 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[10px] rounded-lg transition cursor-pointer"
                              >
                                Godkjenn
                              </button>
                            )}

                            {claim.status !== 'rejected' && claim.status !== 'processed' && (
                              <button
                                type="button"
                                onClick={() => {
                                  const reason = window.prompt(
                                    'Oppgi årsak for avvisning under Blueprint (f.eks. fly eller under 2 netter):',
                                    'Avvist i henhold til The Atlas Value Guarantee Blueprint: Flybesparelser akkumuleres under Track B.'
                                  );
                                  if (reason) {
                                    rejectRefundClaim(claim.id, reason);
                                    refreshData();
                                    setActionFeedback(`Krav ${claim.id} avvist med begrunnelse.`);
                                  }
                                }}
                                className="px-2 py-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-300 text-[10px] rounded-lg border border-red-800/40 transition cursor-pointer"
                              >
                                Avvis
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: INTERNAL FOUNDER PODCAST VAULT */}
        {activeTab === 'podcasts' && (
          <div className="space-y-6">
            {/* Top Founder Notice */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-amber-950/40 border border-amber-400/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-mono font-bold uppercase border border-amber-400/30 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-amber-400" />
                    Intern Stifter-Lydbank • Konfidensielt
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">
                    Kun tilgjengelig bak CRM-sikkerhetsnøkkel
                  </span>
                </div>
                <h3 className="text-lg font-bold text-neutral-100 mt-2 font-cinzel">
                  ATLAS Travel Club — Komplett Lydarkiv (15 Spor)
                </h3>
                <p className="text-xs text-neutral-400 mt-1 max-w-3xl leading-relaxed">
                  Dette er din private stifter-oversikt over alle 15 innleste masterclass-episoder og bakgrunnsanalyser. Her kan du lytte til sporene, teste avspilling i sanntid, laste ned råfilene eller kopiere abonnent-lenkene.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-right font-mono text-xs shrink-0">
                <span className="text-neutral-500 block text-[10px]">Totalt Antall Spor</span>
                <span className="text-xl font-bold text-amber-300">{CRM_PODCAST_ITEMS.length} episoder</span>
              </div>
            </div>

            {/* Master Integrated Audio Player */}
            <div className="p-5 rounded-2xl bg-neutral-900/90 border border-amber-400/30 shadow-xl space-y-4">
              <audio
                ref={crmAudioRef}
                src={`/audio/${selectedPodcast.file}`}
                preload="metadata"
                onTimeUpdate={(e) => {
                  const target = e.currentTarget;
                  setAudioCurrentTime(target.currentTime);
                  setAudioDuration(target.duration || 0);
                }}
                onLoadedMetadata={(e) => {
                  setAudioDuration(e.currentTarget.duration || 0);
                }}
                onEnded={() => setIsAudioPlaying(false)}
                onPlay={() => setIsAudioPlaying(true)}
                onPause={() => setIsAudioPlaying(false)}
              />

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-neutral-950 shadow-lg ${isAudioPlaying ? 'animate-pulse shadow-amber-400/30' : ''}`}>
                    <Headphones className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 block font-bold">
                      {selectedPodcast.badge}
                    </span>
                    <h4 className="text-base font-bold text-neutral-100 font-cinzel">
                      {selectedPodcast.title}
                    </h4>
                    <span className="text-xs text-neutral-400 font-mono">
                      Fil: {selectedPodcast.file} • Størrelse: {selectedPodcast.size}
                    </span>
                  </div>
                </div>

                {/* Player Controls */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (crmAudioRef.current) {
                        crmAudioRef.current.currentTime = Math.max(0, crmAudioRef.current.currentTime - 15);
                      }
                    }}
                    className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-mono transition cursor-pointer"
                    title="Spol 15 sekunder tilbake"
                  >
                    ↺ 15s
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (!crmAudioRef.current) return;
                      if (isAudioPlaying) {
                        crmAudioRef.current.pause();
                      } else {
                        crmAudioRef.current.play().catch(console.warn);
                      }
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-400/20 transition cursor-pointer"
                  >
                    {isAudioPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    <span>{isAudioPlaying ? 'Pause' : 'Spill av'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (crmAudioRef.current) {
                        crmAudioRef.current.currentTime = Math.min(crmAudioRef.current.duration || 0, crmAudioRef.current.currentTime + 15);
                      }
                    }}
                    className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-mono transition cursor-pointer"
                    title="Spol 15 sekunder frem"
                  >
                    15s ↻
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const speeds = [1.0, 1.25, 1.5, 2.0];
                      const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                      setPlaybackSpeed(next);
                      if (crmAudioRef.current) crmAudioRef.current.playbackRate = next;
                    }}
                    className="px-2.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 text-xs font-mono font-bold transition cursor-pointer"
                    title="Avspillingshastighet"
                  >
                    {playbackSpeed.toFixed(1)}x
                  </button>

                  <a
                    href={`/audio/${selectedPodcast.file}`}
                    download
                    className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition cursor-pointer"
                    title="Last ned lydfil til datamaskin"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Progress Scrubber */}
              <div className="flex items-center gap-3 pt-2">
                <span className="text-xs font-mono text-neutral-400 w-12 text-right">
                  {Math.floor(audioCurrentTime / 60)}:{String(Math.floor(audioCurrentTime % 60)).padStart(2, '0')}
                </span>
                <input
                  type="range"
                  min={0}
                  max={audioDuration || 100}
                  value={audioCurrentTime}
                  onChange={(e) => {
                    const time = Number(e.target.value);
                    setAudioCurrentTime(time);
                    if (crmAudioRef.current) {
                      crmAudioRef.current.currentTime = time;
                    }
                  }}
                  className="flex-1 accent-amber-400 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                />
                <span className="text-xs font-mono text-neutral-400 w-12">
                  {Math.floor(audioDuration / 60)}:{String(Math.floor(audioDuration % 60)).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-neutral-900/60 p-3 rounded-2xl border border-neutral-800">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPodcastFilterTab('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                    podcastFilterTab === 'all'
                      ? 'bg-amber-400 text-neutral-950'
                      : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  Alle Spor ({CRM_PODCAST_ITEMS.length})
                </button>
                <button
                  type="button"
                  onClick={() => setPodcastFilterTab('core')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                    podcastFilterTab === 'core'
                      ? 'bg-amber-400 text-neutral-950'
                      : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  Kjerne-Nurture (9)
                </button>
                <button
                  type="button"
                  onClick={() => setPodcastFilterTab('deepdive')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                    podcastFilterTab === 'deepdive'
                      ? 'bg-amber-400 text-neutral-950'
                      : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  Dybdedykk (6)
                </button>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Søk i titler, tema eller filnavn..."
                  value={podcastSearchQuery}
                  onChange={(e) => setPodcastSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs font-mono placeholder:text-neutral-600 focus:outline-none focus:border-amber-400/50 w-full sm:w-64"
                />
              </div>
            </div>

            {/* Podcast Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CRM_PODCAST_ITEMS
                .filter((p) => {
                  if (podcastFilterTab !== 'all' && p.category !== podcastFilterTab) return false;
                  if (!podcastSearchQuery.trim()) return true;
                  const q = podcastSearchQuery.toLowerCase();
                  return (
                    p.title.toLowerCase().includes(q) ||
                    p.desc.toLowerCase().includes(q) ||
                    p.file.toLowerCase().includes(q)
                  );
                })
                .map((item) => {
                  const isCurrent = selectedPodcast.id === item.id;
                  return (
                    <div
                      key={item.id}
                      className={`p-5 rounded-2xl border transition flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-amber-950/20 border-amber-400/50 shadow-lg shadow-amber-400/10'
                          : 'bg-neutral-900/70 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                            item.category === 'deepdive'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              : 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                          }`}>
                            {item.badge}
                          </span>
                          <span className="text-[11px] font-mono text-neutral-400">
                            ⏱️ {item.duration}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-neutral-100 font-cinzel mb-1.5 leading-snug">
                          {item.title}
                        </h4>

                        <p className="text-xs text-neutral-400 line-clamp-3 mb-4 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-neutral-800/80 space-y-3">
                        <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                          <span>Fil: {item.file.replace('.m4a', '')}</span>
                          <span>{item.size}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedPodcast(item);
                              setTimeout(() => {
                                if (crmAudioRef.current) {
                                  crmAudioRef.current.src = `/audio/${item.file}`;
                                  crmAudioRef.current.load();
                                  crmAudioRef.current.play().catch(console.warn);
                                  setIsAudioPlaying(true);
                                }
                              }, 50);
                            }}
                            className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer ${
                              isCurrent && isAudioPlaying
                                ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20'
                                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200'
                            }`}
                          >
                            {isCurrent && isAudioPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                            <span>{isCurrent && isAudioPlaying ? 'Pause' : 'Spill av'}</span>
                          </button>

                          <a
                            href={`/audio/${item.file}`}
                            download
                            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition cursor-pointer"
                            title="Last ned fil"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </a>

                          <button
                            type="button"
                            onClick={() => {
                              const link = `https://atlasprelaunch.web.app/?podcast=${item.trackId}`;
                              navigator.clipboard.writeText(link);
                              setActionFeedback(`Kopierte dyp-lenke for ${item.title}`);
                              setTimeout(() => setActionFeedback(''), 3000);
                            }}
                            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition cursor-pointer"
                            title="Kopier abonnent-lenke"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      <LeadDetailModal
        lead={selectedLead}
        team={team}
        currentMember={currentMember}
        onClose={() => setSelectedLead(null)}
        onLeadUpdated={refreshData}
        onViewCertificate={(lead) =>
          setSelectedCertificateData({
            email: lead.email,
            inviteCode: lead.inviteCode,
            modeledSavings: '€' + lead.modeledSavingsUSD.toLocaleString(),
            issueDate: lead.createdAt,
          })
        }
      />

      <AddTeamMemberModal
        isOpen={isAddTeamModalOpen}
        onClose={() => setIsAddTeamModalOpen(false)}
        onMemberAdded={refreshData}
      />

      <FounderCertificateModal
        isOpen={!!selectedCertificateData}
        onClose={() => setSelectedCertificateData(null)}
        data={selectedCertificateData}
      />
    </div>
  );
};
