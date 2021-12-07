import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("users", (table) => {
        table.increments("id");
        table.string("firstName", 128).notNullable();
        table.string("lastName", 128).notNullable();
        table.string("otherName");
        table.string("passportUrl").notNullable();
        table.string("email", 128).unique().notNullable();
        table.string("password", 128).notNullable();
        table.boolean("isAdmin").defaultTo(false).notNullable();
        table.string("gender", 128).notNullable();
        table.string("phoneNumber").notNullable();
        table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('users');
}


