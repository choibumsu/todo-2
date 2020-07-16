export class Emitter {
  on(type, callback) {
    this['_on' + type] = this['_on' + type] || []
    this['_on' + type].push(callback)
  }

  emit(type, args) {
    this['_on' + type] &&
      this['_on' + type].forEach((callback) => {
        callback(args)
      })
  }
}
