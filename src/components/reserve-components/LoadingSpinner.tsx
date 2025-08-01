// import { useState, useEffect } from 'react'
// import clsx from 'clsx'

// interface LoadingSpinnerProps {
//   size?: 'small' | 'medium' | 'large'
//   className?: string
//   variant?: 'spinner' | 'dots' | 'pulse' | 'wave' | 'progress'
//   showProgress?: boolean
//   progress?: number
//   messages?: string[]
//   duration?: number
// }

// export const LoadingSpinner = ({ 
//   size = 'medium', 
//   className,
//   variant = 'spinner',
//   showProgress = false,
//   progress = 0,
//   messages = [],
//   duration = 3000
// }: LoadingSpinnerProps) => {
//   const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
//   const [animatedProgress, setAnimatedProgress] = useState(0)

//   const sizeClasses = {
//     small: 'h-4 w-4',
//     medium: 'h-8 w-8',
//     large: 'h-16 w-16',
//   }

//   const containerSizes = {
//     small: 'h-6 w-6',
//     medium: 'h-12 w-12',
//     large: 'h-20 w-20',
//   }

//   // Cycle through messages
//   useEffect(() => {
//     if (messages.length > 1) {
//       const interval = setInterval(() => {
//         setCurrentMessageIndex((prev) => (prev + 1) % messages.length)
//       }, duration)
//       return () => clearInterval(interval)
//     }
//   }, [messages.length, duration])

//   // Animate progress
//   useEffect(() => {
//     if (showProgress) {
//       const timer = setTimeout(() => {
//         setAnimatedProgress(progress)
//       }, 100)
//       return () => clearTimeout(timer)
//     }
//   }, [progress, showProgress])

//   const renderSpinner = () => {
//     switch (variant) {
//       case 'dots':
//         return (
//           <div className={clsx('flex space-x-1', containerSizes[size])}>
//             {[0, 1, 2].map((i) => (
//               <div
//                 key={i}
//                 className={clsx(
//                   'bg-current rounded-full animate-bounce',
//                   size === 'small' ? 'w-1 h-1' : size === 'medium' ? 'w-2 h-2' : 'w-3 h-3'
//                 )}
//                 style={{ animationDelay: `${i * 150}ms` }}
//               />
//             ))}
//           </div>
//         )

//       case 'pulse':
//         return (
//           <div className={clsx('relative', containerSizes[size])}>
//             <div className={clsx('absolute inset-0 bg-current rounded-full animate-ping opacity-20')} />
//             <div className={clsx('absolute inset-0 bg-current rounded-full animate-pulse opacity-40')} />
//             <div className={clsx('relative bg-current rounded-full', sizeClasses[size], 'mx-auto mt-2')} />
//           </div>
//         )

//       case 'wave':
//         return (
//           <div className={clsx('flex items-end space-x-1', containerSizes[size])}>
//             {[0, 1, 2, 3, 4].map((i) => (
//               <div
//                 key={i}
//                 className={clsx(
//                   'bg-current animate-wave',
//                   size === 'small' ? 'w-0.5' : size === 'medium' ? 'w-1' : 'w-1.5'
//                 )}
//                 style={{ 
//                   animationDelay: `${i * 100}ms`,
//                   height: size === 'small' ? '8px' : size === 'medium' ? '16px' : '24px'
//                 }}
//               />
//             ))}
//           </div>
//         )

//       case 'progress':
//         return (
//           <div className={clsx('relative', containerSizes[size])}>
//             <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
//               <path
//                 className="stroke-current opacity-20"
//                 strokeWidth="3"
//                 fill="none"
//                 d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//               />
//               <path
//                 className="stroke-current transition-all duration-1000 ease-out"
//                 strokeWidth="3"
//                 strokeLinecap="round"
//                 fill="none"
//                 strokeDasharray={`${animatedProgress}, 100`}
//                 d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//               />
//             </svg>
//             {showProgress && (
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <span className={clsx(
//                   'font-semibold text-current',
//                   size === 'small' ? 'text-xs' : size === 'medium' ? 'text-sm' : 'text-base'
//                 )}>
//                   {Math.round(animatedProgress)}%
//                 </span>
//               </div>
//             )}
//           </div>
//         )

//       default: // spinner
//         return (
//           <div className={clsx('animate-spin-smooth', sizeClasses[size])}>
//             <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//               <circle
//                 className="opacity-20"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="3"
//               />
//               <path
//                 className="opacity-80"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//               />
//             </svg>
//           </div>
//         )
//     }
//   }

//   return (
//     <div className={clsx('flex flex-col items-center space-y-4', className)}>
//       {renderSpinner()}
//       {messages.length > 0 && (
//         <div className="text-center min-h-[1.5rem]">
//           <p className={clsx(
//             'transition-all duration-500 ease-in-out transform',
//             'animate-fade-in-up text-current opacity-80',
//             size === 'small' ? 'text-sm' : size === 'medium' ? 'text-base' : 'text-lg'
//           )}>
//             {messages[currentMessageIndex]}
//           </p>
//         </div>
//       )}
//     </div>
//   )
// }
// const loadingMessages = [
//     "Initializing your workspace...",
//     "Loading user preferences...",
//     "Connecting to services...",
//     "Preparing your dashboard...",
//     "Almost ready!"
//   ]

// // This is done on tailwind 

//   {/* Alternative loading animations showcase */}
//   <div className="flex justify-center space-x-8 mt-12 opacity-60">
//   <LoadingSpinner size="small" variant="dots" className="text-indigo-400" />
//   <LoadingSpinner size="small" variant="wave" className="text-purple-400" />
//   <LoadingSpinner size="small" variant="pulse" className="text-blue-400" />
// </div>


 {/* Main loading spinner with dynamic messages */}
//  <div className="mb-12">
//  <LoadingSpinner
//    size="large"
//    variant="spinner"
//    className="text-indigo-600 mx-auto mb-8"
//    messages={loadingMessages}
//    duration={2000}
//  />
// </div>