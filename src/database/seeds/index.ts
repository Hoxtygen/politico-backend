import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { firstName: "John", lastName: "McAfee", email: "hoxtygen@live.com", isAdmin: true, phoneNumber: "090123456789", passportUrl: "https://res.cloudinary.com/dh3jxarvg/image/upload/v1551327976/olitorius_xnr3f8.jpg", password: "12345678" },

        { firstName: "Alan", lastName: "Hansen", email: "hansen_alan@example.com", phoneNumber: "090123456789", passportUrl: "https://res.cloudinary.com/dh3jxarvg/image/upload/v1551327976/olitorius_xnr3f8.jpg", password: "12345678" },

        { firstName: "Fred", lastName: "Nietzche", email: "fred@aol.com", phoneNumber: "090123456789", passportUrl: "https://res.cloudinary.com/dh3jxarvg/image/upload/v1551327976/olitorius_xnr3f8.jpg", password: "12345678" },

        { firstName: "Kelly", lastName: "Ferdinand", email: "kelly_ferd@example.com", phoneNumber: "090123456789", passportUrl: "https://res.cloudinary.com/dh3jxarvg/image/upload/v1551327976/olitorius_xnr3f8.jpg", password: "12345678" },
    ]);
};