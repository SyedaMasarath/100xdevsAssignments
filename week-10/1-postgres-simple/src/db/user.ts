import { client } from "..";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
// Using parameterized query to prevent SQL injection
export async function createUser(username: string, password: string, name: string) {
    await client.connect();
    const Insertquery = "INSERT INTO USERS (username, password, name) VALUES ($1, $2, $3) RETURNING username, password, name";
    const values = [username, password, name]
    const result = await client.query(Insertquery, values);
    console.log('Inserted Successfully:', result.rows[0]); 
    return result.rows[0];
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
    await client.connect();
    const getQuery = "Select * FROM USERS WHERE id=$1";
    const result = await client.query(getQuery,[userId]);
    return result.rows[0];
}
