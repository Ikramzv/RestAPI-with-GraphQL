import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql'
import ClientData from '../mongoSchemas/clientSchema'
import projectData from '../mongoSchemas/projectSchema'
import Client from '../Objects/ClientType'

@InputType()
class ClientInput {
    @Field(() => String)
    name: string

    @Field(() => String)
    email: string

    @Field(() => String)
    phone: string

}

@Resolver()
class ClientResolver {  
    @Query(() => Client)
    async client(
        @Arg('id' , () => String) id: string
    ) {
        try {
            const data = await ClientData.findById(id)
            return data
        } catch (error) {
            console.log(error)
        }
    }

    @Query(() => [Client])
    async clients() {
        try {
            const data = await ClientData.find()
            return data
        } catch (error) {
            console.log(error)
        }
    }
    @Mutation(() => Client)
    async createClient(
        @Arg('options') options: ClientInput
    ) {
        try {
            const data = await ClientData.create(options)
            await data.save()
            return data
        } catch (error) {
            console.log(error)
        }
    }

    @Mutation(() => Boolean)
    async deleteClient(
        @Arg('id' , () => String) id: string
    ) {
        try {
            const data = await ClientData.findByIdAndDelete(id)
            const projects = await projectData.find({ clientId: id })
            if(projects.length > 0) {
                await Promise.all(projects.map((project) => {
                    return project.deleteOne()
                }))
            }
            return data ? true : false
        } catch (error) {
            console.log(error)
        }
    }
}

export default ClientResolver