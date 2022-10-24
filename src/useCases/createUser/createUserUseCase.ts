import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"
import {v4 as uuidv4} from "uuid"

const prisma = new PrismaClient()

interface userRequest{
    "id"?:          string   
    "name":         string
    "username":     string
    "email":        string
    "passwd":       string 
    "createdAt"?:   Date
    "updatedAt"?:   Date
}


class CreateUserUseCase {
    async execute({name, username, email, passwd}:userRequest){
        const userAlreadyExists = await prisma.user.findFirst({
            where: {
                username,
            }
        }) 
        if (userAlreadyExists) {
            throw new Error("User already exists!")
        }
        
        const passwdHash = await hash(passwd, 8)
        
        
        const user = await prisma.user.create({
            data:{
                id: uuidv4(),
                name,
                username,
                email,
                passwd: passwdHash,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })    
        return user
    }
}

export { CreateUserUseCase }
