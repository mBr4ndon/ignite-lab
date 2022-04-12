import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Product } from "./product";

enum PurchaseStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    FAILED = "FAILED"
}

registerEnumType(PurchaseStatus, {
    name: "PurchaseStatus",
    description: "Available purchase status"
});

@ObjectType()
export class Purchase {
    @Field(() => ID)
    id: string;

    @Field(() => PurchaseStatus)
    status: PurchaseStatus;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;

    @Field(() => Product)
    product: Product;

    productId: string;
}