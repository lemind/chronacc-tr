module.exports = {
  async up(db) {
    await db.createCollection('tasks');
    await db.createCollection('projects');
  },

  async down(db) {
    await db.collection('tasks').drop();
    await db.collection('projects').drop();
  }
};
