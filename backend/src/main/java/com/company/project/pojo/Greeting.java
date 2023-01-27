package com.company.project.pojo;

import java.io.Serializable;

public class Greeting implements Serializable {

  private int id;
  private String name;

  public Greeting() {}

  public Greeting(int id, String name) {
    this.id = id;
    this.name = name;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  @Override
  public String toString() {
    return "Greeting{" + "id=" + id + ", name='" + name + '\'' + '}';
  }
}
