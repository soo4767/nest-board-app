import { Injectable, NotFoundException } from '@nestjs/common';
import {BoardStatus} from './board-status.enum'
import {v1 as uuid} from 'uuid'
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository : BoardRepository,
        ){}

    async getAllBoards():Promise<Board[]>{
        return await this.boardRepository.find()
    }    

    createBoard(createBoardDto : CreateBoardDto, user : User):Promise<Board>{
        return this.boardRepository.createBoard(createBoardDto,user);
    }


    async getBoardById(id:number):Promise<Board>{
        const found = await this.boardRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found
    }


    async deleteBoard(id:number):Promise<void>{
        const result = await this.boardRepository.delete(id);

        if(result.affected === 0){
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }
    }

    async updateBoardStatus(id:number,status:BoardStatus):Promise<void>{
        const result = await this.boardRepository.update(id,{status:status})
        if(result.affected === 0){
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }
    }
}
