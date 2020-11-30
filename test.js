const err = {
  error: {
    notJoi: true
  }
}
const { code, error } = (err.error && err.error.isJoi)
  ? { code: 400, error: err.error }
  : { code: 500, error: 'An internal server error ocurred' }

console.log(code, error)
