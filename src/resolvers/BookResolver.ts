import { Query, Resolver } from 'type-graphql'
import Book from '../Objects/BookType'

const books = [
    {
        name: ''
    },
    {
        name: 'Book2'
    },
    {
        name: 'Book3'
    },
    {
        name: 'Book4'
    },
]

@Resolver()
class BookResolver {
    @Query(() => [Book] , { name: 'booksAnd' , nullable: false })
    books() {
        return books
    }
}

export default BookResolver