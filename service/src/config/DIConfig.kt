package io.hammock.config

import io.hammock.repositories.UserRepository
import io.hammock.services.SocialMediaLinkingService
import io.hammock.services.UserService
import io.ktor.client.HttpClient
import io.ktor.client.features.json.GsonSerializer
import io.ktor.client.features.json.JsonFeature
import org.koin.dsl.module
import org.litote.kmongo.coroutine.coroutine
import org.litote.kmongo.reactivestreams.KMongo

fun common(mongoHost: String, mongoPort: String) = module {
    single { KMongo.createClient("mongodb://$mongoHost:$mongoPort").coroutine }
    single { HttpClient { install(JsonFeature) { serializer = GsonSerializer() } } }
}

val repositories = module {
    single { UserRepository(get()) }
}

val services = module {
    single { UserService(get()) }
    single { SocialMediaLinkingService(get(), get()) }
}