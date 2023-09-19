export function BuildRoutePath(path) {

    const routePath = /:([a-zA-Z]+)/g
    const pathWithParams = path.replaceAll(routePath, '(?<$1>[a-z0-9\-_]+)')

    const pathRegex = new RegExp(`^${pathWithParams}$`)

    return pathRegex
}