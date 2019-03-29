
const UNDEFINED_ERROR_ID = 999;

module.exports = {
  handleError: (params = {}, error) => {
    return {
      id: params.id || UNDEFINED_ERROR_ID,
      message: params.message || 'System error',
      type: params.type || 'common',
      hint: params.hint || 'Try to refresh the page or write to the support',
      extralInfo: JSON.stringify(error)
    }
  }
}