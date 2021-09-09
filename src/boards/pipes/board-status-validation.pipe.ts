import {PipeTransform,ArgumentMetadata, BadRequestException} from '@nestjs/common'
import { BoardStatus } from '../board-status.enum'

export class BoardStatusValidationPipe implements PipeTransform{
    readonly StatusOption = [
        BoardStatus.PUBLIC,
        BoardStatus.PRIVATE,
    ]
    transform(value:any){
        value = value.toUpperCase();

        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} isn't in the status option`);
        }

        return value
    }

    private isStatusValid(status : any){
        return this.StatusOption.indexOf(status) !== -1
    }
}