export default deleteUserFn => {
  const beforeUnloadFn = e => {
    e.preventDefault()
    deleteUserFn()
    window.removeEventListener('unload', unloadFn)
  }
  const unloadFn = e => {
    e.preventDefault()
    deleteUserFn()
    window.removeEventListener('beforeunload', beforeUnloadFn)
  }

  window.addEventListener('beforeunload', beforeUnloadFn)
  window.addEventListener('unload', unloadFn)
}
