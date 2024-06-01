import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class UsersService {
    private users = [
        {
            "id":1,
            "name":"John Doe",
            "email":"john.doe@gmail.com",
            "role": "INTERN"
        },
        {
            "id":2,
            "name":"Jane Doe",
            "email":"jane@hotmail.com",
            "role": "INTERN"
        },
        {
            "id":3,
            "name":"John Smith",
            "email":"johnsmith@gmail.com",
            "role": "ADMIN"
        },
        {
            "id":4,
            "name":"Jane Smith",
            "email":"janesimith@gmail.com",
            "role": "ADMIN"
        },
        {
            "id":5,
            "name":"Sam Altman",
            "email":"heysam@gmail.com",
            "role": "ENGINEER"
        }
    ]

    findAll(role?: 'INTERN'| 'ENGINEER' | 'ADMIN') {
        if(role) {
            const rolesArray = this.users.filter(user => user.role === role);
            if(!rolesArray.length) throw new NotFoundException(`No users with role ${role}`)
            return rolesArray
        }
        return this.users
    }

    findOne(id: number) {
        const user =  this.users.find(user => user.id === id);
        if(!user) throw new NotFoundException(`User with id ${id} not found`)
        
        return user
    }

    create(createUserDto: CreateUserDto) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if(user.id === id) {
                return {
                    ...user,
                    ...updateUserDto
                }
            }
            return user
        })
        return this.findOne(id)
    }


    delete(id: number) {
        const removedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)

        return removedUser
    }








    // update(id: number, updatedUser: {name: string, email: string, role: 'INTERN'| 'ENGINEER' | 'ADMIN'}) {
    //     const userIndex = this.users.findIndex(user => user.id === id);
    //     this.users[userIndex] = {
    //         ...this.users[userIndex],
    //         ...updatedUser
    //     }
    //     return this.users[userIndex]
    // }


}
