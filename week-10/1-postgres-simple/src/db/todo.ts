import { client } from "..";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
interface Todo {
    id: number;
    user_id: number;
    title: string;
    description: string;
    done: boolean;
}

export async function createTodo(userId: number, title: string, description: string) {
    await client.connect();
    const createTodos = "INSERT INTO TODOS (userId, title, description) VALUES ($1, $2, $3) RETURNING *";
    const values = [userId,title, description];
    const result = await client.query(createTodos, values);
    return result.rows[0];

}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
    await client.connect();
    const UpdateQuery = "UPDATE TODOS SET done=$1 WHERE id=$2 RETURNING *";
    const values = [true, todoId]
    const result= await client.query(UpdateQuery);
    return result.rows[0];
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
    await client.connect();
    try{
        // const getTodosQuery = "SELECT t.title, t.description,t.done,t.id FROM TODOS t JOIN USERS u ON t.user_id = u.id WHERE u.id = ($1)";
        const getTodosQuery="SELECT * FROM TODOS WHERE id=$1"
        const values = [userId];
        const res = await client.query(getTodosQuery, values);
        console.log(res.rows);
        return res.rows;
    }catch(err){
        console.error("Get todo Error has occurred: ", err);
    }finally{
        //await client.end();
    }

}