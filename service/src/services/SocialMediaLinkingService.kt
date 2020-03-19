package io.hammock.services

import io.hammock.domain.LinkedInstagramAccount
import io.hammock.domain.User
import io.hammock.domain.social_media_accounts.FacebookAccountsResponse
import io.hammock.domain.social_media_accounts.FacebookLinkedAccountsResponse
import io.hammock.repositories.UserRepository
import io.ktor.client.HttpClient
import io.ktor.client.request.get
import kotlinx.coroutines.runBlocking
import java.time.Instant

class SocialMediaLinkingService(private val repository: UserRepository, private val client: HttpClient) {
    fun updateInstagramAccount(id: String, token: String, expiration: Long) : User? {
        return runBlocking {
            repository.findUserById(id)?.let { user ->
                val facebookAccountsUrl = "https://graph.facebook.com/v3.2/me/accounts?access_token=$token"
                val facebookAccountsResponse = client.get<FacebookAccountsResponse>(facebookAccountsUrl)

                val facebookInstagramUrl =
                    "https://graph.facebook.com/v3.2/${facebookAccountsResponse.data[0].id}?fields=instagram_business_account&access_token=$token"
                val facebookInstagramResponse = client.get<FacebookLinkedAccountsResponse>(facebookInstagramUrl)

                val linkedInstagramAccount = LinkedInstagramAccount(
                    facebookAccountsResponse.data[0].access_token,
                    facebookAccountsResponse.data[0].id,
                    facebookInstagramResponse.instagram_business_account!!.id,
                    facebookAccountsResponse.data[0].name,
                    Instant.ofEpochSecond(expiration)
                )

                val updatedUser = user.copy(linkedInstagramAccount = linkedInstagramAccount, instagramLinked = true)
                repository.save(updatedUser)
            }
        }
    }
}