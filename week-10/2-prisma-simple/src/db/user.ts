import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(username: string, password: string, name: string) {
    const createUsers = await prisma.user.create({
        data:{
            username,
            password,
            name
        },
        select:{
            username:true,
            password:true,
            name:true
        }
    });
    return createUsers;
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

    const getUsers = await prisma.user.findFirst({
        where:{
            id: userId
        },
        select:{
            username:true,
            password:true,
            name:true
        }
    })
    return getUsers;
    
}
