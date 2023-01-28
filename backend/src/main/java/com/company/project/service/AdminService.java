package com.company.project.service;

public interface AdminService {

    boolean login(String email, String password);

    boolean signup(String email, String password, String firstName, String lastName);

    boolean deleteUserByEmail(String email);
}
