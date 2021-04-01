export function errorHandler(target, propertyKey, descriptor?): void {
  const originalInitializer = descriptor.initializer
  const newInitializer = function() {
    return new Proxy(originalInitializer, {
      apply: async (target, thisArg, argumentList) => {
        try {
          const originalAsyncMethod = target.apply(thisArg, argumentList)
          return await originalAsyncMethod(argumentList)
        } catch(err) {
          console.log("@errorHandler error", err)
        }
      }
    })
  }

  descriptor.initializer = newInitializer
}
