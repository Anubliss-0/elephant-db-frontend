export const shouldRevalidateOnNonLogin = ({ formAction }: { formAction: string | null }) => {
    const isLoginFormSubmission = formAction && formAction.includes('/login')
    return !isLoginFormSubmission
}