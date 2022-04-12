import { UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { EnrollementsService } from "../../../services/enrollments.service";
import { StudentsService } from "../../../services/students.service";
import { AuthorizationGuard } from "../../auth/authorization.guard";
import { CurrentUser, IAuthUser } from "../../auth/current-user";
import { Enrollment } from "../models/enrollment";
import { Student } from "../models/student";

@Resolver(() => Student)
export class StudentsResolver {

    constructor(
        private studentsService: StudentsService,
        private enrollmentsService: EnrollementsService
    ) { }

    @Query(() => Student)
    @UseGuards(AuthorizationGuard)
    me(@CurrentUser() user: IAuthUser) {
        return this.studentsService.getStudentById(user.sub);
    }

    @ResolveField(() => [Enrollment])
    enrollments(
        @Parent() student: Student
    ) {
        return this.enrollmentsService.listEnrollmentsByStudentId(student.id);
    }
}