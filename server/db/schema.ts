import  {
  pgTable, serial, varchar, text, timestamp, integer, boolean,primaryKey, foreignKey, uuid
} from 'drizzle-orm/pg-core';

// Пользователи
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 64 }).notNull().unique(),
  email: varchar('email', { length: 128 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

// Друзья (M:M)
export const friends = pgTable('friends', {
  userId: integer('user_id').notNull().references(() => users.id),
  friendId: integer('friend_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
}, (t) => ({
  pk: primaryKey(t.userId, t.friendId)
}))

// Миры
export const worlds = pgTable('worlds', {
  id: serial('id').primaryKey(),
  ownerId: integer('owner_id').references(() => users.id).notNull(),
  title: varchar('title', { length: 100 }).notNull(),
  description: text('description'),
  isPrivate: boolean('is_private').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Файлы миров
export const worldFiles = pgTable('world_files', {
  id: serial('id').primaryKey(),
  worldId: integer('world_id').references(() => worlds.id).notNull(),
  fileType: varchar('file_type', { length: 20 }), // glb, json и т.д.
  path: text('path').notNull(),
})

// Лайки на мир
export const likes = pgTable('likes', {
  userId: integer('user_id').references(() => users.id).notNull(),
  worldId: integer('world_id').references(() => worlds.id).notNull(),
}, (t) => ({
  pk: primaryKey(t.userId, t.worldId)
}))

// Комментарии (в стиле чата)
export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  worldId: integer('world_id').references(() => worlds.id).notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow()
})

// Ачивки
export const achievements = pgTable('achievements', {
  id: serial('id').primaryKey(),
  code: varchar('code', { length: 50 }).notNull().unique(), // например "100_TREES"
  title: varchar('title', { length: 100 }),
  description: text('description')
})

// Полученные ачивки
export const userAchievements = pgTable('user_achievements', {
  userId: integer('user_id').references(() => users.id).notNull(),
  achievementId: integer('achievement_id').references(() => achievements.id).notNull(),
  unlockedAt: timestamp('unlocked_at').defaultNow()
}, (t) => ({
  pk: primaryKey(t.userId, t.achievementId)
}))
