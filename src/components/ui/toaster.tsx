import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  type ToastActionElement,
  type ToastProps,
} from './toast'
import { useToast } from '../../hooks/use-toast'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variant,
        className,
        ...props
      }: {
        id: string
        title?: React.ReactNode
        description?: React.ReactNode
        action?: ToastActionElement
  variant?: string | null
        className?: string
  } & ToastProps) {
        // Provide explicit fallback colors so toasts are visually distinct even if theme tokens are missing
        const variantClass =
          variant === 'success'
            ? 'border-green-500 bg-green-100 text-green-800'
            : variant === 'destructive'
            ? 'border-red-600 bg-red-100 text-red-800'
            : 'border-slate-200 bg-white text-slate-900'

        return (
          <Toast key={id} variant={variant as any} className={`${variantClass} ${className || ''}`} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
