package com.demo.adapter;

import com.google.gson.Gson;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

import javax.ws.rs.BeanParam;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Consumes;
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
	@Path("/{userid}")
	@Produces(MediaType.APPLICATION_JSON)
	// @Produces(MediaType.TEXT_PLAIN)
	public String getUser(@PathParam("userid") String userid) {
	// public Map<String, Object> getUser(@PathParam("username") String name){

			UserInfo userInfo = new UserInfo();
			userInfo.firstName = "John";
			userInfo.lastName = "Deer";
			userInfo.userId = userid;
			userInfo.age = 29;
			userInfo.roles.add("Technician");
			userInfo.roles.add("Driver");

			try {
				Map<String, Object> result = new HashMap<String, Object>();
				result.put("status", new Integer(200));
				result.put("error", null);

				Map<String, Object> userInfoMap = new HashMap<String, Object>();
				userInfoMap.put("userInfo", userInfo);
				result.put("data", userInfoMap);
				return createJsonResponse(result);
			} catch (final Exception e) {
				// TODO
				return "{}" + e.getMessage();
			}
	}

	//Path for method: "<server address>/mfp/api/adapters/UsersAdapter/{username}"
	@POST
	// @Path("/{username}")
	// @Produces(MediaType.TEXT_PLAIN)\
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public String createUser(final NewUserCard card) {
		if (card == null) {
			return createJsonResponse(createNewUserError("no data"));
		} else if (isEmpty(card.firstName)) {
			return createJsonResponse(createNewUserError("mandatory field fisrtName not provided."));
		}

		UserInfo userInfo = new UserInfo();
		userInfo.firstName = card.firstName;
		userInfo.lastName = card.lastName;
		userInfo.age = card.age;
		userInfo.roles = card.roles;
		userInfo.userId = "randonid_placeholder";

		return new Gson().toJson(userInfo);
	}

	private Map<String, Object> createNewUserError(final String msg) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("status", new Integer(400));
		result.put("error", "Failed to create new user: " + msg);
		return result;
	}

	private String createJsonResponse(final Map<String, Object> map) {
		return new Gson().toJson(map);
	}

	private boolean isEmpty(CharSequence str) {
    if (str == null || str.length() == 0)
      return true;
    else
      return false;
	}

	// //Path for method: "<server address>/mfp/api/adapters/UsersAdapter/{username}"
	// @POST
	// // @Path("/{username}")
	// // @Produces(MediaType.TEXT_PLAIN)\
	// @Consumes(MediaType.APPLICATION_JSON)
	// @Produces(MediaType.APPLICATION_JSON)
	// public String createUser(@PathParam("username") String name){
	// 		return "Requested new user creation: " + name;
	// }

	// @GET
	// @Path("/autocomplete/{input}")
	// // @Produces(MediaType.APPLICATION_JSON)
	// @Produces(MediaType.TEXT_PLAIN)
	// public String getUser(@PathParam("input") String input){
	// 	final String url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyBczZsLMbyS8MCgVmcwN7IBEER3o0oOJeM&input=" + input;
	//
	// 		Gson gson = new Gson();
	// 		Map<String, Object> info = new HashMap<String, Object>();
	// 		Array roles = new Array();
	// 		array.add("Technician");
	// 		array.add("Driver");
	// 		info.put("firstName", "John");
	// 		info.put("lastName", "Deer");
	// 		info.put("age", new Integer(29));
	// 		info.put("userid", name);
	// 		info.put("roles", roles);
	// 		Map<String, Object> result = new HashMap<String, Object>();
	// 		result.put("status", new Integer(200));
	// 		result.put("error", "{}");
	// 		result.put("data", info);
	// 		try {
	// 			return new Gson().toJson(info);
	// 		} catch (final Exception e) {
	// 			// TODO
	// 			return "{}";
	// 		}
	// }

}
