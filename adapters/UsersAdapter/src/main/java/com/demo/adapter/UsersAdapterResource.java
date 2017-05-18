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
import javax.ws.rs.DELETE;
import javax.ws.rs.PUT;
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

	private static List<UserInfo> usersList;
	// Inject the MFP configuration API:
	@Context
	ConfigurationAPI configApi;

	public static void init() {
		usersList = new ArrayList();
	}

	//Path for method: "<server address>/mfp/api/adapters/UsersAdapter/{username}"
	@GET
	@Path("/users")
	@Produces(MediaType.APPLICATION_JSON)
	// @Produces(MediaType.TEXT_PLAIN)
	public String getUsersList() {
		//lazyInit();

		logger.info("UsersAdapterResource instance " + System.identityHashCode(this));
		try {
			Map<String, Object> result = new HashMap<String, Object>();
			result.put("status", new Integer(200));
			result.put("error", null);

			logger.info("List contains " + usersList.size());

			Map<String, Object> users = new HashMap<String, Object>();
			users.put("users", usersList);
			result.put("data", users);
			return createJsonResponse(result);
		} catch (final Exception e) {
			// TODO
			return "{}" + e.getMessage();
		}
	}

	//Path for method: "<server address>/mfp/api/adapters/UsersAdapter/{username}"
	@GET
	@Path("/{userid}")
	@Produces(MediaType.APPLICATION_JSON)
	// @Produces(MediaType.TEXT_PLAIN)
	public String getUser(@PathParam("userid") String userid) {
			//lazyInit();
	// public Map<String, Object> getUser(@PathParam("username") String name){
			logger.info("UsersAdapterResource instance " + System.identityHashCode(this));

			for (final UserInfo ui : usersList) {
				if (ui.userId.equals(userid)) {
					Map<String, Object> result = new HashMap<String, Object>();
					result.put("status", new Integer(200));
					result.put("error", null);

					Map<String, Object> userInfoMap = new HashMap<String, Object>();
					userInfoMap.put("userInfo", ui);
					result.put("data", userInfoMap);
					return createJsonResponse(result);
				}
			}

			Map<String, Object> result = new HashMap<String, Object>();
			result.put("status", new Integer(200));
			result.put("error", "No such user");

			// Map<String, Object> userInfoMap = new HashMap<String, Object>();
			// userInfoMap.put("userInfo", userInfo);
			// result.put("data", userInfoMap);
			return createJsonResponse(result);

			// UserInfo userInfo = new UserInfo();
			// userInfo.firstName = "John";
			// userInfo.lastName = "Deer";
			// userInfo.userId = userid;
			// userInfo.age = 29;
			// userInfo.roles.add("Technician");
			// userInfo.roles.add("Driver");
			//
			// try {
			// 	Map<String, Object> result = new HashMap<String, Object>();
			// 	result.put("status", new Integer(200));
			// 	result.put("error", null);
			//
			// 	Map<String, Object> userInfoMap = new HashMap<String, Object>();
			// 	userInfoMap.put("userInfo", userInfo);
			// 	result.put("data", userInfoMap);
			// 	return createJsonResponse(result);
			// } catch (final Exception e) {
			// 	// TODO
			// 	return "{}" + e.getMessage();
			// }
	}

	//Path for method: "<server address>/mfp/api/adapters/UsersAdapter/"
	@PUT
	@Path("/{userid}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public String createUser(@PathParam("userid") String userid, final NewUserCard card) {
		logger.info("UsersAdapterResource instance " + System.identityHashCode(this));

		if (isEmpty(userid)) {
			Map<String, Object> result = new HashMap<String, Object>();
			result.put("status", new Integer(400));
			result.put("error", "Proper userid should be specifiedd.");

			return createJsonResponse(result);
		}

		for (final UserInfo ui : usersList) {
			if (ui.userId.equals(userid)) {
				Map<String, Object> result = new HashMap<String, Object>();
				result.put("status", new Integer(200));
				result.put("error", null);
				usersList.remove(ui);
				UserInfo userInfo = copyUserInfo(card);
				userInfo.userId = ui.userId;
				usersList.add(userInfo);
				return createJsonResponse(result);
			}
		}

		Map<String, Object> result = new HashMap<String, Object>();
		result.put("status", new Integer(400));
		result.put("error", "Proper userid should be specifiedd.");
		return createJsonResponse(result);
	}

	//Path for method: "<server address>/mfp/api/adapters/UsersAdapter/"
	@DELETE
	@Path("/{userid}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public String createUser(@PathParam("userid") String userid) {
		logger.info("UsersAdapterResource instance " + System.identityHashCode(this));

		if (isEmpty(userid)) {
			Map<String, Object> result = new HashMap<String, Object>();
			result.put("status", new Integer(400));
			result.put("error", "Proper userid should be specifiedd.");

			return createJsonResponse(result);
		}

		for (final UserInfo ui : usersList) {
			if (ui.userId.equals(userid)) {
				Map<String, Object> result = new HashMap<String, Object>();
				result.put("status", new Integer(200));
				result.put("error", null);
				usersList.remove(ui);
				return createJsonResponse(result);
			}
		}

		Map<String, Object> result = new HashMap<String, Object>();
		result.put("status", new Integer(400));
		result.put("error", "Proper userid should be specifiedd.");
		return createJsonResponse(result);
	}

	//Path for method: "<server address>/mfp/api/adapters/UsersAdapter/"
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public String createUser(final NewUserCard card) {

		logger.info("UsersAdapterResource instance " + System.identityHashCode(this));

		if (card == null) {
			return createJsonResponse(createNewUserError("no data"));
		} else if (isEmpty(card.firstName)) {
			return createJsonResponse(createNewUserError("mandatory field fisrtName not provided."));
		}

		//lazyInit();

		UserInfo userInfo = copyUserInfo(card);
		userInfo.userId = "userid_" + System.currentTimeMillis();

		usersList.add(userInfo);

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

	private UserInfo copyUserInfo(final NewUserCard card) {
		final UserInfo userInfo = new UserInfo();
		userInfo.firstName = card.firstName;
		userInfo.lastName = card.lastName;
		userInfo.username = card.username;
		userInfo.password = card.password;
		userInfo.age = card.age;
		userInfo.roles = card.roles;
		return userInfo;
	}

	private void lazyInit() {
		if (usersList == null) {
			usersList = new ArrayList();
		}
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
