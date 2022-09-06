import { Arg, Field, FieldResolver, InputType, Mutation, Query, Resolver, Root } from 'type-graphql'
import ClientData from '../mongoSchemas/clientSchema'
import ProjectData from '../mongoSchemas/projectSchema'
import Client from '../Objects/ClientType'
import Project, { StatusEnum } from '../Objects/ProjectType'

@InputType()
class ProjectInput {
    @Field(() => String)
    name: string

    @Field(() => String)
    description: string

    @Field(() => String , { defaultValue: 'Not Started' })
    status: StatusEnum

    @Field(() => String , { defaultValue: '63165267d5b85837e7b93298' })
    clientId: string
}

@InputType() 
class UpdateInput {
    @Field(() => String , { nullable: true })
    name: string
    @Field(() => String , { nullable: true })
    description: string
}

@Resolver(() => Project)
class ProjectResolver {

    @FieldResolver(() => Client)
    async client(
        @Root() root: Project
    ) {
        try {
            const c = await ClientData.findById((root as any)._doc.clientId)
            return c
        } catch (error) {
            console.log(error)
            return error
        }
    }

    @Query(() => [Project])
    async projects() { 
        const data = await ProjectData.find()
                
        return data
    }
    
    @Query(() => Project)
    async project(
        @Arg('projectId') id: string,
    ) {
        try {
            const data = await ProjectData.findById(id)
            
            return data
        } catch (error) {
            console.log(error)
        }
    }

    @Mutation(() => Project)
    async createProject(
        @Arg('options' , () => ProjectInput) options: ProjectInput
    ) { 
        try {
            if(!options.status) options.status = StatusEnum.NotStarted
            const data = await ProjectData.create(options)
            await data.save()
            return data
        } catch (error) {
            console.log(error)
        }
    }

    @Mutation(() => Boolean)
    async deleteProject(
        @Arg('id' , () => String) id: string 
    ) {
        try {
            const data = await ProjectData.findByIdAndDelete(id)
            return data ? true : false
        } catch (error) {
            console.log(error)
            return false
        }
    }

    @Mutation(() => Project)
    async updateProject(
        @Arg('id' , () => String) projectId: string,
        @Arg('options' , () => UpdateInput) options: UpdateInput
    ) {
        try {
            if(Object.entries(options).map(([key,value]) => value).length === 0) return new Error('At least one argument must be provided')
            const data = await ProjectData.findByIdAndUpdate(projectId, {
                $set: options
            } , { new: true })

            return data
        } catch (error) {
            console.log(error)
        }
    }
}

export default ProjectResolver