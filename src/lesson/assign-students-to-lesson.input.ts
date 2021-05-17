import { Field, InputType, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
@InputType()
export class AssignStudentsToLessonInput {
  @Field(() => [ID])
  @IsUUID('4', { each: true })
  studentIds: string[];

  @IsUUID()
  @Field(() => ID)
  lessonId: string;
}
