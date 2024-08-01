import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('attachment', (t) => {
    t.timestamps(true, true);
    t.uuid('id').primary().defaultTo(knex.raw('generate_ulid()'));
    t.uuid('creatorId').references('id').inTable('user').notNullable();
    t.uuid('ref_type_id').references('id').inTable('type').notNullable();
    t.uuid('ref_id').notNullable();
    t.integer('sequence').notNullable();
    t.string('description').nullable();
    t.string('name').notNullable();
    t.string('type').notNullable();
    t.string('content_type').notNullable();
    t.integer('content_length').notNullable();
    t.string('status').notNullable().defaultTo("Uploaded");
    t.string('state').notNullable();
    t.unique(['ref_id', 'sequence']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('attachment');
}
