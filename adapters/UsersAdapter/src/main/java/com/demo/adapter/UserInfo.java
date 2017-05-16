package com.demo.adapter;

import java.util.ArrayList;
import java.util.List;

public class UserInfo {
  public String firstName;
  public String lastName;
  public String userId;
  public int age;
  public List roles;

  public UserInfo() {
    roles = new ArrayList();
  }
}
