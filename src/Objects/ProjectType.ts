import { Field, ObjectType, registerEnumType } from 'type-graphql'

export enum StatusEnum {
    NotStarted = 'Not Started',
    Progress = 'Progress',
    Completed = 'Completed',
}

registerEnumType(StatusEnum, { name: 'ProjectStatus' , description: 'This is Project Status' })

@ObjectType()
class Project {
    @Field(() => String)
    name: string

    @Field(() => String)
    _id: string
    
    @Field(() => String)
    description: string
    
    @Field(() => StatusEnum , { defaultValue: "Not Started" })
    status: StatusEnum
    
    @Field(() => String ,{ defaultValue: "6313b6cf7f7a114517afe95f" })
    clientId: string
}

export default Project