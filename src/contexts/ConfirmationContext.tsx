import { createContext, useState, useContext, ReactNode } from 'react'

interface ConfirmationContextType {
    showWarning: boolean
    setShowWarning: (showWarning: boolean) => void
    warningMessage: string
    setWarningMessage: (warningMessage: string) => void
    onConfirm: () => void
    setOnConfirm: (callback: () => void) => void
}

const ConfirmationContext = createContext<ConfirmationContextType | undefined>(undefined)

export function ConfirmationProvider({ children }: { children: ReactNode }) {
    const [showWarning, setShowWarning] = useState(false)
    const [warningMessage, setWarningMessage] = useState('')
    const [onConfirm, setOnConfirm] = useState<() => void>(() => {})

    return (
        <ConfirmationContext.Provider value={{ showWarning, setShowWarning, warningMessage, setWarningMessage, onConfirm, setOnConfirm }}>
            {children}
        </ConfirmationContext.Provider>
    )
}

export const useConfirmation = (): ConfirmationContextType => {
    const context = useContext(ConfirmationContext)
    if (!context) {
        throw new Error('useConfirmation must be used within a ConfirmationProvider')
    }
    return context
}