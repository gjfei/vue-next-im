module.exports = {
  username: { type: String, unique: true },
  password: { type: String, required: true },
  avatarId: { type: String, required: true }
}