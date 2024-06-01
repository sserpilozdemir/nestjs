import { Body, Controller, Get, Param, Post, Patch, Delete, Query, ParseIntPipe, ValidationPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')    // /users -> decorators
export class UsersController {
    // const userService = new UsersService()
    constructor(private readonly usersService: UsersService){}

    @Get() //GET /users or /users?role=value&age=42
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN'){
        return this.usersService.findAll(role)
    }

    // @Get('interns') //GET /users/interns
    // findInterns(){
    //     return []
    // }

    @Get(':id')  //GET /users/:id
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.usersService.findOne(id)
    }

    @Post() // POST /users
    create(@Body(ValidationPipe) createUserDto: CreateUserDto){
        return this.usersService.create(createUserDto) 
    }

    @Patch(':id') //    PATCH /users/:id
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto ){
        return this.usersService.update(id, updateUserDto)
    }

    @Delete(':id') // DELETE /users/:id
    delete(@Param('id', ParseIntPipe) id: number){
        return this.usersService.delete(id)
    }

}
