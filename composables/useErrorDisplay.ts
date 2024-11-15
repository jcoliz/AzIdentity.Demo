
/**
 * The most recent error details reported by the low-level components, 
 * or undefined if no error since last call
 */
const errorDetails = ref<string|undefined>()

/**
 * Whether to show the error details display
 */
const showError = ref<boolean|undefined>(false)

/**
 * Composable to retain latest network problem details
 *
 * @returns
 */
export function useErrorDisplay() {  

    function setError(message:string)
    {
        errorDetails.value = message
        showError.value = true
        console.error(message)
    }
    
    return { setError, showError, errorDetails }
}
