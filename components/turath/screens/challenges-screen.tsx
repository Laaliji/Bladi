"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ChevronLeftIcon, TrophyIcon, MapPinIcon, StarIcon } from '../icons'
import { useNavigation } from '../navigation-provider'
import { useTranslation } from '../language-provider'

// Data arrays moved inside component for translation

function CategoryIcon({ category, active }: { category: string; active: boolean }) {
  const color = active ? "text-primary" : "text-muted-foreground"
  switch (category) {
    case 'explorer': return <MapPinIcon className={cn("w-6 h-6", color)} />
    case 'cultural': return <svg className={cn("w-6 h-6", color)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
    case 'artisan': return <svg className={cn("w-6 h-6", color)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
    case 'historian': return <svg className={cn("w-6 h-6", color)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
    default: return <StarIcon className={cn("w-6 h-6", color)} filled />
  }
}

interface ChallengesScreenProps {
  isDark?: boolean
}

export function ChallengesScreen({ isDark }: ChallengesScreenProps) {
  void isDark
  const { goBack } = useNavigation()
  const { t } = useTranslation()

  const CHALLENGE_CATEGORIES = [
    { id: 'all', label: t('home_map.all') },
    { id: 'explorer', label: t('challenges.explorer') },
    { id: 'cultural', label: t('challenges.cultural') },
    { id: 'artisan', label: t('challenges.artisan') },
    { id: 'historian', label: t('challenges.historian') },
  ]

  const CHALLENGES = [
    { id: '1', title: t('data.challenge_titles.visit_5_unesco'), description: t('data.challenge_descriptions.visit_5_unesco'), category: 'explorer', progress: 3, total: 5, reward: t('data.rewards.heritage_guardian'), rewardIcon: 'shield', active: true },
    { id: '2', title: t('data.challenge_titles.support_3_artisans'), description: t('data.challenge_descriptions.support_3_artisans'), category: 'artisan', progress: 2, total: 3, reward: t('data.rewards.discount_10'), rewardIcon: 'ticket', active: true },
    { id: '3', title: t('data.challenge_titles.ai_guide_3_languages'), description: t('data.challenge_descriptions.ai_guide_3_languages'), category: 'cultural', progress: 1, total: 3, reward: t('data.rewards.polyglot_badge'), rewardIcon: 'globe', active: true },
    { id: '4', title: t('data.challenge_titles.almohad_dynasty'), description: t('data.challenge_descriptions.almohad_dynasty'), category: 'historian', progress: 0, total: 4, reward: t('data.rewards.historian_badge'), rewardIcon: 'book', active: false },
    { id: '5', title: t('data.challenge_titles.walk_10km_fes'), description: t('data.challenge_descriptions.walk_10km_fes'), category: 'explorer', progress: 4, total: 10, reward: t('data.rewards.medina_walker'), rewardIcon: 'walk', active: true },
  ]

  const LEADERBOARD = [
    { rank: 1, name: 'Sarah M.', country: 'UK', flag: '🇬🇧', points: 2840, badge: t('data.rewards.heritage_guardian') },
    { rank: 2, name: 'Ahmed K.', country: 'Morocco', flag: '🇲🇦', points: 2650, badge: t('data.rewards.zellige_master') },
    { rank: 3, name: t('data.leaderboard.you'), country: 'USA', flag: '🇺🇸', points: 1920, badge: t('data.rewards.storyteller'), isUser: true },
    { rank: 4, name: 'Marie L.', country: 'France', flag: '🇫🇷', points: 1850, badge: t('challenges.explorer') },
    { rank: 5, name: 'Kenji T.', country: 'Japan', flag: '🇯🇵', points: 1720, badge: t('challenges.artisan') },
  ]

  const UNLOCKED_REWARDS = [
    { id: '1', type: 'coupon', title: t('data.rewards.discount_15'), code: 'TURATH15', expiry: t('challenges.valid_until_dec') },
    { id: '2', type: 'content', title: t('challenges.exclusive_video'), description: t('challenges.behind_scenes') },
  ]

  const [activeCategory, setActiveCategory] = useState('all')
  const [activeTab, setActiveTab] = useState<'challenges' | 'leaderboard' | 'rewards'>('challenges')

  const filteredChallenges = activeCategory === 'all' ? CHALLENGES : CHALLENGES.filter(c => c.category === activeCategory)

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="pt-12 px-4 pb-4 bg-card border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={goBack} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center" aria-label="Go back">
            <ChevronLeftIcon className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">{t('challenges.challenges_rewards_title')}</h1>
        </div>
        <div className="flex gap-2">
          {(['challenges', 'leaderboard', 'rewards'] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={cn("flex-1 py-2 rounded-xl text-sm font-medium capitalize transition-all", activeTab === tab ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
              {tab === 'rewards' ? t('challenges.rewards_tab') : t(`challenges.${tab}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-8">
        {activeTab === 'challenges' && (
          <>
            <div className="px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide border-b border-border">
              {CHALLENGE_CATEGORIES.map((cat) => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={cn("px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all", activeCategory === cat.id ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground")}>
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="p-4 space-y-3">
              {filteredChallenges.map((challenge) => (
                <div key={challenge.id} className={cn("p-4 rounded-2xl border", challenge.active ? "bg-card border-border" : "bg-muted/50 border-border/50 opacity-70")}>
                  <div className="flex items-start gap-3">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", challenge.active ? "bg-primary/10" : "bg-muted")}>
                      <CategoryIcon category={challenge.category} active={challenge.active} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{challenge.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{challenge.description}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full transition-all", challenge.active ? "bg-primary" : "bg-muted-foreground")} style={{ width: `${(challenge.progress / challenge.total) * 100}%` }} />
                        </div>
                        <span className="text-xs font-medium text-foreground">{challenge.progress}/{challenge.total}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-3 p-2 bg-accent/10 rounded-lg">
                        <TrophyIcon className="w-4 h-4 text-accent" />
                        <span className="text-xs font-medium text-accent">{challenge.reward}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'leaderboard' && (
          <div className="p-4 space-y-3">
            {LEADERBOARD.map((entry) => (
              <div key={entry.rank} className={cn("flex items-center gap-3 p-4 rounded-2xl border", entry.isUser ? "bg-accent/10 border-accent" : "bg-card border-border")}>
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold", entry.rank === 1 && "bg-amber-500 text-white", entry.rank === 2 && "bg-gray-400 text-white", entry.rank === 3 && "bg-amber-700 text-white", entry.rank > 3 && "bg-muted text-muted-foreground")}>
                  {entry.rank}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{entry.flag}</span>
                    <span className={cn("font-semibold", entry.isUser ? "text-accent" : "text-foreground")}>{entry.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{entry.badge}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">{entry.points.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{t('challenges.points_suffix')}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="p-4 space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase">{t('challenges.unlocked_rewards')}</h3>
            {UNLOCKED_REWARDS.map((reward) => (
              <div key={reward.id} className="p-4 bg-card rounded-2xl border border-border">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    {reward.type === 'coupon' ? (
                      <svg className="w-6 h-6 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                    ) : (
                      <svg className="w-6 h-6 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{reward.title}</h4>
                    {reward.code && (
                      <div className="flex items-center gap-2 mt-2">
                        <code className="px-3 py-1 bg-muted rounded-lg text-sm font-mono text-foreground">{reward.code}</code>
                        <button className="text-xs text-accent font-medium">Copy</button>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">{reward.expiry || reward.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
