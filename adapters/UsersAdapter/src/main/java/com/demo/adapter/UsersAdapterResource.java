package com.demo.adapter;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.ibm.mfp.adapter.api.ConfigurationAPI;
import com.ibm.mfp.adapter.api.OAuthSecurity;

@Api(value = "Users Adapter Resource")
@Path("/")
public class UsersAdapterResource {
	/*
	 * For more info on JAX-RS see
	 * https://jax-rs-spec.java.net/nonav/2.0-rev-a/apidocs/index.html
	 */

	// Define logger (Standard java.util.Logger)
	static Logger logger = Logger.getLogger(UsersAdapterResource.class.getName());

	// Inject the MFP configuration API:
	@Context
	ConfigurationAPI configApi;


	//Path for method: "<server address>/mfp/api/adapters/UsersAdapter/{username}"
	@GET
	@Path("/{username}")
	@Produces(MediaType.TEXT_PLAIN)
	public String getUser(@PathParam("username") String name){
			return "Info for user " + name + ":";
	}

	//Path for method: "<server address>/mfp/api/adapters/UsersAdapter/{username}"
	@POST
	@Path("/{username}")
	@Produces(MediaType.TEXT_PLAIN)
	public String createUser(@PathParam("username") String name){
			return "Requested new user creation: " + name;
	}







}
