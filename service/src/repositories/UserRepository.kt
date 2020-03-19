package io.hammock.repositories

import io.hammock.domain.User
import io.hammock.domain.UserProfile
import io.hammock.domain.toDomain
import io.hammock.exceptions.ResourceAlreadyExistsException
import kotlinx.coroutines.runBlocking
import org.litote.kmongo.coroutine.CoroutineClient
import org.litote.kmongo.eq
import java.time.LocalDate

class UserRepository(client: CoroutineClient) {

    private val database = client.getDatabase("test")
    private val collection = database.getCollection<User>()

    suspend fun create(createUser: User) : UserProfile? {
        val user = createUser.copy(id = null)
        return when (this.findByEmail(user.email)) {
            is UserProfile -> throw ResourceAlreadyExistsException(user)
            else -> collection.save(user).let { user.toDomain() }
        }
    }

    fun update(id: String, update: UserProfile) : UserProfile? {
        return runBlocking {
            val user = collection.findOneById(id)
            val updateUser = user!!.copy(
                firstName = update.firstName,
                lastName = update.lastName,
                birthDate = update.birthDate,
                gender = update.gender,
                shippingAddress = update.shippingAddress
            )
            collection.save(updateUser)?.let {
                updateUser.toDomain()
            }
        }
    }

    fun save(user: User) : User? {
        return runBlocking {
            collection.save(user)?.let {
                user
            }
        }
    }

    fun findAll() : List<UserProfile> {
        return runBlocking {
            collection.find().toList().map {
                it.toDomain()
            }
        }
    }

    fun findById(id: String) : UserProfile? {
        return runBlocking {
            collection.findOneById(id)?.toDomain()
        }
    }

    fun findByEmail(email: String) : UserProfile? {
        return runBlocking {
            collection.findOne(User::email eq email)?.toDomain()
        }
    }

    fun findUserByEmail(email: String) : User? {
        return runBlocking {
            collection.findOne(User::email eq email)
        }
    }

    fun findUserById(id: String) : User? {
        return runBlocking {
            collection.findOne(User::id eq id)
        }
    }
}