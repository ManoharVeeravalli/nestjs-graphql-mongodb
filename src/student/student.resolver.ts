import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Mutation(() => StudentType)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    return this.studentService.createStudent(createStudentInput);
  }

  @Query(() => StudentType)
  async student(@Args('id') id: string): Promise<Student> {
      return this.studentService.getStudent(id);
  }

  @Query(() => [StudentType])
  async students(): Promise<Student[]> {
      return this.studentService.getStudents();
  }
}
