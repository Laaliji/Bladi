"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { SettingsIcon, TrophyIcon, MapPinIcon, ChevronRightIcon } from '../icons'
import { BottomNavigation } from '../bottom-navigation'

interface ProfileScreenProps {
  onSettingsClick?: () => void
  onChallengesClick?: () => void
}

const USER_DATA = {
  name: 'Alexandra Chen',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  country: 'United States',
  countryFlag: 'US',
  memberSince: 'March 2024',
  stats: {
    regionsVisited: 4,
    sitesExplored: 23,
    artisansSupported: 7,
    languagesUsed: 3,
  },
}

const BADGES = [
  { id: '1', name: 'Sahara Explorer', icon: 'desert', unlocked: true, description: 'Visited 3 Saharan sites' },
  { id: '2', name: 'Zellige Master', icon: 'tile', unlocked: true, description: 'Explored zellige workshops' },
  { id: '3', name: 'Storyteller', icon: 'book', unlocked: true, description: 'Used AI Guide 10 times' },
  { id: '4', name: 'Medina Walker', icon: 'walk', unlocked: false, description: 'Walk 10km in medinas' },
  { id: '5', name: 'Culture Champion', icon: 'star', unlocked: false, description: 'Complete 5 challenges' },
  { id: '6', name: 'Heritage Guardian', icon: 'shield', unlocked: false, description: 'Visit all UNESCO sites' },
]

const REGION_PROGRESS = [
  { id: '1', name: 'Marrakech-Safi', progress: 75, color: '#C1121F' },
  { id: '2', name: 'Fes-Meknes', progress: 45, color: '#C9A84C' },
  { id: '3', name: 'Casablanca-Settat', progress: 30, color: '#1B4332' },
  { id: '4', name: 'Draa-Tafilalet', progress: 60, color: '#8B5A2B' },
]

const RECENT_HISTORY = [
  { id: '1', name: 'Koutoubia Mosque', image: 'https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=200&h=150&fit=crop', date: '2 days ago' },
  { id: '2', name: 'Bahia Palace', image: 'https://images.unsplash.com/photo-1548018560-c7196bf66e3c?w=200&h=150&fit=crop', date: '3 days ago' },
  { id: '3', name: 'Jemaa el-Fnaa', image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=200&h=150&fit=crop', date: '1 week ago' },
]

const ACTIVE_CHALLENGES = [
  { id: '1', title: 'Visit 5 UNESCO sites in Marrakech', progress: 3, total: 5, reward: 'Heritage Guardian Badge' },
  { id: '2', title: 'Support 3 local artisans', progress: 2, total: 3, reward: '10% Discount Coupon' },
]

export function ProfileScreen({ onSettingsClick, onChallengesClick }: ProfileScreenProps) {
  const [activeTab, setActiveTab] = useState<'badges' | 'progress' | 'history'>('badges')

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="pt-12 px-4 pb-6 bg-card border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-foreground">Profile</h1>
          <button 
            onClick={onSettingsClick}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
            aria-label="Settings"
          >
            <SettingsIcon className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* User info */}
        <div className="flex items-center gap-4">
          <div 
            className="w-20 h-20 rounded-2xl bg-cover bg-center border-2 border-accent"
            style={{ backgroundImage: `url(${USER_DATA.avatar})` }}
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground">{USER_DATA.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg">{USER_DATA.countryFlag === 'US' ? '🇺🇸' : '🌍'}</span>
              <span className="text-sm text-muted-foreground">{USER_DATA.country}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Member since {USER_DATA.memberSince}</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          {[
            { label: 'Regions', value: USER_DATA.stats.regionsVisited, icon: '🗺️' },
            { label: 'Sites', value: USER_DATA.stats.sitesExplored, icon: '🏛️' },
            { label: 'Artisans', value: USER_DATA.stats.artisansSupported, icon: '👨‍🎨' },
            { label: 'Languages', value: USER_DATA.stats.languagesUsed, icon: '🌐' },
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
        {[
          { id: 'badges' as const, label: 'Badges' },
          { id: 'progress' as const, label: 'Progress' },
          { id: 'history' as const, label: 'History' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 py-3 text-sm font-medium transition-all border-b-2",
              activeTab === tab.id
                ? "text-primary border-primary"
                : "text-muted-foreground border-transparent"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {activeTab === 'badges' && (
          <div className="p-4">
            <div className="grid grid-cols-3 gap-3">
              {BADGES.map((badge) => (
                <div 
                  key={badge.id}
                  className={cn(
                    "p-4 rounded-2xl border text-center",
                    badge.unlocked 
                      ? "bg-accent/10 border-accent" 
                      : "bg-muted border-border opacity-50"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-full mx-auto flex items-center justify-center",
                    badge.unlocked ? "bg-accent" : "bg-muted-foreground/20"
                  )}>
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
            <h3 className="text-sm font-semibold text-muted-foreground">REGIONAL COMPLETION</h3>
            {REGION_PROGRESS.map((region) => (
              <div key={region.id} className="p-4 bg-card rounded-2xl border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{region.name}</span>
                  <span className="text-sm font-bold" style={{ color: region.color }}>{region.progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all"
                    style={{ width: `${region.progress}%`, backgroundColor: region.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="p-4">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">RECENTLY VISITED</h3>
            <div className="space-y-3">
              {RECENT_HISTORY.map((place) => (
                <div key={place.id} className="flex gap-3 p-3 bg-card rounded-2xl border border-border">
                  <div 
                    className="w-16 h-16 rounded-xl bg-cover bg-center flex-shrink-0"
                    style={{ backgroundImage: `url(${place.image})` }}
                  />
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="font-semibold text-foreground">{place.name}</h4>
                    <p className="text-sm text-muted-foreground">{place.date}</p>
                  </div>
                  <ChevronRightIcon className="w-5 h-5 text-muted-foreground self-center" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Active challenges */}
        <div className="px-4 pt-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-muted-foreground">ACTIVE CHALLENGES</h3>
            <button 
              onClick={onChallengesClick}
              className="text-sm text-accent font-medium flex items-center gap-1"
            >
              View all
              <ChevronRightIcon className="w-4 h-4" />
            </button>
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
                    <p className="text-xs text-muted-foreground mt-1">Reward: {challenge.reward}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                        />
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

      {/* Bottom navigation */}
      <BottomNavigation activeTab="profile" onTabChange={() => {}} />
    </div>
  )
}

function BadgeIcon({ type, unlocked }: { type: string; unlocked: boolean }) {
  const color = unlocked ? "text-accent-foreground" : "text-muted-foreground"
  
  switch (type) {
    case 'desert':
      return <svg className={cn("w-6 h-6", color)} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L8 10l-6 2 6 2 4 8 4-8 6-2-6-2-4-8z"/></svg>
    case 'tile':
      return <svg className={cn("w-6 h-6", color)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
    case 'book':
      return <svg className={cn("w-6 h-6", color)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
    case 'walk':
      return <svg className={cn("w-6 h-6", color)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="4" r="2"/><path d="M15 22v-4l-3-3 2-4 3 1v-3"/><path d="M9 22l3-8-2-3"/></svg>
    case 'star':
      return <svg className={cn("w-6 h-6", color)} viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    case 'shield':
      return <svg className={cn("w-6 h-6", color)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    default:
      return <TrophyIcon className={cn("w-6 h-6", color)} />
  }
}
