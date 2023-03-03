export class ObjectMapper {
  constructor(dto) {
    Object.keys(dto).forEach(key => key in this? this[key] = dto[key] : null)
  }
}