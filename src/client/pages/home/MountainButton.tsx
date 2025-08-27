// src/client/pages/home/MountainButton.tsx
import { Link } from 'react-router-dom'
import { cn } from '../../../lib/utils'

type Props = {
  to: string
  label: string
  /** public 下的路径，如 /media/home/mountain/meili.png */
  imgSrc: string
  imgAlt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** PNG 还没抠透明可临时用：把黑底屏掉 */
  screenBlendHack?: boolean
}

export default function MountainImageButton({
  to,
  label,
  imgSrc,
  imgAlt = 'Mountain',
  size = 'xl',
  screenBlendHack = false,
}: Props) {
  const S =
    size === 'sm'
      ? {
          w: 'w-[150px] md:w-[170px]',
          h: 'h-[78px]  md:h-[90px]',
          text: 'text-sm md:text-base',
          pill: 'px-3 py-1.5 rounded-xl',
          ground: 'w-[82%]',
        }
      : size === 'md'
      ? {
          w: 'w-[200px] md:w-[230px]',
          h: 'h-[110px] md:h-[120px]',
          text: 'text-base md:text-lg',
          pill: 'px-4 py-2 rounded-xl',
          ground: 'w-[86%]',
        }
      : size === 'lg'
      ? {
          w: 'w-[260px] md:w-[300px]',
          h: 'h-[140px] md:h-[160px]',
          text: 'text-lg md:text-xl',
          pill: 'px-5 py-2.5 rounded-2xl',
          ground: 'w-[90%]',
        }
      : {
          // xl：更长更高，单行更稳
          w: 'w-[320px] md:w-[360px]',
          h: 'h-[170px] md:h-[190px]',
          text: 'text-lg md:text-xl',
          pill: 'px-6 py-2.5 rounded-2xl',
          ground: 'w-[92%]',
        }

  return (
    <Link
      to={to}
      className={cn(
        'group relative inline-flex flex-col items-center select-none focus:outline-none',
        'focus-visible:ring-2 focus-visible:ring-white/70 rounded-lg'
      )}
      aria-label={label}
    >
      {/* 地面细线（让山像立在一条线上） */}
      <span
        className={cn(
          'absolute -bottom-1 left-0 right-0 mx-auto h-[2px] rounded-full bg-white/65 transition-all duration-300',
          S.ground,
          'group-hover:w-[96%]'
        )}
      />

      {/* 山图主体 */}
      <span
        className={cn(
          'relative overflow-visible drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)]',
          S.w,
          S.h,
          'transition-transform duration-300 group-hover:scale-[1.04]'
        )}
      >
        <img
          src={imgSrc}
          alt={imgAlt}
          draggable={false}
          loading="lazy"
          className={cn(
            'h-full w-full object-contain pointer-events-none',
            screenBlendHack && 'mix-blend-screen brightness-125'
          )}
        />

        {/* 文字「嵌在山里」：黑底白字，保持单行 */}
        <span
          className={cn(
            'pointer-events-none absolute left-1/2 -translate-x-1/2',
            'bottom-[22%] md:bottom-[24%]',
            'bg-black/70 text-white font-semibold shadow-lg',
            'whitespace-nowrap', // 强制单行
            '[backdrop-filter:saturate(140%)_blur(2px)]',
            S.pill,
            S.text
          )}
        >
          {label}
        </span>

        {/* 顶部轻微高光 */}
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/0 via-white/0 to-white/12 rounded-[6px] opacity-0 group-hover:opacity-100 transition-opacity" />
      </span>
    </Link>
  )
}
