export function echo() {
  return {
    path: '/echo',
    denormalize(req) {
      return { ...req }
    },
    normalize(res) {
      return { ...res }
    },
    action({ center, method, path, request, platformAction }) {
      return { ...request }
    }
  }
}
