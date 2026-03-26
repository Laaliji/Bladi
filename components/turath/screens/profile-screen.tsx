"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { SettingsIcon, TrophyIcon, ChevronRightIcon } from '../icons'
import { BottomNavigation } from '../bottom-navigation'
import { useNavigation } from '../navigation-provider'
import { useTranslation } from '../language-provider'

// Data arrays moved inside component for translation

interface ProfileScreenProps {
  isDark?: boolean
}

function BadgeIcon({ type, unlocked }: { type: string; unlocked: boolean }) {
  const color = unlocked ? "text-accent-foreground" : "text-muted-foreground"
  switch (type) {
    case 'desert': return <svg className={cn("w-6 h-6", color)} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L8 10l-6 2 6 2 4 8 4-8 6-2-6-2-4-8z"/></svg>
    case 'tile': return <svg className={cn("w-6 h-6", color)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
    case 'book': return <svg className={cn("w-6 h-6", color)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
    case 'walk': return <svg className={cn("w-6 h-6", color)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="4" r="2"/><path d="M15 22v-4l-3-3 2-4 3 1v-3M9 22l3-8-2-3"/></svg>
    case 'star': return <svg className={cn("w-6 h-6", color)} viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    case 'shield': return <svg className={cn("w-6 h-6", color)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    default: return <TrophyIcon className={cn("w-6 h-6", color)} />
  }
}

export function ProfileScreen({ isDark }: ProfileScreenProps) {
  void isDark
  const { t } = useTranslation()

  const USER_DATA = {
    name: t('demo_user.name'),
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    country: t('demo_user.country'),
    memberSince: t('demo_user.member_since_date'),
    stats: { regionsVisited: 4, sitesExplored: 23, artisansSupported: 7, languagesUsed: 3 },
  }

  const BADGES = [
    { id: '1', name: t('data.badges.sahara_explorer'), icon: 'desert', unlocked: true },
    { id: '2', name: t('data.badges.zellige_master'), icon: 'tile', unlocked: true },
    { id: '3', name: t('data.badges.storyteller'), icon: 'book', unlocked: true },
    { id: '4', name: t('data.badges.medina_walker'), icon: 'walk', unlocked: false },
    { id: '5', name: t('data.badges.culture_champion'), icon: 'star', unlocked: false },
    { id: '6', name: t('data.badges.heritage_guardian'), icon: 'shield', unlocked: false },
  ]

  const REGION_PROGRESS = [
    { id: '1', name: t('data.regions.marrakech_safi'), progress: 75, color: '#C1121F' },
    { id: '2', name: t('data.regions.fes_meknes'), progress: 45, color: '#C9A84C' },
    { id: '3', name: t('data.regions.casablanca_settat'), progress: 30, color: '#1B4332' },
    { id: '4', name: t('data.regions.draa_tafilalet'), progress: 60, color: '#8B5A2B' },
  ]

  const RECENT_HISTORY = [
    { id: '1', name: t('data.heritage_sites.koutoubia'), image: 'https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=200&h=150&fit=crop', date: t('demo_user.time_2d') },
    { id: '2', name: t('data.heritage_sites.bahia_palace'), image: 'https://images.unsplash.com/photo-1548018560-c7196bf66e3c?w=200&h=150&fit=crop', date: t('demo_user.time_3d') },
    { id: '3', name: t('data.heritage_sites.jemaa_el_fnaa'), image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=200&h=150&fit=crop', date: t('demo_user.time_1w') },
  ]

  const ACTIVE_CHALLENGES = [
    { id: '1', title: t('data.challenge_titles.visit_5_unesco'), progress: 3, total: 5, reward: t('data.rewards.heritage_guardian') },
    { id: '2', title: t('data.challenge_titles.support_3_artisans'), progress: 2, total: 3, reward: t('data.rewards.discount_10') },
  ]

  const { navigate } = useNavigation()
  const [activeTab, setActiveTab] = useState<'badges' | 'progress' | 'history'>('badges')

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="pt-12 px-4 pb-6 bg-card border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-foreground">{t('navigation.profile')}</h1>
          <button onClick={() => navigate('settings')} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center" aria-label="Settings">
            <SettingsIcon className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-cover bg-center border-2 border-accent" style={{ backgroundImage: `url(${USER_DATA.avatar})` }} />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground">{USER_DATA.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg">🇺🇸</span>
              <span className="text-sm text-muted-foreground">{USER_DATA.country}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{t('demo_user.member_since_prefix')} {USER_DATA.memberSince}</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-4">
          {[
            { label: t('profile_screen.regions'), value: USER_DATA.stats.regionsVisited },
            { label: t('profile_screen.sites'), value: USER_DATA.stats.sitesExplored },
            { label: t('profile_screen.artisans'), value: USER_DATA.stats.artisansSupported },
            { label: t('profile_screen.languages'), value: USER_DATA.stats.languagesUsed },
          ].map((stat, i) => (
            <div key={i} className="text-center p-2 bg-muted rounded-xl">
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border bg-card">
        {(['badges', 'progress', 'history'] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={cn("flex-1 py-3 text-sm font-medium transition-all border-b-2 capitalize", activeTab === tab ? "text-primary border-primary" : "text-muted-foreground border-transparent")}>
            {t(`profile_screen.${tab}`)}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {activeTab === 'badges' && (
          <div className="p-4">
            <div className="grid grid-cols-3 gap-3">
              {BADGES.map((badge) => (
                <div key={badge.id} className={cn("p-4 rounded-2xl border text-center", badge.unlocked ? "bg-accent/10 border-accent" : "bg-muted border-border opacity-50")}>
                  <div className={cn("w-12 h-12 rounded-full mx-auto flex items-center justify-center", badge.unlocked ? "bg-accent" : "bg-muted-foreground/20")}>
                    <BadgeIcon type={badge.icon} unlocked={badge.unlocked} />
                  </div>
                  <p className="text-xs font-medium text-foreground mt-2 truncate">{badge.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="p-4 space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">{t('profile_screen.regional_completion')}</h3>
            {REGION_PROGRESS.map((region) => (
              <div key={region.id} className="p-4 bg-card rounded-2xl border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{region.name}</span>
                  <span className="text-sm font-bold" style={{ color: region.color }}>{region.progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${region.progress}%`, backgroundColor: region.color }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="p-4">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">{t('profile_screen.recently_visited')}</h3>
            <div className="space-y-3">
              {RECENT_HISTORY.map((place) => (
                <button key={place.id} onClick={() => navigate('heritage-detail')} className="w-full flex gap-3 p-3 bg-card rounded-2xl border border-border text-left">
                  <div className="w-16 h-16 rounded-xl bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${place.image})` }} />
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="font-semibold text-foreground">{place.name}</h4>
                    <p className="text-sm text-muted-foreground">{place.date}</p>
                  </div>
                  <ChevronRightIcon className="w-5 h-5 text-muted-foreground self-center" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Active challenges */}
        <div className="px-4 pt-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-muted-foreground">{t('profile_screen.active_challenges')}</h3>
            <button onClick={() => navigate('challenges')} className="text-sm text-accent font-medium flex items-center gap-1">{t('common.view_all')} <ChevronRightIcon className="w-4 h-4" /></button>
          </div>
          <div className="space-y-3">
            {ACTIVE_CHALLENGES.map((challenge) => (
              <div key={challenge.id} className="p-4 bg-card rounded-2xl border border-border">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <TrophyIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{challenge.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{t('profile_screen.reward')}: {challenge.reward}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${(challenge.progress / challenge.total) * 100}%` }} />
                      </div>
                      <span className="text-xs font-medium text-foreground">{challenge.progress}/{challenge.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
