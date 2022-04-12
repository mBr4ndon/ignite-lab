import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CoursesService } from "../../../services/courses.service";
import { EnrollementsService } from "../../../services/enrollments.service";
import { StudentsService } from "../../../services/students.service";
import { AuthorizationGuard } from "../../auth/authorization.guard";
import { CurrentUser, IAuthUser } from "../../auth/current-user";
import { CreateCourseInput } from "../inputs/create-course-input";
import { Course } from "../models/course";


@Resolver(() => Course)
export class CoursesResolver {

    constructor(
        private coursesService: CoursesService,
        private studentsService: StudentsService,
        private enrollmentsService: EnrollementsService
    ) { }

    @Query(() => [Course])
    @UseGuards(AuthorizationGuard)
    courses() {
        return this.coursesService.listAll();
    }

    @Query(() => Course)
    async course(
        @Args("id") id: string,
        @CurrentUser() user: IAuthUser
    ) {
        const student = await this.studentsService.getStudentByAuthUserId(user.sub);

        if (!student) {
            throw new Error("Student not found");
        }

        const enrollment = await this.enrollmentsService.getByCourseAndStudentId(id, student.id);
        return this.coursesService.getCourseById(id);
    }

    @Mutation(() => Course)
    @UseGuards(AuthorizationGuard)
    createCourse(@Args("data") data: CreateCourseInput) {
        return this.coursesService.createCourse({ title: data.title });
    }
}