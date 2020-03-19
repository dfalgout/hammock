package io.hammock.exceptions

import java.lang.RuntimeException

open class ResourceException(message: String) : RuntimeException(message)