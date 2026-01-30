export class Encrypter {
  async hash(value) {
    throw new Error("Method 'hash' must be implemented");
  }

  async compare(value, hash) {
    throw new Error("Method 'compare' must be implemented");
  }
}
