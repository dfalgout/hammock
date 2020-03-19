package io.hammock

import io.hammock.config.*
import io.hammock.controllers.login
import io.hammock.controllers.user
import io.hammock.exceptions.ResourceException
import io.hammock.repositories.UserRepository
import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.application.install
import io.ktor.locations.*
import io.ktor.features.*
import org.slf4j.event.*
import io.ktor.auth.*
import io.ktor.gson.*
import io.ktor.http.HttpHeaders
import io.ktor.http.HttpMethod
import io.ktor.http.HttpStatusCode
import io.ktor.request.path
import io.ktor.response.respond
import io.ktor.routing.routing
import org.koin.ktor.ext.Koin
import org.koin.ktor.ext.inject
import java.text.DateFormat

fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)

@Suppress("unused") // Referenced in application.conf
@kotlin.jvm.JvmOverloads
fun Application.module(testing: Boolean = false) {
    val basicRealm = environment.config.property("basic.realm").getString()
    val secret = environment.config.property("jwt.secret").getString()
    val mongoHost = environment.config.property("mongo.host").getString()
    val mongoPort = environment.config.property("mongo.port").getString()

    install(Locations)
    install(DataConversion)
    install(DefaultHeaders)
    install(ContentNegotiation) {
        gson {
            setDateFormat(DateFormat.LONG)
            setPrettyPrinting()
        }
    }

    install(CORS) {
        method(HttpMethod.Options)
        method(HttpMethod.Put)
        method(HttpMethod.Delete)
        method(HttpMethod.Patch)
        header(HttpHeaders.Authorization)
        allowCredentials = true
        anyHost() // @TODO: Don't do this in production if possible. Try to limit it.
    }

    install(StatusPages) {
        exception<ResourceException> { cause ->
            call.respond(HttpStatusCode.BadRequest, cause.message!!)
        }

        exception<Throwable> { cause ->
            call.respond(HttpStatusCode.InternalServerError, cause)
        }
    }

    install(Compression) {
        gzip {
            priority = 1.0
        }
        deflate {
            priority = 10.0
            minimumSize(1024) // condition
        }
    }

    install(CallLogging) {
        level = Level.INFO
        filter { call -> call.request.path().startsWith("/") }
    }

    install(Koin) {
        modules(common(mongoHost, mongoPort), repositories, services)
    }

    val simpleJwt = SimpleJWT(secret)
    val userRepository by inject<UserRepository>()

    install(Authentication) {
        basic(basicRealm, userRepository)
        jwt(simpleJwt)
    }

    routing {
//        static("/") {
//            staticRootFolder = File("resources/static")
//            files(".")
//            default("index.html")
//        }

        login(simpleJwt)
        user()
    }
}
