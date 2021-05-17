import {
  Query,
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Student } from 'src/student/student.entity';
import { StudentService } from 'src/student/student.service';
import { StudentType } from 'src/student/student.type';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

  @Query((returns) => [LessonType])
  async lessons(): Promise<Lesson[]> {
    return this.lessonService.getLessons();
  }

  @Query((returns) => LessonType)
  async lesson(@Args('id') id: string): Promise<Lesson> {
    return this.lessonService.getLesson(id);
  }

  @Mutation((returs) => LessonType)
  async createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ): Promise<Lesson> {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation((returs) => LessonType)
  async assignStudentsToLesson(
    @Args('assignStudentsToLessonInput')
    { lessonId, studentIds }: AssignStudentsToLessonInput,
  ): Promise<Lesson> {
    return this.lessonService.assignStudentsToLesson(lessonId, ...studentIds);
  }

  @ResolveField(() => [StudentType])
  async students(@Parent() lesson: Lesson): Promise<Student[]> {
    return this.studentService.getManyStudents(lesson.students);
  }
}
