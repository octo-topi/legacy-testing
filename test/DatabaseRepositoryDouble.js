class DatabaseRepositoryDouble {
  constructor({ blogs }) {
    this.blogs = blogs;
    this.callCount = 0;
  }

  listAllBlogs() {
    this.callCount++;
    return this.blogs;
  }

  hasBeenCalledOnce() {
    return this.callCount === 1;
  }

  resetCalls() {
    this.callCount = 0;
  }
}

export { DatabaseRepositoryDouble };
