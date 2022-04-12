import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";

@Injectable()
export class EnrollementsService {
    constructor(private prisma: PrismaService) { }

    listAll() {
        return this.prisma.enrollment.findMany({
            where: {
                canceledAt: null
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    listEnrollmentsByStudentId(studentId: string) {
        return this.prisma.enrollment.findMany({
            where: {
                studentId,
                canceledAt: null
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    getByCourseAndStudentId(courseId: string, studentId: string) {
        return this.prisma.enrollment.findFirst({
            where: {
                courseId,
                studentId,
                canceledAt: null
            }
        });
    }
}