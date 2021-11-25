package com.oovest.app;

import com.oovest.rest.AuthenticationService;

import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

public class AuthenticationServer extends Application {
    private final Set<Object> singletons = new HashSet<Object>();

    public AuthenticationServer() {
        // Register our Authentication service
        singletons.add(new AuthenticationService());
    }

    @Override
    public Set<Object> getSingletons() {
        return singletons;
    }

}
