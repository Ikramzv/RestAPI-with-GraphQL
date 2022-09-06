import { Field, ObjectType } from 'type-graphql'

@ObjectType()

class Client {
    @Field(() => String)
    _id: string
    
    @Field(() => String)
    name: string

    @Field(() => String)
    email: string

    @Field(() => String)
    phone: string
}

export default Client