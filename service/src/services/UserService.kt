package io.hammock.services

import io.hammock.domain.*
import io.hammock.repositories.UserRepository
import kotlinx.coroutines.runBlocking
import org.mindrot.jbcrypt.BCrypt
import java.security.SecureRandom


class UserService(private val repository: UserRepository) {

    fun create(createUser: CreateUser) : UserProfile? {
        val random = SecureRandom()
        val hashed = BCrypt.hashpw(createUser.password, BCrypt.gensalt(12, random))
        return runBlocking {
            repository.create(createUser.copy(password = hashed).toUser())
        }
    }

    fun update(id: String, user: UserProfile) : UserProfile? {
        return repository.update(id, user)
    }

    fun findAll() : List<UserProfile> {
        return repository.findAll()
    }

    fun findById(id: String) : UserProfile? {
        return repository.findById(id)
    }

    fun findUserById(id: String) : User? {
        return repository.findUserById(id)
    }

    fun emailExists(email: String) : Boolean {
        return when (repository.findUserByEmail(email)) {
            is User -> true
            else -> false
        }
    }
}