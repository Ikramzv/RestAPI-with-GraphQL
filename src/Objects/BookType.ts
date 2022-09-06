import { Field, ObjectType } from 'type-graphql'

@ObjectType()
class Book {
    @Field(() => String , { nullable: false , name: 'bookName' })
    name: string
}


export default Book