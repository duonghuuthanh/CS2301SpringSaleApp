/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dht.repositories.impl;

import com.dht.hibernatedemov2.HibernateUtils;
import com.dht.pojo.User;
import jakarta.persistence.Query;
import org.hibernate.Session;

/**
 *
 * @author huu-thanhduong
 */
public class UserRepositoryImpl {
    public User getUserByUsername(String username) {
        try (Session s = HibernateUtils.getFactory().openSession()) {
            Query query = s.createNamedQuery("User.findByUsername", User.class);
            query.setParameter("username", username);
            
            return (User) query.getSingleResult();
        }
    }
}
