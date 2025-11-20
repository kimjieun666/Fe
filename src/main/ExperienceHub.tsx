import { useMemo, useRef, useState, type ElementType } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ExternalLink, Layers } from 'lucide-react';
import ProjectBoardApp from '../projectBoardApp';

type ExperienceId = 'projectBoard';

const experiences: Record<
  ExperienceId,
  { title: string; subtitle: string; accent: string; icon: ElementType; blurb: string }
> = {
  projectBoard: {
    title: '프로젝트 운영 허브',
    subtitle: 'Project Ops',
    accent: 'from-blue-500/30 via-sky-500/20 to-indigo-500/10',
    icon: Layers,
    blurb: '영업부터 납품까지 이어지는 Work Hub 프로젝트 보드를 바로 실행해서 체험할 수 있습니다.'
  }
};

export function ExperienceHub() {
  const [active, setActive] = useState<ExperienceId | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const ActiveApp = useMemo(() => {
    if (active === 'projectBoard') {
      return <ProjectBoardApp />;
    }
    return null;
  }, [active]);

  const handleLaunch = (id: ExperienceId) => {
    setActive(id);
    requestAnimationFrame(() => {
      previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <section id="work-hub" className="py-24 px-4 bg-gradient-to-b from-black via-gray-950/70 to-black relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-16 w-96 h-96 rounded-full blur-3xl bg-blue-500/10"
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-10 w-80 h-80 rounded-full blur-3xl bg-indigo-500/10"
          animate={{ opacity: [0.15, 0.35, 0.15], scale: [1.05, 1, 1.05] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-200/70">Work Hub Experiences</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-white">메인에서 바로 실행하는 커뮤니티 데모</h2>
          <p className="text-blue-100/70 max-w-3xl mx-auto">
            Claims 사례를 Work Hub 안에서 바로 실행해 볼 수 있습니다. 버튼 한 번으로 즉시 로드됩니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {(Object.keys(experiences) as ExperienceId[]).map((id) => {
            const ExpIcon = experiences[id].icon;
            return (
              <motion.div
                key={id}
                className="relative rounded-2xl border border-blue-400/10 bg-white/5 backdrop-blur-sm p-5 shadow-lg overflow-hidden"
                whileHover={{ y: -4, scale: 1.01 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${experiences[id].accent} opacity-60`} />
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center gap-2 text-blue-100">
                    <ExpIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">{experiences[id].subtitle}</span>
                  </div>
                  <h3 className="text-xl text-white font-semibold">{experiences[id].title}</h3>
                  <p className="text-blue-50/80 text-sm leading-relaxed">{experiences[id].blurb}</p>
                  <div className="flex items-center gap-3 pt-2">
                    <motion.button
                      className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium flex items-center gap-2 shadow-md"
                      onClick={() => handleLaunch(id)}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      바로 실행
                    </motion.button>
                    {active === id && (
                      <span className="text-xs text-emerald-200/80 border border-emerald-400/40 rounded-full px-3 py-1">
                        실행 중
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div ref={previewRef} className="mt-12">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active}
                className="rounded-2xl border border-blue-400/15 bg-slate-950/70 shadow-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-blue-400/10 bg-black/60">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-blue-200/60">Work Hub Preview</p>
                    <h4 className="text-lg text-white font-semibold">{experiences[active].title}</h4>
                  </div>
                  <motion.button
                    className="flex items-center gap-2 text-sm text-blue-100/80 hover:text-white px-3 py-2 rounded-lg border border-blue-400/30"
                    onClick={() => setActive(null)}
                    whileTap={{ scale: 0.97 }}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Work Hub 홈으로
                  </motion.button>
                </div>
                <div className="bg-black">
                  <div className="min-h-[820px] w-full overflow-hidden">
                    {ActiveApp}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="rounded-2xl border border-blue-400/15 bg-slate-950/50 p-10 text-center shadow-2xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <p className="text-blue-100/70 text-lg">실행할 경험을 선택하면 이 영역에 바로 로드됩니다.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
