export const shouldRevalidateOnNonAuthAction = ({ formAction }: { formAction: string | null }) => {
    const isAuthAction = formAction && (
        formAction.includes('/login') || 
        formAction.includes('/logout')
    )
    return !isAuthAction
}